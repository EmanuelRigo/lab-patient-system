import { MySQLPool } from "../../utils/mysqlDB.utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";
// import { DoctorAppointmentWithStudy } from "../../../../types/doctorsAppointment.types";

export interface DoctorAppointment extends RowDataPacket {
  _id: string;
  isPaid: boolean;
  talonId?: string;
  resultId?: string;
  patientId: string;
  medicalStudyId: string;
  date: Date;
  receptionistId?: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorAppointmentWithStudy extends RowDataPacket {
  _id: string;
  isPaid: boolean;
  talonId?: string;
  resultId?: string;
  patientId: string;
  medicalStudy: {
    price: number;
  };
  date: Date;
  receptionistId?: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export default class DoctorAppointmentDaoSQL {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO DoctorAppointment (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM DoctorAppointment");
    return rows;
  }

  static async getById(_id: number) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM DoctorAppointment WHERE _id = ?",
      [_id]
    );
    return (rows as any[])[0] || null;
  }

  static async getByIdsWithPrice(
    ids: string[]
  ): Promise<DoctorAppointmentWithStudy[]> {
    if (ids.length === 0) return [];

    const placeholders = ids.map(() => "?").join(", ");
    const query = `
    SELECT 
      da._id,
      da.isPaid,
      da.talonId,
      da.resultId,
      da.patientId,
      da.medicalStudyId,
      da.date,
      da.receptionistId,
      da.reason,
      da.status,
      da.createdAt,
      da.updatedAt,
      ms.price
    FROM DoctorAppointment da
    JOIN MedicalStudy ms ON da.medicalStudyId = ms._id
    WHERE da._id IN (${placeholders})
  `;

    const [rows] = await MySQLPool.query<DoctorAppointmentWithStudy[]>(
      query,
      ids
    );
    return rows;
  }

  static async getByUsername(name: string) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM DoctorAppointment WHERE username = ?",
      [name]
    );
    return (rows as any[])[0] || null;
  }

  static async deleteOne(_id: number) {
    const [result] = await MySQLPool.query(
      "DELETE FROM DoctorAppointment WHERE _id = ?",
      [_id]
    );
    return result;
  }

  // static async update(_id: number, data: Record<string, any>) {
  //   const keys = Object.keys(data);
  //   const values = Object.values(data);

  //   if (keys.length === 0) return null;

  //   const setClause = keys.map((key) => `${key} = ?`).join(", ");
  //   const query = `UPDATE DoctorAppointment SET ${setClause} WHERE _id = ?`;

  //   const [result] = await MySQLPool.query(query, [...values, _id]);
  //   return result;
  // }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE DoctorAppointment SET ${setClause} WHERE _id = ?`;

    // UPDATE → devuelve ResultSetHeader
    const [updateResult] = await MySQLPool.query<ResultSetHeader>(query, [
      ...values,
      _id,
    ]);

    if (updateResult.affectedRows > 0) {
      // SELECT → devuelve RowDataPacket[]
      const [rows] = await MySQLPool.query<RowDataPacket[]>(
        "SELECT * FROM DoctorAppointment WHERE _id = ?",
        [_id]
      );
      return rows[0] as RowDataPacket; // ✅ ahora TS sabe que rows[0] existe
    }

    return null;
  }
}
