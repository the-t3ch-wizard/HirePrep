import { logger } from "../lib/logger";

export const loggerMiddleware = (req: any, res: any, next: any) => {
  logger.info(`REQUEST: ${req.method} ${req.url}`);
  next();
};
