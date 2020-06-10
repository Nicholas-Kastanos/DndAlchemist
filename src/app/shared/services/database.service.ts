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
      console.debug(JSON.stringify(migrations));
      if (migrations == null){
        console.error("Cannot find migrations.");
        reject();
      }
      if(migrations.length === 0){
        console.error("No migrations found.");
        reject();
      }
      this.db.executeSql("SELECT name FROM sqlite_master WHERE type='table'", []
        // ["SELECT * FROM " + this.SqlMigrationsTableName]
      ).then((resultSet: IQueryResults<IMigration>) => {
        console.debug(JSON.stringify(resultSet));
        for(let i = 0; i < resultSet.rows.length; i++){
          console.debug(JSON.stringify(resultSet.rows.item(i)))
          console.debug(Object.keys(resultSet))
          console.debug(Object.keys(resultSet.rows))
          console.debug(Object.keys(resultSet.rows.item(i)))
        }
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
  name: string;
  rawSql?: string | undefined;
}


export interface IQueryResultRows<T> {
  length: number;
  item(i: number): T;
}
export interface IQueryResults<T> {
  rows: IQueryResultRows<T>;
  rowsAffected: number;
  // insertId: any; // the id of an inserted and maybe updated record.
}