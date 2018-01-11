"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as Nano from "nano";
var node_couchdb_client_1 = require("@teammaestro/node-couchdb-client");
var LogHandler_1 = require("../Handler/LogHandler");
var Database = /** @class */ (function () {
    function Database(name, host, port, user, pass) {
        this.dbName = name;
        this.dbHost = host;
        this.dbPort = port;
        this.dbUser = user;
        this.dbPass = pass;
        this.db = new node_couchdb_client_1.CouchDb({
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
    Database.prototype.connect = function () {
        var _this = this;
        this.db.checkDatabaseExists(this.dbName)
            .then(function (result) {
            LogHandler_1.LogHandler.getInstance().log("Database" + _this.dbName + " available:" + result);
            _this.db.createDatabase(_this.dbName)
                .then(function (created) {
                LogHandler_1.LogHandler.getInstance().log("Database " + _this.dbName + " created:" + created);
            })
                .catch(function (err) {
                LogHandler_1.LogHandler.getInstance().log("Database " + _this.dbName + " :" + err);
            });
        })
            .catch(function (err) {
            LogHandler_1.LogHandler.getInstance().log("Database " + _this.dbName + " :" + err);
        });
    };
    Database.prototype.saveData = function (data) {
        var _this = this;
        // ToDo Implement Saving
        // this.db.insert(data, this.onInsert.bind(this));
        this.db.createDocument(data)
            .then(function (docs) {
            LogHandler_1.LogHandler.getInstance().log("Database " + _this.dbName + " :" + docs);
        }).catch(function (errors) {
            LogHandler_1.LogHandler.getInstance().log("Database " + _this.dbName + " :" + errors.message);
        });
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
