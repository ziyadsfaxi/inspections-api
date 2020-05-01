import { Request, Response, NextFunction } from "express";
import IResponse from "../interfaces/response.interface";

export default function responseSuccessErrorOverride(req: Request, res: Response, next: NextFunction) {
  res.sendSuccess = (data) => {
    const response: IResponse = {
      code: "0000",
      data,
    };
    return res.json(response);
  };

  res.sendError = (message, code = "-1") => {
    const response: IResponse = {
      code,
      message,
    };
    return res.json(response);
  };
  next();
}
