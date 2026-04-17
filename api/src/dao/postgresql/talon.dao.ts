import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/talon.mapper";
import TalonDTO from "../../dto/talon.dto";

export default class TalonDaoPostgres {
  static async create(data: Record<string, any> | TalonDTO) {
    const sqlData = toSQL(data as TalonDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO Talon (${columns}) VALUES (${placeholders}) RETURNING _id`;

    try {
      const { rows, rowCount } = await PostgresPool.query(query, values);
      console.log("Nuevo _id insertado:", data._id);
      return { _id: data._id, affectedRows: rowCount, ...rows[0] };
    } catch (error) {
      console.error("Error al insertar Talon:", error);
      return null;
    }
  }

  static async getAll() {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM vw_talon_with_receptionist_patient" // ajustado al view estándar o asume TalonWithReceptionistAndPatient
    );
    console.log("🚀 ~ TalonDaoPostgres ~ getAll ~ rows:", rows);
    return rows;
  }

  static async getById(_id: number | string) {
    const { rows } = await PostgresPool.query("SELECT * FROM Talon WHERE _id = $1", [
      _id,
    ]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async getByUsername(name: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM Talon WHERE username = $1",
      [name]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async deleteOne(_id: number | string) {
    const { rowCount } = await PostgresPool.query("DELETE FROM Talon WHERE _id = $1", [
      _id,
    ]);
    return { affectedRows: rowCount };
  }

  static async update(_id: number | string, data: Record<string, any>) {
    const sqlData = toSQL(data as TalonDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE Talon SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [...values, _id]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }
}
