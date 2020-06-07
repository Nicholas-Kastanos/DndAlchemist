import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject, SQLiteDatabaseConfig} from '@ionic-native/sqlite/ngx'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private androidDatabaseProvider: "system";
  private migrationTableExists: boolean = false;
  private migrationComplete: boolean = false;

  private sqliteConfig: SQLiteDatabaseConfig = {
    name: "alchemy.db",
    location: 'default'
  }

  constructor(private sqlite: SQLite) { }

  public migrationTableCreated(): boolean {
    return this.migrationTableExists;
  }
  public migrationsCompleted(): boolean {
    return this.migrationComplete;
  }
  
  private _createMigrationsTable(): Promise<void>{
    return new Promise<void> ((resolve, reject) => {
      this.sqlite.create(this.sqliteConfig).then((db: SQLiteObject) => {
        db.sqlBatch(
          ["CREATE TABLE IF NOT EXISTS SQLMigrations(Name TEXT PRIMARY KEY NOT NULL)"]
        )
          .then(() => {
            resolve();
          })
          .catch(err => {
            console.error(err);
            reject()
          })
      })
      .catch(err => {
        console.error(err);
        reject();
      })
    })
  }

  public initialise(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._createMigrationsTable().then(() => {
        this.migrationTableExists = true;
        // this.migrationComplete = await this._runMigrations();
        resolve();
      }).catch((err) => {
        console.error(err);
        reject();
      });
    })
  }
}
