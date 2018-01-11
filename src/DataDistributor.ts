import {Configuration} from "./config/Configuration";
import {GenericSocketHandler} from "./Handler/GenericSocketHandler";
import {LogHandler} from "./Handler/LogHandler";

export class DataDistributor {
    public static main() {
        const dd = new DataDistributor();
        LogHandler.getInstance().log("DataDistributor started");
        dd.setupSocket();
    }

    private socket: GenericSocketHandler;

    private setupSocket() {
        this.socket = new GenericSocketHandler(Configuration.socketHost, Configuration.socketPort);
    }
}
