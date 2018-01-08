"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericSocketHandler_1 = require("./Handler/GenericSocketHandler");
var DataDistributor = /** @class */ (function () {
    function DataDistributor() {
        this.imageHandler = new GenericSocketHandler_1.GenericSocketHandler('Image', '127.0.0.1', 20001);
        this.telemtryHandler = new GenericSocketHandler_1.GenericSocketHandler('Telemetry', '127.0.0.1', 20002);
        this.logHandler = new GenericSocketHandler_1.GenericSocketHandler('Log', '127.0.0.1', 20003);
    }
    return DataDistributor;
}());
exports.DataDistributor = DataDistributor;
