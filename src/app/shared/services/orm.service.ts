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
        let type:  "cordova" | "sqljs";
        let connectionOptions: ConnectionOptions;
        if (this.platform.is('capacitor') || this.platform.is("cordova")) {
            type = "cordova";
            connectionOptions = {
                type: "cordova",
                database: "alchemy2.db",
                location: "default",
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
                }} as CordovaConnectionOptions;
        }
        else {
            type = "sqljs";
            connectionOptions = {
                type: 'sqljs',
                location: 'default',
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
                }} as SqljsConnectionOptions;
        }
        createConnection(connectionOptions)
            .then(connection => {
                this.connection = connection
                this.initialiseSubject.next();
            })
            .catch(console.log)
    }
}