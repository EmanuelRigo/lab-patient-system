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

  // 👇 Nuevo método custom
  async getByIdsWithPrice(ids: string[]) {
    if (!this.search) throw new Error("search not implemented");
    const rows = await this.search({ ids });

    // acá podrías mapear y calcular el precio si no viene ya desde SQL
    return rows.map((appt: any) => ({
      ...appt,
      totalPrice: appt.basePrice + (appt.extraFees ?? 0),
    }));
  }
}

export default new DoctorsAppointmentRepository();
