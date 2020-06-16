import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Essance, IEssance } from '../classes/essance/essance';
import { BaseConcoction, IBaseConcoction, IBaseConcoctionEssance } from '../classes/base-concoction/base-concoction';
import migrationsArray from './migrations.json';
import baseConcoctionJson from '../../../../data/base_concoctions.json';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private migrationTableExists: boolean = false;
  private migrationComplete: boolean = false;
  private readonly SqlMigrationsTableName: string = 'SQLMigrations';

  private sqliteConfig: SQLiteDatabaseConfig = {
    name: "alchemy.db",
    location: 'default'
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  private async _openDb(): Promise<SQLiteObject> {
    return this.sqlite.create(this.sqliteConfig);
  }

  public migrationTableCreated(): boolean {
    return this.migrationTableExists;
  }
  public migrationsCompleted(): boolean {
    return this.migrationComplete;
  }

  public async getEssances(): Promise<Essance[]> {
    let resultSet = (await this.db.executeSql("SELECT * FROM Essances", [])) as IQueryResults<IEssance>;
    let iEssances = this.queryResultToArray<IEssance>(resultSet);
    let essances: Essance[] = [];
    iEssances.forEach(iEssance => {
      essances.push(new Essance(iEssance.Id, iEssance.Name));
    });
    return essances;
  }

  public async getBaseConcoctions(): Promise<BaseConcoction[]> {
    let resultSet = (await this.db.executeSql("SELECT * FROM BaseConcoctions", [])) as IQueryResults<IBaseConcoction>;
    let iBaseConcoctions = this.queryResultToArray<IBaseConcoction>(resultSet);
    let baseConcoctions: BaseConcoction[] = [];
    let essances = await this.getEssances();
    for(let i = 0; i < iBaseConcoctions.length; i++){
      let iBaseConcoction = iBaseConcoctions[i];
      let essanceSet = (await this.db.executeSql("SELECT * FROM BaseConcoctionEssances WHERE BaseConcoctionId=?", [iBaseConcoction.Id])) as IQueryResults<IBaseConcoctionEssance>;
      let iEssance = this.queryResultToArray<IBaseConcoctionEssance>(essanceSet);
      let baseEssances = iEssance.map(ie => essances.find(e => e.id === ie.EssanceId));
      baseConcoctions.push(new BaseConcoction(iBaseConcoction.Id, iBaseConcoction.Name, iBaseConcoction.BaseEffect, baseEssances));     
    }
    return baseConcoctions;
  }

  // public async updateBaseConcoctionsFromJSON(json: any){
  public async updateBaseConcoctionsFromJSON(){
    let essances = await this.getEssances();
    let existingBaseConcoctions = await this.getBaseConcoctions();
    for(let i = 0; i < baseConcoctionJson.length; i++) {
      let jsonBaseConcoction = baseConcoctionJson[i];
      let existingBaseConcoction = existingBaseConcoctions.find(existing => existing.name === jsonBaseConcoction.name);
      if(existingBaseConcoction == null){ // There is no match
        let insertResult = await this.db.executeSql("INSERT INTO BaseConcoctions (Name, BaseEffect) VALUES (?, ?);", [jsonBaseConcoction.name, jsonBaseConcoction.baseEffect]) as IInsertResults<IBaseConcoction>; 
        for(let j = 0; j < jsonBaseConcoction.baseEssences.length; j++){
          let newEssance = jsonBaseConcoction.baseEssences[j];
          let newEssanceId = essances.find(e => e.name === newEssance).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssances (BaseConcoctionId, EssanceId) VALUES (?, ?);", [insertResult.insertId, newEssanceId]);
        }
      } else { // There is a match
        await this.db.executeSql("UPDATE BaseConcoctions SET BaseEffect=? WHERE Id=?;", [jsonBaseConcoction.baseEffect, existingBaseConcoction.id]);
        await this.db.executeSql("DELETE FROM BaseConcoctionEssances WHERE BaseConcoctionId=?;", [existingBaseConcoction.id]);
        for(let j = 0; j < jsonBaseConcoction.baseEssences.length; j++){
          let newEssance = jsonBaseConcoction.baseEssences[j];
          let newEssanceId = essances.find(e => e.name === newEssance).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssances (BaseConcoctionId, EssanceId) VALUES (?, ?);", [existingBaseConcoction.id, newEssanceId]);
        }
      }
    }
  }

  queryResultToArray<T>(resultSet: IQueryResults<T>): T[] {
    let arr = [];
    for(let i = 0; i < resultSet.rows.length; i++){
      arr.push(resultSet.rows.item(i));
    }
    return (arr as T[]);
  }
  
  private _createMigrationsTable(): Promise<void>{
    return new Promise<void> ((resolve, reject) => {    
      this.db.sqlBatch(
        ["CREATE TABLE IF NOT EXISTS " + this.SqlMigrationsTableName + "(Name TEXT PRIMARY KEY NOT NULL)"]
      ).then(() => {
          resolve();
      }).catch(err => {
          console.error(err);
          reject()
      })      
    });
  }

  private _runMigrations() : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let migrations: IMigration[] = migrationsArray;
      if (migrations == null){
        console.error("Cannot find migrations.");
        reject();
      }
      if(migrations.length === 0){
        console.error("No migrations found.");
        reject();
      }
      this.db.executeSql("SELECT * FROM " + this.SqlMigrationsTableName, []
      ).then(async (resultSet: IQueryResults<IMigration>) => {

        let existingMigrations = this.queryResultToArray<IMigration>(resultSet);

        console.debug("Existing Migrations:");
        for(let i = 0; i < existingMigrations.length; i++){
          console.debug(existingMigrations[i].Name);
        }
        console.debug("Done");

        let missingMigrations = migrations.filter((item: IMigration) => {
          let found = true;
          for(let i = 0; i < existingMigrations.length; i++){
            if(item.Name === existingMigrations[i].Name){
              found = false;
              break;
            }
          }
          return found;
        });
        console.debug("Missing Migrations:");
        for(let i = 0; i < missingMigrations.length; i++){
          console.debug(missingMigrations[i].Name);
        }
        console.debug("Done");
        console.debug("Applying Migrations:");
        for(let i = 0; i < missingMigrations.length; i++){
          console.debug("Applying Migration: " + missingMigrations[i].Name);
          let result = await this.db.sqlBatch([missingMigrations[i].RawSql]);
          result = await this.db.executeSql("INSERT INTO " + this.SqlMigrationsTableName + " VALUES (?)", [missingMigrations[i].Name]);
        }
        console.debug("Done");

        resolve();
      }).catch( (err: any) => {
        console.error(JSON.stringify(err));
        reject();
      })
    });
  }

  public initialise(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.db = await this._openDb();
      this._createMigrationsTable().then(() => {
        this.migrationTableExists = true;
        this._runMigrations().then(() => {
          this.migrationComplete = true;
          resolve();
        }).catch(() => {
          reject();
        });
      }).catch(() => {
        reject();
      });
    })
  }
}

interface IMigration {
  Name: string;
  RawSql?: string | undefined;
}

export interface IQueryResultRows<T> {
  length: number;
  item(i: number): T;
}
export interface IQueryResults<T> {
  rows: IQueryResultRows<T>;
  rowsAffected: number;
}

export interface IInsertResults<T> {
  rows: IQueryResultRows<T>;
  rowsAffected: number;
  insertId: any; // the id of an inserted and maybe updated record.
}