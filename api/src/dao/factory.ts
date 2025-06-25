import MongoSingleton from "../utils/mongoDB.utils";
import envsUtils from "../utils/envs.utils";
import DaoIndex from "./mongo/index.dao";

const { PERSISTENCE } = envsUtils;

let dao: any = {};

switch (PERSISTENCE) {
  // case "SQL":
  //   console.log("connected to FS");
  //   const ProductsManagerFS = require("./fs/managers/products.manager.fs.js").default;
  //   const UsersManagerFS = require("./fs/managers/users.manager.fs.js").default;
  //   const CartsManagerFS = require("./fs/managers/carts.manager.fs.js").default;
  //   dao = {
  //     ProductsManager: ProductsManagerFS,
  //     UsersManager: UsersManagerFS,
  //     CartsManager: CartsManagerFS,
  //   };
  //   break;

  default:
    MongoSingleton.getInstance();
    const DoctorsAppointmentDao = DaoIndex;
    const labStaffDao = require("./mongo/labStaff.dao").default;
    const medicalStudyDao = require("./mongo/medicalStudy.dao").default;
    const patientDao = require("./mongo/patient.dao").default;
    const doctorsAppointmentDao =
      require("./mongo/doctorsAppointment.dao").default;
    dao = {
      LabStaffDao: labStaffDao,
      MedicalStudyDao: medicalStudyDao,
      PatientDao: patientDao,
      DoctorsAppointmentDao: doctorsAppointmentDao,
    };
    break;
}

export default dao;
