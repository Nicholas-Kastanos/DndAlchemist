import { Injectable } from '@angular/core';
import "reflect-metadata";
import { Platform } from '@ionic/angular';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { ReplaySubject } from 'rxjs';
import { CordovaConnectionOptions } from 'typeorm/driver/cordova/CordovaConnectionOptions';
import { SqljsConnectionOptions } from 'typeorm/driver/sqljs/SqljsConnectionOptions';

@Injectable({
    providedIn: 'root'
})
export class OrmService {
    public initialiseSubject = new ReplaySubject<void>();
    private connection: Connection;

    constructor(private platform: Platform) {
        let connectionOptions: any = {
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
            cli: {
                "entitiesDir": "src/entity",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            }
        };
        if (this.platform.is('capacitor') || this.platform.is("cordova")) {
            connectionOptions = {
                ...connectionOptions,
                type: "cordova",
                database: "alchemy2.db",
                location: "default"
            };
        }
        else {
            connectionOptions = {
                ...connectionOptions,
                type: 'sqljs',
                location: 'browser',
                autoSave: true,
                sqlJsConfig: { locateFile: file => `static/js/sql-wasm.wasm` }
            };
        }
        createConnection(connectionOptions)
            .then(connection => {
                this.connection = connection
                this.initialiseSubject.next();
            })
            .catch(console.log)
    }
}