import * as winston from "winston";

export function createLogger(loggerName: string) {
	return winston.createLogger({
		level: "info",
		format: winston.format.json(),
		defaultMeta: { name: loggerName },
		transports: [new winston.transports.Console()],
	});
}
