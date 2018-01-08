import * as io from 'socket.io-client';
//import client = require("socket.io-client");

export class GenericSocketHandler{
    socket      :SocketIOClient.Socket;
    name        :string;    
    server      :string;
    port        :number;

    constructor(name:string,server:string,port:number){
        this.name = name;
        this.server = server;
        this.port = port;
        
        this.setupSocket();
        
        console.log('Handler %s created.',this.name);
    }
    
    private setupSocket(){
        
        this.socket = io.connect('http://'+this.server+':'+this.port);
        
        this.socket.on('connect', function () {
                console.log('connect', 'connected');
        });
        this.socket.on('connect_error', function (err: string) {
                console.log('connect_error', err);
        });
        this.socket.on('connect_timeout', function () {
                console.log('connect_timeout');
        });
        this.socket.on('reconnect', function (attempt: number) {
                console.log('reconnect', 'Attempt #' + attempt);
        });
        this.socket.on('reconnecting', function (attempt: number) {
                console.log('reconnecting', 'Attempt #' + attempt);
        });
        this.socket.on('reconnect_attempt', function () {
                console.log('reconnect_attempt');
        });
        this.socket.on('reconnect_error', function (err :string) {
                console.log('reconnect_error', err);
        });
        this.socket.on('reconnect_failed', function () {
                console.log('reconnect_failed');
        });
        this.socket.on('data', function (this :GenericSocketHandler,data :string) {
                this.onData(data);
        });
    }

    private onData(data: string){
        console.log('Received data: '+data);
    }
}