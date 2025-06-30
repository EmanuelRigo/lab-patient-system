import Controller from "./index.controller";
import paymentService from "../services/payment.services";

const controller = new Controller(paymentService);
export default controller;
