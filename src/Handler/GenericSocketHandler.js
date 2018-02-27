"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Configuration_1 = require("../config/Configuration");
var Database_1 = require("../Db/Database");
var LogHandler_1 = require("./LogHandler");
var GenericSocketHandler = /** @class */ (function () {
    function GenericSocketHandler(host, port) {
        this.host = host;
        this.port = port;
        // tslint:disable-next-line:max-line-length
        this.db = new Database_1.Database(Configuration_1.Configuration.dbName, Configuration_1.Configuration.dbHost, Configuration_1.Configuration.dbPort, Configuration_1.Configuration.dbUser, Configuration_1.Configuration.dbPass);
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + " created.");
        this.db.connect();
        this.socket = io.connect("http://" + this.host + ":" + this.port);
        this.setupSocket();
    }
    GenericSocketHandler.prototype.setupSocket = function () {
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
        this.socket.on("event", this.onData.bind(this));
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  events setup.");
    };
    GenericSocketHandler.prototype.onConnect = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  connect");
    };
    GenericSocketHandler.prototype.onConnectError = function (err) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + " connect_error " + err);
    };
    GenericSocketHandler.prototype.onConnectTimeout = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  connect_timeout");
    };
    GenericSocketHandler.prototype.onReconnect = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  reconnect Attempt #" + attempt);
    };
    GenericSocketHandler.prototype.onReconnecting = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  reconnecting Attempt #" + attempt);
    };
    GenericSocketHandler.prototype.onReconnectAttempt = function (attempt) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  reconnect_attempt");
    };
    GenericSocketHandler.prototype.onReconnectError = function (err) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  reconnect_error " + err);
    };
    GenericSocketHandler.prototype.onReconnectFailed = function () {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  reconnect_failed");
    };
    GenericSocketHandler.prototype.onData = function (data) {
        LogHandler_1.LogHandler.getInstance().log("Socket " + this.host + "  Received data: " + data);
        this.db.saveData(JSON.parse(data));
    };
    return GenericSocketHandler;
}());
exports.GenericSocketHandler = GenericSocketHandler;
