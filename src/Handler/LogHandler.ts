import { Logger, LoggerInstance, transports} from "winston";

export class LogHandler {

    public static getInstance() {
        if (!LogHandler.instance) {
            LogHandler.instance = new LogHandler();
        }
        return LogHandler.instance;
    }

    private static instance: LogHandler;
    private writer: LoggerInstance;

    private constructor() {
        this.writer = new Logger({
            transports: [
            new transports.Console({timestamp: true}),
            new transports.File ({timestamp: true, filename: "dgs_data_distributor.log" }),
            ],
        });
    }

    public log(message: string, ...args: any[]) {
        this.writer.info(message, args);
    }
}
