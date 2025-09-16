// doctorAppointment.repository.ts
import Repository from "../repository/index.respository";
import DoctorsAppointmentDTO from "../dto/doctorsAppointment.dto";
import dao from "../dao/factory";

import {
  toSQL as doctorApptToSQL,
  fromSQL as doctorApptFromSQL,
} from "../dao/mysql/mappers/doctorAppointment.mapper";
import envsUtils from "../utils/envs.utils";

const { DoctorsAppointmentDao } = dao;

const { PERSISTENCE } = envsUtils;
const isMySQL = String(PERSISTENCE).toLowerCase() === "mysql";

class DoctorsAppointmentRepository extends Repository<DoctorsAppointmentDTO> {
  constructor() {
    super(
      DoctorsAppointmentDao,
      DoctorsAppointmentDTO,
      isMySQL
        ? { toSQL: doctorApptToSQL, fromSQL: doctorApptFromSQL }
        : undefined
    );
  }

  // ✅ Nuevo método custom
  async getByIdsWithPrice(ids: string[]) {
    // Usamos directamente el método del DAO
    const rows = await DoctorsAppointmentDao.getByIdsWithPrice(ids);

    console.log("🚀 ~ DoctorsAppointmentRepository ~ rows:", rows);

    // Mapear o calcular precios adicionales si hiciera falta
    const rowsWithTotal = rows.map((appt: any) => ({
      ...appt,
      totalPrice: appt.medicalStudy?.price ?? 0, // ✅ usamos el join con MedicalStudy
    }));

    console.log(
      "🚀 ~ DoctorsAppointmentRepository ~ rowsWithTotal:",
      rowsWithTotal
    );
    return rowsWithTotal;
  }
}

export default new DoctorsAppointmentRepository();
