import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

class RequestBodyValidator {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};
    static async check(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            
            // -2 as validation error.
            return res.sendError(JSON.stringify(errors.mapped()), "-2");
        }
        next();
    }
}

export default RequestBodyValidator;
