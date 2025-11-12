import { MySQLPool } from "../../utils/mysqlDB.utils";

export default class ResultDaoSQL {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO Result (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM Result");
    return rows;
  }

  static async getAllPatientId(_id: string) {
    const [rows] = await MySQLPool.query(
      "SELECT appointment_date, result_value, result_description, study_name FROM vw_patient_results WHERE patient_id = ?",
      [_id]
    );
    return rows as any[];
  }

  static async getById(_id: string) {
    const [rows] = await MySQLPool.query("SELECT * FROM Result WHERE _id = ?", [
      _id,
    ]);
    return (rows as any[])[0] || null;
  }

  static async deleteOne(_id: string) {
    const [result] = await MySQLPool.query("DELETE FROM Result WHERE _id = ?", [
      _id,
    ]);
    return result;
  }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE Result SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query(query, [...values, _id]);
    return result;
  }
}
