
export type responseType = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
}

export type errorType = {
  statusCode: number;
  success: boolean;
  message: string;
}