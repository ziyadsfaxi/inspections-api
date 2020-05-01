declare namespace Express {
  export interface Request {
    accesses?: [string];
  }

  export interface Response {
   sendSuccess?(data: any, total_count?: number): void;
   sendError?(code: string, languageId: string, action?: any, devError?: any): void;
  }
}
