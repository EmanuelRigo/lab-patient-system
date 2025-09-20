import { MySQLPool } from "../../utils/mysqlDB.utils";

export default class TalonDaoSQL {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO Talon (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM TalonWithReceptionistAndPatient"
    );
    console.log("🚀 ~ TalonDaoSQL ~ getAll ~ rows:", rows);
    return rows;
  }

  static async getById(_id: number) {
    const [rows] = await MySQLPool.query("SELECT * FROM Talon WHERE _id = ?", [
      _id,
    ]);
    return (rows as any[])[0] || null;
  }

  static async getByUsername(name: string) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM Talon WHERE username = ?",
      [name]
    );
    return (rows as any[])[0] || null;
  }

  static async deleteOne(_id: number) {
    const [result] = await MySQLPool.query("DELETE FROM Talon WHERE _id = ?", [
      _id,
    ]);
    return result;
  }

  static async update(_id: number, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE Talon SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query(query, [...values, _id]);
    return result;
  }
}
