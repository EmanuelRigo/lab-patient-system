import { model, Schema } from "mongoose";
import { MedicalStudy } from "../../../../../types/medicalStudy.types";

const collection = "MedicalStudies";

const schema = new Schema<MedicalStudy>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const MedicalStudyModel = model<MedicalStudy>(collection, schema);
export default MedicalStudyModel;
