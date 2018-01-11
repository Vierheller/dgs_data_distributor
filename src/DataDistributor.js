"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = require("./config/Configuration");
var GenericSocketHandler_1 = require("./Handler/GenericSocketHandler");
var LogHandler_1 = require("./Handler/LogHandler");
var DataDistributor = /** @class */ (function () {
    function DataDistributor() {
    }
    DataDistributor.main = function () {
        var dd = new DataDistributor();
        LogHandler_1.LogHandler.getInstance().log("DataDistributor started");
        dd.setupSocket();
    };
    DataDistributor.prototype.setupSocket = function () {
        this.socket = new GenericSocketHandler_1.GenericSocketHandler(Configuration_1.Configuration.socketHost, Configuration_1.Configuration.socketPort);
    };
    return DataDistributor;
}());
exports.DataDistributor = DataDistributor;
