import { Schema } from "express-validator";

export const create: Schema = {
    from: {
        in: ["body"],
        isString: true,
    },
};