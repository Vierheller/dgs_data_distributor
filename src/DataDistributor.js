"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = require("./config/Configuration");
var Database_1 = require("./Db/Database");
var GenericSocketHandler_1 = require("./Handler/GenericSocketHandler");
var LogHandler_1 = require("./Handler/LogHandler");
var DataDistributor = /** @class */ (function () {
    function DataDistributor() {
    }
    DataDistributor.main = function () {
        var dd = new DataDistributor();
        LogHandler_1.LogHandler.getInstance().log("DataDistributor started");
        dd.setupSocket();
        dd.setupDatabase();
    };
    DataDistributor.prototype.setupSocket = function () {
        this.socket = new GenericSocketHandler_1.GenericSocketHandler(Configuration_1.Configuration.socketHost, Configuration_1.Configuration.socketPort);
    };
    DataDistributor.prototype.setupDatabase = function () {
        this.database = new Database_1.Database(Configuration_1.Configuration.dbName, Configuration_1.Configuration.dbHost, Configuration_1.Configuration.dbPort, Configuration_1.Configuration.dbUser, Configuration_1.Configuration.dbPass);
    };
    return DataDistributor;
}());
exports.DataDistributor = DataDistributor;
