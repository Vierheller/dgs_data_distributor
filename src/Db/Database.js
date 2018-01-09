"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nano = require("nano");
var Database = /** @class */ (function () {
    function Database(dbAdress, dbPort, dbName) {
        this.dbHelper = Nano(dbAdress + ':' + dbPort);
    }
    Database.prototype.connect = function () {
        this.db = this.dbHelper.use(this.dbName, this.onConnect.bind(this));
    };
    Database.prototype.saveData = function (data) {
    };
    Database.prototype.setupDatabase = function () {
        //ToDo: Connect to Database, start replication .... 
    };
    Database.prototype.onConnect = function (err, body, header) {
        if (err) {
            console.log('Connection Error %s ', err.message);
        }
        else {
            console.log('Connection to %s succesful. Response: %s %s', this.dbName, body, header);
        }
    };
    return Database;
}());
exports.Database = Database;
