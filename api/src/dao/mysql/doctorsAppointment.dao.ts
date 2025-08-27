import { MySQLPool } from "../../utils/mysqlDB.utils";

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

  static async update(_id: number, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE DoctorAppointment SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query(query, [...values, _id]);
    return result;
  }
}
