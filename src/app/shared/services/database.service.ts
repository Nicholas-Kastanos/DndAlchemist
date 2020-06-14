import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import migrationsArray from './migrations.json';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private androidDatabaseProvider: "system";
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

export interface IEntity {
  Id: number;
}

export abstract class Entity {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
  abstract toInterface(): IEntity;
}

export interface IEssance extends IEntity {
  Name: string;
}

export class Essance extends Entity {
  name: string;

  constructor(id: number, name: string){
    super(id);
    this.name = name;
  }

  toInterface(): IEssance{
    let ess: IEssance;
    ess.Id = this.id;
    ess.Name = this.name;
    return ess;
  }
}

export interface IBaseConcoction extends IEntity {
  Name: string;
  BaseEffect: string;
}

export interface IBaseConcoctionEssance extends IEntity {
  BaseConcoctionId: number;
  EssanceId: number;
}

export class BaseConcoction extends Entity {
  name: string;
  baseEffect: string;
  baseEssances: Essance[] = [];

  constructor(id: number, name: string, baseEffect: string, baseEssances: Essance[]) {
    super(id);
    this.name = name;
    this.baseEffect = baseEffect;
    this.baseEssances = baseEssances;
  }

  toInterface(): IBaseConcoction {
    let ess: IBaseConcoction;
    ess.Id = this.id;
    ess.Name = this.name;
    ess.BaseEffect = this.baseEffect;
    return ess;
  }
  toBaseConcoctionEssanceInterfances(): IBaseConcoctionEssance[]{
    let arr: IBaseConcoctionEssance[]
    arr = [];
    this.baseEssances.forEach(baseEssance => {
      let ess: IBaseConcoctionEssance;
      ess.Id = undefined;
      ess.BaseConcoctionId = this.id;   
      ess.EssanceId = baseEssance.id;
      arr.push(ess);
    });
    return arr;
  }
}