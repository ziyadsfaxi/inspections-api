import { Schema } from "express-validator";

export const create: Schema = {
    from: {
        in: ["body"],
        isInt: true,
    },
    test: {
        in: ["body"],
        isString: true,
    },
};