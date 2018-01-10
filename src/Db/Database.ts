import * as Nano from "nano";
import {LogHandler} from "../Handler/LogHandler";

export class Database {
    private dbHelper: any;
    private db: Nano.DocumentScope<any>;
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
       // this.dbHelper = Nano({url: "http://" + this.dbAdress + ":" + this.dbPort});
        this.dbHelper = require("nano")("http://" + this.dbHost + ":" + this.dbPort);
    }

    public connect() {
        // this.dbHelper.use(this.dbName, this.onConnect.bind(this));
        this.db = this.dbHelper.use(this.dbName, this.onConnect.bind(this));
    }

    public saveData(data: any) {
        // ToDo Implement Saving
        this.db.insert(data, this.onInsert.bind(this));
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
