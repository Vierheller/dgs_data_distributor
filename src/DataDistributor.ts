import {GenericSocketHandler} from "./Handler/GenericSocketHandler";
import {LogHandler} from "./Handler/LogHandler";

export class DataDistributor {
    public gatewayImageHandler: GenericSocketHandler;
    public gatewayTelemtryHandler: GenericSocketHandler;
    public gatewayLogHandler: GenericSocketHandler;

    constructor() {
        LogHandler.getInstance().log("DataDistributor started");
        this.gatewayImageHandler       = new GenericSocketHandler("Image", "127.0.0.1", 20001);
        this.gatewayTelemtryHandler    = new GenericSocketHandler("Telemetry", "127.0.0.1", 20002);
        this.gatewayLogHandler         = new GenericSocketHandler("Log", "127.0.0.1", 20003);
    }

}
