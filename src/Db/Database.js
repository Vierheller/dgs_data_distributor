"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_couchdb_client_1 = require("@teammaestro/node-couchdb-client");
var Queue_1 = require("../classes/Queue");
var LogHandler_1 = require("../Handler/LogHandler");
var Database = /** @class */ (function () {
    function Database(name, host, port, user, pass) {
        this.dbName = name;
        this.dbHost = host;
        this.dbPort = port;
        this.dbUser = user;
        this.dbPass = pass;
        this.dbQueue = new Queue_1.Queue();
        this.db = new node_couchdb_client_1.CouchDb({
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
    Database.prototype.connect = function () {
        var _this = this;
        this.db.checkDatabaseExists(this.dbName)
            .then(function (result) {
            LogHandler_1.LogHandler.getInstance().log("Database <%s> available:" + result, _this.dbName);
            _this.db.createDatabase(_this.dbName)
                .then(function (created) {
                LogHandler_1.LogHandler.getInstance().log("Database <%s> created:" + created, _this.dbName);
            })
                .catch(function (err) {
                LogHandler_1.LogHandler.getInstance().log("Database <%s>  :" + err, _this.dbName);
            });
        })
            .catch(function (err) {
            LogHandler_1.LogHandler.getInstance().log("Database <%s>  :" + err, _this.dbName);
        });
    };
    Database.prototype.saveData = function (data) {
        var _this = this;
        this.db.createDocument({ doc: { data: data } })
            .then(function (docs) {
            LogHandler_1.LogHandler.getInstance().log("Database Insert succesful<%s>  :" + docs, _this.dbName);
        }).catch(function (errors) {
            LogHandler_1.LogHandler.getInstance().log("Database Insert failed. <%s> :" + errors.message, _this.dbName);
            _this.dbQueue.push(data);
        });
    };
    return Database;
}());
exports.Database = Database;
