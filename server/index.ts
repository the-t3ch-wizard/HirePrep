import express from 'express'
import { loggerMiddleware } from './src/middlewares/logger.middleware';
import { asyncHandler, errorHandler, errorResponse, successResponse } from './src/lib/utils';

const app = express();

app.use(express.json())
app.use(loggerMiddleware)

app.get('/', asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, { message: "Server running" }, "Request successful"))
}))

// all routes

app.use((req, res, next) => {
  res.status(404).json(errorResponse(404, "Not Found"));
});
  
app.use(errorHandler);

app.listen(7000, () => {
  console.log('The server is running locally on 7000 port: http://localhost:7000');
})
