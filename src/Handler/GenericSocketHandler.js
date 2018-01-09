"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var LogHandler_1 = require("./LogHandler");
var GenericSocketHandler = /** @class */ (function () {
    function GenericSocketHandler(name, server, port) {
        this.name = name;
        this.server = server;
        this.port = port;
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} created.");
        this.setupSocket();
    }
    GenericSocketHandler.prototype.setupSocket = function () {
        this.socket = io.connect("http://" + this.server + ":" + this.port);
        // Status Events
        this.socket.on("connect", this.onConnect.bind(this));
        this.socket.on("connect_error", this.onConnectError.bind(this));
        this.socket.on("connect_timeout", this.onConnectTimeout.bind(this));
        this.socket.on("reconnect", this.onReconnect.bind(this));
        this.socket.on("reconnecting", this.onReconnectAttempt.bind(this));
        this.socket.on("reconnect_attempt", this.onReconnectAttempt.bind(this));
        this.socket.on("reconnect_error", this.onReconnectError.bind(this));
        this.socket.on("reconnect_failed", this.onReconnectFailed.bind(this));
        // Data Event
        this.socket.on("data", this.onData.bind(this));
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} setup finished.");
    };
    GenericSocketHandler.prototype.onConnect = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} connect");
    };
    GenericSocketHandler.prototype.onConnectError = function (err) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} connect_error " + err);
    };
    GenericSocketHandler.prototype.onConnectTimeout = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} connect_timeout");
    };
    GenericSocketHandler.prototype.onReconnect = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} reconnect Attempt #" + attempt);
    };
    GenericSocketHandler.prototype.onReconnecting = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} reconnecting Attempt #" + attempt);
    };
    GenericSocketHandler.prototype.onReconnectAttempt = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} reconnect_attempt");
    };
    GenericSocketHandler.prototype.onReconnectError = function (err) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} reconnect_error " + err);
    };
    GenericSocketHandler.prototype.onReconnectFailed = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} reconnect_failed");
    };
    GenericSocketHandler.prototype.onData = function (data) {
        LogHandler_1.LogHandler.getInstance().log("Socket ${this.name} Received data: " + data);
    };
    return GenericSocketHandler;
}());
exports.GenericSocketHandler = GenericSocketHandler;
