"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericSocketHandler_1 = require("./Handler/GenericSocketHandler");
var LogHandler_1 = require("./Handler/LogHandler");
var DataDistributor = /** @class */ (function () {
    function DataDistributor() {
        LogHandler_1.LogHandler.getInstance().log("DataDistributor started");
        this.gatewayImageHandler = new GenericSocketHandler_1.GenericSocketHandler("Image", "127.0.0.1", 20001);
        this.gatewayTelemtryHandler = new GenericSocketHandler_1.GenericSocketHandler("Telemetry", "127.0.0.1", 20002);
        this.gatewayLogHandler = new GenericSocketHandler_1.GenericSocketHandler("Log", "127.0.0.1", 20003);
    }
    return DataDistributor;
}());
exports.DataDistributor = DataDistributor;
