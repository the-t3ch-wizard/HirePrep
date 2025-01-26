import { NextFunction, Request, Response } from "express";

export interface Req extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
  };
}

export interface Res extends Response {
}

export interface Next extends NextFunction {
}
