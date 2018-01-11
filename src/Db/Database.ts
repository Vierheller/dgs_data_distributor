import { CouchDb } from "@teammaestro/node-couchdb-client";
import { error } from "util";
import { Queue } from "../classes/Queue";
import { LogHandler } from "../Handler/LogHandler";

export class Database {
    private db: CouchDb;
    private dbHost: string;
    private dbPort: number;
    private dbName: string;
    private dbUser: string;
    private dbPass: string;
    private dbQueue: Queue<any>;

    constructor(name: string, host: string, port: number, user: string, pass: string) {
        this.dbName = name;
        this.dbHost = host;
        this.dbPort = port;
        this.dbUser = user;
        this.dbPass = pass;
        this.dbQueue = new Queue<any>();

        this.db = new CouchDb({
            auth: {
                password: this.dbPass,
                username: this.dbUser,
            },
            defaultDatabase: this.dbName,
            host: "http://" + this.dbHost,
            logging: true,
            port: this.dbPort,
        });
    }

    public connect() {
        this.db.checkDatabaseExists(this.dbName)
                .then((result) => {
                    LogHandler.getInstance().log("Database <%s> available:" + result, this.dbName);
                    this.db.createDatabase(this.dbName)
                        .then((created) => {
                            LogHandler.getInstance().log("Database <%s> created:" + created, this.dbName);
                    })
                    .catch((err) => {
                        LogHandler.getInstance().log("Database <%s>  :" + err, this.dbName);
                    });
                })
                .catch((err) => {
                    LogHandler.getInstance().log("Database <%s>  :" + err, this.dbName);
                });
    }

    public saveData(data: any) {
        this.db.createDocument({doc: {data}})
                .then((docs) => {
                    LogHandler.getInstance().log("Database Insert succesful<%s>  :" + docs, this.dbName);
                }).catch((errors) => {
                    LogHandler.getInstance().log("Database Insert failed. <%s> :" + errors.message, this.dbName);
                    this.dbQueue.push(data);
                });
    }
}
