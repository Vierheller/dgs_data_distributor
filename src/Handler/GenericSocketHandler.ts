import * as io from "socket.io-client";
import {LogHandler} from "./LogHandler";

export class GenericSocketHandler {
    public socket: SocketIOClient.Socket;
    public name: string;
    public server: string;
    public port: number;

    constructor(name: string, server: string, port: number) {
        this.name = name;
        this.server = server;
        this.port = port;

        LogHandler.getInstance().log("Socket ${this.name} created.");
        this.setupSocket();
    }

    private setupSocket() {

        this.socket = io.connect("http://" + this.server + ":" + this.port);

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
        this.socket.on("data",          this.onData.bind(this));

        LogHandler.getInstance().log("Socket ${this.name} setup finished.");
    }

    private onConnect() {
        LogHandler.getInstance().log("Socket ${this.name} connect");
    }

    private onConnectError(err: string) {
        LogHandler.getInstance().log("Socket ${this.name} connect_error " + err);
    }

    private onConnectTimeout() {
        LogHandler.getInstance().log("Socket ${this.name} connect_timeout");
    }

    private onReconnect(attempt: number) {
        LogHandler.getInstance().log("Socket ${this.name} reconnect Attempt #" + attempt);
    }

    private onReconnecting(attempt: number) {
        LogHandler.getInstance().log("Socket ${this.name} reconnecting Attempt #" + attempt);
    }

    private onReconnectAttempt(attempt: number) {
        LogHandler.getInstance().log("Socket ${this.name} reconnect_attempt");
    }

    private onReconnectError(err: string) {
        LogHandler.getInstance().log("Socket ${this.name} reconnect_error " + err);
    }

    private onReconnectFailed() {
        LogHandler.getInstance().log("Socket ${this.name} reconnect_failed");
    }

    private onData(data: string) {
        LogHandler.getInstance().log("Socket ${this.name} Received data: " + data);
    }
}
