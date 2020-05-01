declare namespace Express {
  export interface Request {
    accesses?: [string];
  }

  export interface Response {
   sendSuccess?(data: any): void;
   sendError?(message: string, code?: string): void;
  }
}
