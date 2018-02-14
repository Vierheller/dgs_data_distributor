import * as io from "socket.io-client";
import {Configuration} from "../config/Configuration";
import { Database } from "../Db/Database";
import {LogHandler} from "./LogHandler";

export class GenericSocketHandler {
    public socket: SocketIOClient.Socket;
    public host: string;
    public port: number;
    private db: Database;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        // tslint:disable-next-line:max-line-length
        this.db = new Database(Configuration.dbName, Configuration.dbHost, Configuration.dbPort, Configuration.dbUser, Configuration.dbPass);
        LogHandler.getInstance().log("Socket " + this.host + " created.");
        this.db.connect();
        this.setupSocket();
    }

    private setupSocket() {

        this.socket = io.connect("http://" + this.host + ":" + this.port);

        // Status Events
        this.socket.on("connect",       this.onConnect.bind(this));
        this.socket.on("connect_error", this.onConnectError.bind(this));
        this.socket.on("connect_timeout", this.onConnectTimeout.bind(this));
        this.socket.on("reconnect",     this.onReconnect.bind(this));
        this.socket.on("reconnecting",  this.onReconnectAttempt.bind(this));
        this.socket.on("reconnect_attempt", this.onReconnectAttempt.bind(this));
        this.socket.on("reconnect_error", this.onReconnectError.bind(this));
        this.socket.on("reconnect_failed", this.onReconnectFailed.bind(this));
        // Data Event
        this.socket.on("event",          this.onData.bind(this));

        LogHandler.getInstance().log("Socket " + this.host + "  events setup.");
    }

    private onConnect() {
        LogHandler.getInstance().log("Socket " + this.host + "  connect");
    }

    private onConnectError(err: string) {
        LogHandler.getInstance().log("Socket " + this.host + " connect_error " + err);
    }

    private onConnectTimeout() {
        LogHandler.getInstance().log("Socket " + this.host + "  connect_timeout");
    }

    private onReconnect(attempt: number) {
        LogHandler.getInstance().log("Socket " + this.host + "  reconnect Attempt #" + attempt);
    }

    private onReconnecting(attempt: number) {
        LogHandler.getInstance().log("Socket " + this.host + "  reconnecting Attempt #" + attempt);
    }

    private onReconnectAttempt(attempt: number) {
        LogHandler.getInstance().log("Socket " + this.host + "  reconnect_attempt");
    }

    private onReconnectError(err: string) {
        LogHandler.getInstance().log("Socket " + this.host + "  reconnect_error " + err);
    }

    private onReconnectFailed() {
        LogHandler.getInstance().log("Socket " + this.host + "  reconnect_failed");
    }

    private onData(data: string) {
        LogHandler.getInstance().log("Socket " + this.host + "  Received data: " + data);
        this.db.saveData(JSON.parse(data));
    }
}
