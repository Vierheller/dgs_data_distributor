"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var LogHandler = /** @class */ (function () {
    function LogHandler() {
        this.writer = new winston_1.Logger({
            transports: [
                new winston_1.transports.Console({ timestamp: true }),
                new winston_1.transports.File({ timestamp: true, filename: "dgs_data_distributor.log" }),
            ],
        });
    }
    LogHandler.getInstance = function () {
        if (!LogHandler.instance) {
            LogHandler.instance = new LogHandler();
        }
        return LogHandler.instance;
    };
    LogHandler.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.writer.info(message, args);
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
