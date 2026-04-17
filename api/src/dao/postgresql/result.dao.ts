import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/result.mapper";
import ResultDTO from "../../dto/result.dto";

export default class ResultDaoPostgres {
  static async create(data: Record<string, any> | ResultDTO) {
    const sqlData = toSQL(data as ResultDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO Result (${columns}) VALUES (${placeholders}) RETURNING _id`;

    const { rows } = await PostgresPool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM Result");
    return rows.map(fromSQL);
  }

  static async getAllPatientId(_id: string) {
    const { rows } = await PostgresPool.query(
      "SELECT appointment_date, result_value, result_description, study_name FROM vw_patient_results WHERE patient_id = $1",
      [_id]
    );
    // Para esta vista, si querés mapéalo directo, o confía en que frontend mapee si así estaba en MySQL.
    return rows;
  }

  static async getById(_id: string) {
    const { rows } = await PostgresPool.query("SELECT * FROM Result WHERE _id = $1", [
      _id,
    ]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async deleteOne(_id: string) {
    const { rowCount } = await PostgresPool.query("DELETE FROM Result WHERE _id = $1", [
      _id,
    ]);
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    const sqlData = toSQL(data as ResultDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE Result SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [...values, _id]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }
}
