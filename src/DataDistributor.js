"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericSocketHandler_1 = require("./Handler/GenericSocketHandler");
var DataDistributor = /** @class */ (function () {
    function DataDistributor() {
        console.log('DataDistributor started');
        this.imageHandler = new GenericSocketHandler_1.GenericSocketHandler('Image', '127.0.0.1', 20001);
        //this.telemtryHandler    = new GenericSocketHandler('Telemetry','127.0.0.1',20002);
        //this.logHandler         = new GenericSocketHandler('Log','127.0.0.1',20003);
    }
    return DataDistributor;
}());
exports.DataDistributor = DataDistributor;
