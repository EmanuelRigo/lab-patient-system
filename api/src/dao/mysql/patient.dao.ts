import { MySQLPool } from "../../utils/mysqlDB.utils";

export default class PatientDaoSQL {
  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM Patient");
    return rows;
  }

  static async getById(id: number) {
    const [rows] = await MySQLPool.query("SELECT * FROM Patient WHERE id = ?", [
      id,
    ]);
    return (rows as any[])[0] || null;
  }

  static async deleteOne(id: number) {
    const [result] = await MySQLPool.query("DELETE FROM Patient WHERE id = ?", [
      id,
    ]);
    return result;
  }

  static async update(id: number, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE Patient SET ${setClause} WHERE id = ?`;

    const [result] = await MySQLPool.query(query, [...values, id]);
    return result;
  }
}
