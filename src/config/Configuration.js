"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.dbHost = "localhost";
    Configuration.dbName = "dgs";
    Configuration.dbPort = 5984;
    Configuration.dbUser = "admin";
    Configuration.dbPass = "admin";
    Configuration.socketHost = "rpi-lora-gtw";
    Configuration.socketPort = 3000;
    return Configuration;
}());
exports.Configuration = Configuration;
