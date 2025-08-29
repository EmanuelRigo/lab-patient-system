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
    biochemistId: {
      type: String,
    },
    labtechnicianId: {
      type: String,
      required: true,
    },
    extractionDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const ResultModel = model<Result>(collection, resultSchema);
export default ResultModel;
