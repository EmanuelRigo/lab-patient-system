import { model, Schema } from "mongoose";
import { Result } from "../../../../../types/result.types";

const collection = "results";

const resultSchema = new Schema<Result>(
  {
    status: {
      type: String,
      enum: ["pending", "status_completed", "failed"],
      default: "pending",
    },
    biochemist_id: {
      type: String,
    },
    labtechnician_id: {
      type: String,
      required: true,
    },
    extration_date: {
      type: Date,
      required: true,
    },
    extractionTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ResultModel = model<Result>(collection, resultSchema);
export default ResultModel;
