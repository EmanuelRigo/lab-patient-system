import { model, Schema } from "mongoose";
import { Result } from "../../../../../types/result.types";

const collection = "results";

const resultSchema = new Schema<Result>(
  {
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    IdBiochemist: {
      type: String,
      required: true,
    },
    IdLabTechnician: {
      type: String,
      required: true,
    },
    extractionDate: {
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
