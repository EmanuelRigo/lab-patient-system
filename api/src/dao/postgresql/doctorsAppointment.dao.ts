import { PostgresPool } from "../../utils/postgresqlDB.utils";

export interface DoctorAppointment {
  _id: string;
  isPaid: boolean;
  talonId?: string;
  patientId: string;
  medicalStudyId: string;
  date: Date;
  receptionistId?: string;
  reason?: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DoctorAppointmentWithStudy {
  _id: string;
  isPaid: boolean;
  talonId?: string;
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

export default class DoctorAppointmentDaoPostgres {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO DoctorAppointment (${columns}) VALUES (${placeholders}) RETURNING _id`;

    try {
      const { rows, rowCount } = await PostgresPool.query(query, values);
      console.log("Nuevo _id insertado:", data._id);
      return { _id: data._id, affectedRows: rowCount };
    } catch (error) {
      console.error("Error al insertar D.A.:", error);
      return null;
    }
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM DoctorAppointment");
    return rows;
  }

  static async getById(_id: string | number) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM DoctorAppointment WHERE _id = $1",
      [_id]
    );
    return rows[0] || null;
  }

  static async getByIdsWithPrice(
    ids: string[]
  ): Promise<DoctorAppointmentWithStudy[]> {
    if (!ids || ids.length === 0) return [];

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const query = `
    SELECT 
      da._id               AS _id,
      da.is_paid           AS isPaid,
      da.talon_id          AS talonId,
      da.patient_id        AS patientId,
      da.medical_study_id  AS medicalStudyId,
      da.date              AS date,
      da.receptionist_id   AS receptionistId,
      da.reason            AS reason,
      da.status            AS status,
      da.created_at        AS createdAt,
      da.updated_at        AS updatedAt,
      ms.price             AS study_price
    FROM DoctorAppointment da
    JOIN MedicalStudy ms ON da.medical_study_id = ms._id
    WHERE da._id IN (${placeholders});
  `;

    const { rows } = await PostgresPool.query(query, ids);

    return rows.map((r: any) => ({
      _id: r._id,
      isPaid: !!r.isPaid,
      talonId: r.talonId,
      patientId: r.patientId,
      medicalStudy: { price: Number(r.study_price ?? 0) },
      date: r.date,
      receptionistId: r.receptionistId,
      reason: r.reason,
      status: r.status,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    })) as DoctorAppointmentWithStudy[];
  }

  static async getByUsername(name: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM DoctorAppointment WHERE username = $1",
      [name]
    );
    return rows[0] || null;
  }

  static async deleteOne(_id: string | number) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM DoctorAppointment WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE DoctorAppointment SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [
      ...values,
      _id,
    ]);

    if (rows.length > 0) {
      return rows[0]; 
    }

    return null;
  }
}
