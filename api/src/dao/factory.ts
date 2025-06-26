import MongoSingleton from "../utils/mongoDB.utils";
import envsUtils from "../utils/envs.utils";
// import DaoIndexMongo from "./mongo/index.dao";
import {
  DoctorsAppointmentDaoMongo,
  LabStaffDaoMongo,
  MedicalStudyDaoMongo,
  PatientDaoMongo,
  PaymentDaoMongo,
  ResultDaoMongo,
  TalonDaoMongo,
} from "./mongo/index.dao";

const { PERSISTENCE } = envsUtils;

let dao: any = {};

let daoMongo: any = {};

daoMongo = {
  DoctorsAppointmentDaoMongo,
  LabStaffDaoMongo,
  MedicalStudyDaoMongo,
  PatientDaoMongo,
  PaymentDaoMongo,
  ResultDaoMongo,
  TalonDaoMongo,
};

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

    const DoctorsAppointmentDao = daoMongo.DoctorsAppointmentDaoMongo;
    const LabStaffDao = daoMongo.LabStaffDaoMongo;
    const MedicalStudyDao = daoMongo.MedicalStudyDaoMongo;
    const PatientDao = daoMongo.PatientDaoMongo;
    const PaymentDao = daoMongo.PaymentDaoMongo;
    const ResultDao = daoMongo.ResultDaoMongo;
    const TalonDao = daoMongo.TalonDaoMongo;
    //const labStaffDao = require("./mongo/labStaff.dao").default;
    //const medicalStudyDao = require("./mongo/medicalStudy.dao").default;
    //const patientDao = require("./mongo/patient.dao").default;

    // require("./mongo/doctorsAppointment.dao").default;
    dao = {
      DoctorsAppointmentDao: DoctorsAppointmentDao,
      LabStaffDao: LabStaffDao,
      MedicalStudyDao: MedicalStudyDao,
      PatientDao: PatientDao,
      PaymentDao: PaymentDao,
      ResultDao: ResultDao,
      TalonDao: TalonDao,
    };
    break;
}

export default dao;
