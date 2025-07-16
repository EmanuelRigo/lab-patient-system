import { DoctorsAppointment } from "../../types/doctorsAppointment.types";
import RestApi from "./restApi";

export default new (class DoctorsAppointmentApi extends RestApi<DoctorsAppointment> {
  constructor() {
    super("doctorAppointment");
  }
})();
