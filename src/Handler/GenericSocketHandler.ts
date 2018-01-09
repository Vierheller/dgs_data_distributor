import * as io from 'socket.io-client';

export class GenericSocketHandler{
    socket      :SocketIOClient.Socket;
    name        :string;    
    server      :string;
    port        :number;

    constructor(name:string,server:string,port:number){
        this.name = name;
        this.server = server;
        this.port = port;
        
        console.log('Socket %s created.',this.name);
        this.setupSocket();
    }
    
    private setupSocket(){
        
        this.socket = io.connect('http://'+this.server+':'+this.port);
        
        //Status Events
        this.socket.on('connect',       this.onConnect.bind(this));
        this.socket.on('connect_error', this.onConnectError.bind(this));
        this.socket.on('connect_timeout', this.onConnectTimeout.bind(this));
        this.socket.on('reconnect',     this.onReconnect.bind(this));
        this.socket.on('reconnecting',  this.onReconnectAttempt.bind(this));
        this.socket.on('reconnect_attempt', this.onReconnectAttempt.bind(this)); 
        this.socket.on('reconnect_error', this.onReconnectError.bind(this));
        this.socket.on('reconnect_failed', this.onReconnectFailed.bind(this));
        //Data Event
        this.socket.on('data',          this.onData.bind(this));

        console.log('Socket <%s> setup finished.', this.name);
    }

    private onConnect(){
        console.log('<%s> connect',this.name);
    }

    private onConnectError(err:string){
        console.log('<%s> connect_error %s',this.name, err);
    }

    private onConnectTimeout(){
        console.log('<%s> connect_timeout',this.name);
    }

    private onReconnect(attempt:number){
        console.log('<%s> reconnect', 'Attempt #' + attempt,this.name);
    }

    private onReconnecting(attempt:number){
        console.log('<%s> reconnecting', 'Attempt #' + attempt,this.name);
    }

    private onReconnectAttempt(attempt:number){
        console.log('<%s> reconnect_attempt',this.name);
    }

    private onReconnectError(err:string){
        console.log('<%s> reconnect_error %s', this.name,err);
    }

    private onReconnectFailed(){
        console.log('<%s> reconnect_failed', this.name);
    }

    private onData(data: string){
        console.log('<%s> Received data: '+data,this.name);
    }
}