import { Result } from "../../types/result.types";
import RestApi from "@/services/restApi";

export default new (class ResultApi extends RestApi<Result> {
  constructor() {
    super("result");
  }
})();
