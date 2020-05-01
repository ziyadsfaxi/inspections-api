import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
  email: string;
  password: string;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      minlength: 1,
      validate: {
        validator: isEmail,
        message: "{VALUE} is not valid email.",
      },
    },
   
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("user", userSchema);
