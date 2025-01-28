import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";

import { asyncHandler, errorHandler, errorResponse, successResponse } from './src/lib/utils';
import { loggerMiddleware } from './src/middlewares/logger.middleware';
import rootRouter from './src/routes/index.routes';
import connectDB from './src/config/database';
import { env } from './src/config/env';

const app = express();

app.use(express.json())
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}))
app.use(cookieParser())

// middleware
app.use(loggerMiddleware)

// api to test server status
app.get('/', asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, "Req successful", { message: "Server is running fine" }))
}))

// all routes
app.use("/api/v1/", rootRouter);

app.use((req, res, next) => {
  res.status(404).json(errorResponse(404, "Not Found"));
});

// error handler middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT || 7000, () => {
      console.log('The server is running locally on port 7000: http://localhost:7000');
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
