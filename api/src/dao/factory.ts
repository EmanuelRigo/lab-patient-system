import MongoSingleton from "../utils/mongoDB.utils";
import envsUtils from "../utils/envs.utils";
// import DaoIndexMongo from "./mongo/index.dao";
import { testMySQLConnection } from "../utils/mysqlDB.utils";
import { testPostgresConnection } from "../utils/postgresqlDB.utils";

import PatientDaoSQL from "./mysql/patient.dao";
import LabStaffDaoSQL from "./mysql/labStaff.dao";
import MedicalStudyDaoSQL from "./mysql/medicalStudies.dao";
import DoctorAppointmentDaoSQL from "./mysql/doctorsAppointment.dao";
import TalonDaoSQL from "./mysql/talon.dao";
import PaymentDaoSQL from "./mysql/payment.dao";
import ResultDaoSQL from "./mysql/result.dao";
import PaymentMethodDaoSQL from "./mysql/paymentMethod.dao"; // 👈 nuevo

// --- POSTGRESQL DAOs ---
import PatientDaoPostgres from "./postgresql/patient.dao";
import LabStaffDaoPostgres from "./postgresql/labStaff.dao";
import MedicalStudyDaoPostgres from "./postgresql/medicalStudies.dao";
import DoctorAppointmentDaoPostgres from "./postgresql/doctorsAppointment.dao";
import TalonDaoPostgres from "./postgresql/talon.dao";
import PaymentDaoPostgres from "./postgresql/payment.dao";
import ResultDaoPostgres from "./postgresql/result.dao";
import PaymentMethodDaoPostgres from "./postgresql/paymentMethod.dao";

import {
  DoctorsAppointmentDaoMongo,
  LabStaffDaoMongo,
  MedicalStudyDaoMongo,
  PatientDaoMongo,
  PaymentDaoMongo,
  ResultDaoMongo,
  TalonDaoMongo,
  // 👇 si más adelante agregás el DAO de Mongo para PaymentMethod
  // PaymentMethodDaoMongo,
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
  // PaymentMethodDaoMongo, // 👈 lo dejamos comentado para el futuro
};

switch (PERSISTENCE) {
  case "POSTGRESQL":
    testPostgresConnection();
    dao = {
      PatientDao: PatientDaoPostgres,
      LabStaffDao: LabStaffDaoPostgres,
      MedicalStudyDao: MedicalStudyDaoPostgres,
      DoctorsAppointmentDao: DoctorAppointmentDaoPostgres,
      TalonDao: TalonDaoPostgres,
      PaymentDao: PaymentDaoPostgres,
      ResultDao: ResultDaoPostgres,
      PaymentMethodDao: PaymentMethodDaoPostgres,
    };
    break;

  case "MYSQL":
    testMySQLConnection();
    // Aquí después irán los DAOs que trabajen con MySQL
    dao = {
      PatientDao: PatientDaoSQL,
      LabStaffDao: LabStaffDaoSQL,
      MedicalStudyDao: MedicalStudyDaoSQL,
      DoctorsAppointmentDao: DoctorAppointmentDaoSQL,
      TalonDao: TalonDaoSQL,
      PaymentDao: PaymentDaoSQL,
      ResultDao: ResultDaoSQL,
      PaymentMethodDao: PaymentMethodDaoSQL, // 👈 agregado
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
    // const PaymentMethodDao = daoMongo.PaymentMethodDaoMongo; // 👈 cuando lo implementes

    dao = {
      DoctorsAppointmentDao: DoctorsAppointmentDao,
      LabStaffDao: LabStaffDao,
      MedicalStudyDao: MedicalStudyDao,
      PatientDao: PatientDao,
      PaymentDao: PaymentDao,
      ResultDao: ResultDao,
      TalonDao: TalonDao,
      // PaymentMethodDao: PaymentMethodDao, // 👈 cuando lo implementes en Mongo
    };
    break;
}

export default dao;
