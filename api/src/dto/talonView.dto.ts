import { Talon } from "../../../types/talon.types";
import envsUtils from "../utils/envs.utils";
import crypto from "crypto";

const { PERSISTENCE } = envsUtils;

export default class TalonViewDTO {
  constructor(
    public _id: string,
    public isPaid: boolean,
    public totalAmount: number,
    public createdAt: Date,
    public updatedAt: Date,
    public receptionistFirstName?: string,
    public receptionistLastName?: string,
    public patientFirstName?: string,
    public patientLastName?: string,
    public patientPhoneNumber?: string
  ) {}
}
