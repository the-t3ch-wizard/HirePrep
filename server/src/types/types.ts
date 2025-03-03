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

export interface Contest {
  attended: boolean;
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  ranking: number;
  contest: {
    title: string;
    startTime: number;
  };
}

export interface ContestActivity {
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  ranking: number;
  title: string;
  startTime: number;
}