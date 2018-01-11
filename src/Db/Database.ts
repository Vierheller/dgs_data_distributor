//import * as Nano from "nano";
import { CouchDb } from "@teammaestro/node-couchdb-client";
import { error } from "util";
import {LogHandler} from "../Handler/LogHandler";

export class Database {
    private dbHelper: any;
    private db: CouchDb; // Nano.DocumentScope<any>;
    private dbHost: string;
    private dbPort: number;
    private dbName: string;
    private dbUser: string;
    private dbPass: string;

    constructor(name: string, host: string, port: number, user: string, pass: string) {
        this.dbName = name;
        this.dbHost = host;
        this.dbPort = port;
        this.dbUser = user;
        this.dbPass = pass;

        this.db = new CouchDb({
            host: "http://" + this.dbHost,
            port: this.dbPort,
            auth: {
                username: this.dbUser,
                password: this.dbPass,
            },
            logging: true,
            defaultDatabase: this.dbName,
        });
    }

    public connect() {
        this.db.checkDatabaseExists(this.dbName)
                .then((result) => {
                    LogHandler.getInstance().log("Database" + this.dbName + " available:" + result);
                    this.db.createDatabase(this.dbName)
                        .then((created) => {
                            LogHandler.getInstance().log("Database " + this.dbName + " created:" + created);
                    })
                    .catch((err) => {
                        LogHandler.getInstance().log("Database " + this.dbName + " :" + err);
                    });
                })
                .catch((err) => {
                    LogHandler.getInstance().log("Database " + this.dbName + " :" + err);
                });
    }

    public saveData(data: any) {
        // ToDo Implement Saving
        // this.db.insert(data, this.onInsert.bind(this));
        this.db.createDocument(data)
                .then((docs) => {
                    LogHandler.getInstance().log("Database " + this.dbName + " :" + docs);
                }).catch((errors) => {
                    LogHandler.getInstance().log("Database " + this.dbName + " :" + errors.message);
                });
    }

    private setupDatabase() {
        // ToDo: Connect to Database, start replication ....
    }

    private onConnect(err: any, body: any, header: any) {
        if (err) {
            LogHandler.getInstance().log("Connection Error %s ." + err.message);
        } else {
            LogHandler.getInstance().log("Connection to ${this.dbName} succesful. Response: " + body + header);
        }
    }

    private onInsert(err: any, body: any, header: any) {
        if (err) {
            LogHandler.getInstance().log("Database <%s> Error inserting Error %s ." + err.message);
        } else {
            LogHandler.getInstance().log("Database <%s> insert to %s succesful.");
        }
    }
}
