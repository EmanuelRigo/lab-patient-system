import Controller from "./index.controller";
import resultService from "../services/result.services";

const controller = new Controller(resultService);
export default controller;
