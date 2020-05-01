import * as tokenHelper from "../util/token.helper";

import { UNAUTHORIZED  } from "../errorDefinition/errors.map";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny: any = global;
class AuthMiddleware {

    // this array will be passed from routes
    static accessCodes: [string];
    static async authorize(req: Request, res: Response, next: NextFunction) {
        const token = req.header("x-auth");
        const lang = req.header("languageid");
        if (lang) {
            switch (lang) {
                case "1":
                    globalAny.currentLang  = "en-US";
                    break;
                case "2":
                    globalAny.currentLang  = "ms";
                    break;
                case "3":
                    globalAny.currentLang  = "zh-Hans";
                    break;
                case "4":
                    globalAny.currentLang  = "zh-Hant";
                    break;    
                default:
                    globalAny.currentLang  = "en-US";
                    break;        
            }
        } else {
            globalAny.currentLang = "en-US";
        }

        try {
            const user = await tokenHelper.verify(token) as IUser;

            if (this) {
                if (this.accessCodes) {
                    const accesses = AuthMiddleware.accessControl(this.accessCodes, user);
    
                    if (!accesses) {
                        throw UNAUTHORIZED;
                    }
    
                    req.accesses = accesses;
                }
            }

            req.user = user;
            globalAny.currentUser = user;

            next();
        } catch (e) {
            console.log(e);
            return res.sendError(e, req.header("languageId"));
        }
    }

    static accessControl(accessCodes: [string], user: IUser) {
        // switch to true if one or more access codes found
        let grantAccess = false;
        if (!user.access_codes) {
            throw UNAUTHORIZED;
        }

        let accesses: [string];

        for (const userAccessCode of user.access_codes) {
            for (const accessCode of accessCodes) {
                if (accessCode == userAccessCode) {
                    accesses.push(AuthMiddleware.mapAccessCodeToMeaningfull(accessCode));
                    grantAccess = true;                        
                }
            }
        }

        if (!grantAccess) {
            throw UNAUTHORIZED;
        }
        return accesses;
       
    }

    static mapAccessCodeToMeaningfull(accessCode: string) {
        if (!accessCode) {
            return;
        }
        switch (accessCode[accessCode.length - 1]) {
            case "0":
                return "create";
            case "1":
                return "read";
            case "2":
                return "update";
            case "3":
                return "delete";
            case "9":
                return "admin";
            default:
                return accessCode;
        }
    }
}

module.exports = AuthMiddleware;
