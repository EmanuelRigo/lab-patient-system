import { DoctorsAppointment } from "../../types/doctorsAppointment.types";
import RestApi from "./restApi";

class DoctorsAppointmentApi extends RestApi<DoctorsAppointment> {
  constructor() {
    super("doctorAppointment");
  }
}

const doctorsAppointmentApi = new DoctorsAppointmentApi();

export default doctorsAppointmentApi;
