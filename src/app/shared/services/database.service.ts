import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Essence, IEssence } from '../classes/essence/essence';
import { BaseConcoction, IBaseConcoction, IBaseConcoctionEssence } from '../classes/base-concoction/base-concoction';
import migrationsArray from './migrations.json';
import baseConcoctionJson from '../../../../data/base_concoctions.json';
import ingredientsJson from '../../../../data/ingredients.json';
import { Biome, IBiome } from '../classes/biome/biome';
import { Rarity, IRarity } from '../classes/rarity/rarity';
import { DamageType, IDamageType } from '../classes/damage-type/damage-type';

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

  public async getEssences(): Promise<Essence[]> {
    let resultSet = (await this.db.executeSql("SELECT * FROM Essences", [])) as IQueryResults<IEssence>;
    let iEssences = this.queryResultToArray<IEssence>(resultSet);
    let essences: Essence[] = [];
    iEssences.forEach(iEssence => {
      essences.push(new Essence(iEssence.Id, iEssence.Name));
    });
    return essences;
  }

  public async getBaseConcoctions(): Promise<BaseConcoction[]> {
    let resultSet = (await this.db.executeSql("SELECT * FROM BaseConcoctions", [])) as IQueryResults<IBaseConcoction>;
    let iBaseConcoctions = this.queryResultToArray<IBaseConcoction>(resultSet);
    let baseConcoctions: BaseConcoction[] = [];
    let essences = await this.getEssences();
    for(let i = 0; i < iBaseConcoctions.length; i++){
      let iBaseConcoction = iBaseConcoctions[i];
      let essenceSet = (await this.db.executeSql("SELECT * FROM BaseConcoctionEssences WHERE BaseConcoctionId=?", [iBaseConcoction.Id])) as IQueryResults<IBaseConcoctionEssence>;
      let iEssence = this.queryResultToArray<IBaseConcoctionEssence>(essenceSet);
      let baseEssences = iEssence.map(ie => essences.find(e => e.id === ie.EssenceId));
      baseConcoctions.push(new BaseConcoction(iBaseConcoction.Id, iBaseConcoction.Name, iBaseConcoction.BaseEffect, baseEssences));     
    }
    return baseConcoctions;
  }

  // public async updateBaseConcoctionsFromJSON(json: any){
  public async updateBaseConcoctionsFromJSON(){
    let essences = await this.getEssences();
    let existingBaseConcoctions = await this.getBaseConcoctions();
    for(let i = 0; i < baseConcoctionJson.length; i++) {
      let jsonBaseConcoction = baseConcoctionJson[i];
      let existingBaseConcoction = existingBaseConcoctions.find(existing => existing.name === jsonBaseConcoction.name);
      if(existingBaseConcoction == null){ // There is no match
        let insertResult = await this.db.executeSql("INSERT INTO BaseConcoctions (Name, BaseEffect) VALUES (?, ?);", [jsonBaseConcoction.name, jsonBaseConcoction.baseEffect]) as IInsertResults<IBaseConcoction>; 
        for(let j = 0; j < jsonBaseConcoction.baseEssences.length; j++){
          let newEssence = jsonBaseConcoction.baseEssences[j];
          let newEssenceId = essences.find(e => e.name === newEssence).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssences (BaseConcoctionId, EssenceId) VALUES (?, ?);", [insertResult.insertId, newEssenceId]);
        }
      } else { // There is a match
        await this.db.executeSql("UPDATE BaseConcoctions SET BaseEffect=? WHERE Id=?;", [jsonBaseConcoction.baseEffect, existingBaseConcoction.id]);
        await this.db.executeSql("DELETE FROM BaseConcoctionEssences WHERE BaseConcoctionId=?;", [existingBaseConcoction.id]);
        for(let j = 0; j < jsonBaseConcoction.baseEssences.length; j++){
          let newEssence = jsonBaseConcoction.baseEssences[j];
          let newEssenceId = essences.find(e => e.name === newEssence).id;
          await this.db.executeSql("INSERT INTO BaseConcoctionEssences (BaseConcoctionId, EssenceId) VALUES (?, ?);", [existingBaseConcoction.id, newEssenceId]);
        }
      }
    }
  }

  public async getBiomes(): Promise<Biome[]>{
    let resultSet = (await this.db.executeSql("SELECT * FROM Biomes", [])) as IQueryResults<IBiome>;
    let iBiomes = this.queryResultToArray<IBiome>(resultSet);
    let biomes: Biome[] = [];
    iBiomes.forEach(iBiome => {
      biomes.push(new Biome(iBiome.Id, iBiome.Name));
    });
    return biomes;
  }

  public async getRarities(): Promise<Rarity[]>{
    let resultSet = (await this.db.executeSql("SELECT * FROM Rarities", [])) as IQueryResults<IRarity>;
    let iRarities = this.queryResultToArray<IRarity>(resultSet);
    let rarities: Rarity[] = [];
    iRarities.forEach(iRarity => {
      rarities.push(new Rarity(iRarity.Id, iRarity.Name));
    });
    return rarities;
  }

  public async getDamageTypes(): Promise<DamageType[]>{
    let resultSet = (await this.db.executeSql("SELECT * FROM DamageTypes", [])) as IQueryResults<IDamageType>;
    let iDamageTypes = this.queryResultToArray<IDamageType>(resultSet);
    let damageTypes: DamageType[] = [];
    iDamageTypes.forEach(iDamageType => {
      damageTypes.push(new DamageType(iDamageType.Id, iDamageType.Name));
    });
    return damageTypes;
  }

  

  public async updateIngredientsFromJson(){
    let essences  = await this.getEssences();
    // let existingIngredients = await this.getIngredients();
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
        this._runMigrations().then(async() => {
          this.migrationComplete = true;
          await this.updateBaseConcoctionsFromJSON();
          this.updateIngredientsFromJson();
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