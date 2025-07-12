import { Talon } from "../../types/talon.types";
import RestApi from "@/services/restApi";

export default new (class TalonApi extends RestApi<Talon> {
  constructor() {
    super("talon");
  }
})();
