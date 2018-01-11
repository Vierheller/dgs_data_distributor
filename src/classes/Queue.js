"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.store = [];
    }
    Queue.prototype.push = function (val) {
        this.store.push(val);
    };
    Queue.prototype.pop = function () {
        return this.store.shift();
    };
    return Queue;
}());
exports.Queue = Queue;
