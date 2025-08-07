import { Result } from "../../types/result.types";
import RestApi from "@/services/restApi";

class ResultApi extends RestApi<Result> {
  constructor() {
    super("doctorAppointment");
  }
}

const resultApi = new ResultApi();

export default resultApi;
