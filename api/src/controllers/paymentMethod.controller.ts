import Controller from "./index.controller";
import paymentMethodService from "../services/paymentMethod.services";

const controller = new Controller(paymentMethodService);
export default controller;
