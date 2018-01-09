import * as Nano from "nano";
import {LogHandler} from "../Handler/LogHandler";

export class Database {
    public dbHelper: any;
    public db: Nano.DocumentScope<any>;
    public dbAdress: string;
    public dbPort: string;
    public dbName: string;

    constructor(dbAdress: string, dbPort: string, dbName: string) {
        this.dbHelper = Nano(dbAdress + ":" + dbPort);
    }

    private connect() {
        this.db = this.dbHelper.use(this.dbName, this.onConnect.bind(this));
    }

    private saveData(data: any) {
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
