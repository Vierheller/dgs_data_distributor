"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nano = require("nano");
var LogHandler_1 = require("../Handler/LogHandler");
var Database = /** @class */ (function () {
    function Database(dbAdress, dbPort, dbName) {
        this.dbHelper = Nano(dbAdress + ":" + dbPort);
    }
    Database.prototype.connect = function () {
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
