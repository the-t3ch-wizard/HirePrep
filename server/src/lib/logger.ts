import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, stack }: any) => `${timestamp}: ${stack || message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log" })
  ],
});
