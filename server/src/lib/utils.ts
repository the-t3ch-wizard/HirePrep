import { logger } from "./logger";

export const asyncHandler = (fn: any) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(errorResponse(500, error.message || "An error occurred"));
  }
};

export const successResponse = (statusCode: number, message = "Request successful", data: any) => {
  logger.info(`RESPONSE: ${statusCode} ${message}`);
  // logger.success(`RESPONSE: ${statusCode} ${message}`);
  return {
    statusCode,
    success: true,
    message,
    data,
  };
};

export const errorResponse = (statusCode: number, message = "An error occurred", errors = []) => {
  logger.error(`ERROR: ${statusCode} ${message}`);
  return {
    statusCode,
    success: false,
    message,
    errors,
  };
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  // Optionally send error to an external monitoring service
  // e.g., logErrorToMonitoringService(err);

  res.status(500).json(errorResponse(500, "Internal Server Error"));
};