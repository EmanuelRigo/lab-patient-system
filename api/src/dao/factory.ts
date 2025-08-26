import MongoSingleton from "../utils/mongoDB.utils";
import envsUtils from "../utils/envs.utils";
// import DaoIndexMongo from "./mongo/index.dao";
import { testMySQLConnection } from "../utils/mysqlDB.utils";

import PatientDaoSQL from "./mysql/patient.dao";
import LabStaffDaoSQL from "./mysql/labStaff.dao";

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
  case "SQL":
    testMySQLConnection();
    // Aquí después irán los DAOs que trabajen con MySQL
    dao = {
      PatientDao: PatientDaoSQL,
      LabStaffDao: LabStaffDaoSQL,
    };
    break;

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
