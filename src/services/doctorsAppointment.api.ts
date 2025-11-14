import { DoctorAppointment } from "../../types/doctorsAppointment.types";
import RestApi from "./restApi";

class DoctorsAppointmentApi extends RestApi<DoctorAppointment> {
  constructor() {
    super("doctorAppointment");
  }
}

const doctorsAppointmentApi = new DoctorsAppointmentApi();

export default doctorsAppointmentApi;
