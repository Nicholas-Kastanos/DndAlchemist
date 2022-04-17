import { Injectable } from '@angular/core';
import "reflect-metadata";
import { Platform } from '@ionic/angular';
import { DataSource } from "typeorm"
import { ReplaySubject } from 'rxjs';
import { CapacitorConnectionOptions } from 'typeorm/driver/capacitor/CapacitorConnectionOptions';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'

@Injectable({
    providedIn: 'root'
})
export class OrmService {
    public initialiseSubject = new ReplaySubject<void>();
    private dataSource: DataSource;

    private connectionOptions: CapacitorConnectionOptions;

    constructor(private platform: Platform, private sqlite: SQLite) {
        this.connectionOptions = {
            type: "capacitor",
            database: "alchemy2.db",
            synchronize: true,
            logging: false,
            entities: [
                "src/entity/**/*.ts"
            ],
            migrations: [
                "src/migration/**/*.ts"
            ],
            subscribers: [
                "src/subscriber/**/*.ts"
            ],
            driver: await this.sqlite.create({
                name: 'alchemy2.db',
                location: 'default'
              })
        };
        
        createConnection(this.connectionOptions)
            .then(connection => {
                this.connection = connection
                this.initialiseSubject.next();
            })
            .catch(console.log)
    }
}