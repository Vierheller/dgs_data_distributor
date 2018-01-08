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