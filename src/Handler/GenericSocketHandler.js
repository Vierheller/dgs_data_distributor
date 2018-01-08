"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
//import client = require("socket.io-client");
var GenericSocketHandler = /** @class */ (function () {
    function GenericSocketHandler(name, server, port) {
        this.name = name;
        this.server = server;
        this.port = port;
        this.setupSocket();
        console.log('Handler %s created.', this.name);
    }
    GenericSocketHandler.prototype.setupSocket = function () {
        this.socket = io.connect('http://' + this.server + ':' + this.port);
        this.socket.on('connect', function () {
            console.log('connect', 'connected');
        });
        this.socket.on('connect_error', function (err) {
            console.log('connect_error', err);
        });
        this.socket.on('connect_timeout', function () {
            console.log('connect_timeout');
        });
        this.socket.on('reconnect', function (attempt) {
            console.log('reconnect', 'Attempt #' + attempt);
        });
        this.socket.on('reconnecting', function (attempt) {
            console.log('reconnecting', 'Attempt #' + attempt);
        });
        this.socket.on('reconnect_attempt', function () {
            console.log('reconnect_attempt');
        });
        this.socket.on('reconnect_error', function (err) {
            console.log('reconnect_error', err);
        });
        this.socket.on('reconnect_failed', function () {
            console.log('reconnect_failed');
        });
        this.socket.on('data', function (data) {
            this.onData(data);
        });
    };
    GenericSocketHandler.prototype.onData = function (data) {
        console.log('Received data: ' + data);
    };
    return GenericSocketHandler;
}());
exports.GenericSocketHandler = GenericSocketHandler;
