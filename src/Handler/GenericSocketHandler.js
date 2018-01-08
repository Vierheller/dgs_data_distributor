"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var GenericSocketHandler = /** @class */ (function () {
    function GenericSocketHandler(name, server, port) {
        this.name = name;
        this.server = server;
        this.port = port;
        console.log('Socket %s created.', this.name);
        this.setupSocket();
    }
    GenericSocketHandler.prototype.setupSocket = function () {
        this.socket = io.connect('http://' + this.server + ':' + this.port);
        this.socket.on('connect', this.onConnect);
        this.socket.on('connect_error', this.onConnectError);
        this.socket.on('connect_timeout', this.onConnectTimeout);
        this.socket.on('reconnect', this.onReconnect);
        this.socket.on('reconnecting', this.onReconnectAttempt);
        this.socket.on('reconnect_attempt', this.onReconnectAttempt);
        this.socket.on('reconnect_error', this.onReconnectError);
        this.socket.on('reconnect_failed', this.onReconnectFailed);
        this.socket.on('data', this.onData);
        console.log('Socket <%s> setup finished.', this.name);
    };
    GenericSocketHandler.prototype.onConnect = function () {
        console.log('<%s> connect', this.name);
    };
    GenericSocketHandler.prototype.onConnectError = function (err) {
        console.log('<%s> connect_error %s', this.name, err);
    };
    GenericSocketHandler.prototype.onConnectTimeout = function () {
        console.log('<%s> connect_timeout', this.name);
    };
    GenericSocketHandler.prototype.onReconnect = function (attempt) {
        console.log('<%s> reconnect', 'Attempt #' + attempt, this.name);
    };
    GenericSocketHandler.prototype.onReconnecting = function (attempt) {
        console.log('<%s> reconnecting', 'Attempt #' + attempt, this.name);
    };
    GenericSocketHandler.prototype.onReconnectAttempt = function (attempt) {
        console.log('<%s> reconnect_attempt', this.name);
    };
    GenericSocketHandler.prototype.onReconnectError = function (err) {
        console.log('<%s> reconnect_error %s', this.name, err);
    };
    GenericSocketHandler.prototype.onReconnectFailed = function () {
        console.log('<%s> reconnect_failed', this.name);
    };
    GenericSocketHandler.prototype.onData = function (data) {
        console.log('<%s> Received data: ' + data, this.name);
    };
    return GenericSocketHandler;
}());
exports.GenericSocketHandler = GenericSocketHandler;
