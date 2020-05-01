import mongoose, { Document, Schema } from "mongoose";

export interface IInspectionSlot extends Document {
  from: Date;
  /**
   * not required for now, it's defaulted to a mock id.
   */
  userId?: string;
  /**
   * not required for now, it's defaulted to a mock id.
   */
  inspectorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const schema = new Schema(
  {
    from: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        // this is a mock user.
        default: "1",
    },
    inspectorId: {
        type: String,
        // this is a mock user.
        default: "2",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IInspectionSlot>("inspection_slot", schema);
