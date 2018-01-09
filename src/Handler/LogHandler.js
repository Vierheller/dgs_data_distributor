"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var LogHandler = /** @class */ (function () {
    function LogHandler() {
        this.writer = new winston_1.Logger({
            transports: [
                new winston_1.transports.Console({ timestamp: true }),
                new winston_1.transports.File({ timestamp: true, filename: "somefile.log" }),
            ],
        });
    }
    LogHandler.getInstance = function () {
        if (!LogHandler.instance) {
            LogHandler.instance = new LogHandler();
            // ... any one time initialization goes here ...
        }
        return LogHandler.instance;
    };
    LogHandler.prototype.log = function (message) {
        this.writer.info(message);
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
