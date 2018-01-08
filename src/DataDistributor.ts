import {GenericSocketHandler} from "./Handler/GenericSocketHandler";

export class DataDistributor{
    imageHandler    : GenericSocketHandler;
    telemtryHandler : GenericSocketHandler;
    logHandler      : GenericSocketHandler;
    
    constructor () {
        console.log('DataDistributor started');
        this.imageHandler       = new GenericSocketHandler('Image','127.0.0.1',20001);
        //this.telemtryHandler    = new GenericSocketHandler('Telemetry','127.0.0.1',20002);
        //this.logHandler         = new GenericSocketHandler('Log','127.0.0.1',20003);
    }
    
}