import { MySQLPool } from "../../utils/mysqlDB.utils";

export default class MedicalStudyDaoSQL {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO MedicalStudy (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM MedicalStudy");
    return rows;
  }

  static async getById(_id: string) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM MedicalStudy WHERE _id = ?",
      [_id]
    );
    return (rows as any[])[0] || null;
  }

  static async getByName(name: string) {
    const words = name.split(/\s+/);
    const likeClauses = words.map(() => "name LIKE ?");
    const query = `SELECT * FROM MedicalStudy WHERE ${likeClauses.join(
      " OR "
    )}`;
    const values = words.map((word) => `%${word}%`);

    const [rows] = await MySQLPool.query(query, values);
    return rows as any[];
  }

  static async deleteOne(_id: string) {
    const [result] = await MySQLPool.query(
      "DELETE FROM MedicalStudy WHERE _id = ?",
      [_id]
    );
    return result;
  }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE MedicalStudy SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query(query, [...values, _id]);
    return result;
  }
}
