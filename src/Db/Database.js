"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogHandler_1 = require("../Handler/LogHandler");
var Database = /** @class */ (function () {
    function Database(name, host, port, user, pass) {
        this.dbName = name;
        this.dbHost = host;
        this.dbPort = port;
        this.dbUser = user;
        this.dbPass = pass;
        // this.dbHelper = Nano({url: "http://" + this.dbAdress + ":" + this.dbPort});
        this.dbHelper = require("nano")("http://" + this.dbHost + ":" + this.dbPort);
    }
    Database.prototype.connect = function () {
        // this.dbHelper.use(this.dbName, this.onConnect.bind(this));
        this.db = this.dbHelper.use(this.dbName, this.onConnect.bind(this));
    };
    Database.prototype.saveData = function (data) {
        // ToDo Implement Saving
        this.db.insert(data, this.onInsert.bind(this));
    };
    Database.prototype.setupDatabase = function () {
        // ToDo: Connect to Database, start replication ....
    };
    Database.prototype.onConnect = function (err, body, header) {
        if (err) {
            LogHandler_1.LogHandler.getInstance().log("Connection Error %s ." + err.message);
        }
        else {
            LogHandler_1.LogHandler.getInstance().log("Connection to ${this.dbName} succesful. Response: " + body + header);
        }
    };
    Database.prototype.onInsert = function (err, body, header) {
        if (err) {
            LogHandler_1.LogHandler.getInstance().log("Database <%s> Error inserting Error %s ." + err.message);
        }
        else {
            LogHandler_1.LogHandler.getInstance().log("Database <%s> insert to %s succesful.");
        }
    };
    return Database;
}());
exports.Database = Database;
