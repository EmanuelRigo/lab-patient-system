import {model, schema} from "mongoose";
import { DoctorsAppointment } from "../../../../../types/doctorsAppointment.types";

const collection = "doctors_appointments"

const schema = schema<DoctorsAppointment>(