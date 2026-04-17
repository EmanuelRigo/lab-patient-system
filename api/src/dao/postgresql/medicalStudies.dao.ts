import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/medicalStudy.mapper";
import MedicalStudyDTO from "../../dto/medicalStudy.dto";

export default class MedicalStudyDaoPostgres {
  static async create(data: Record<string, any> | MedicalStudyDTO) {
    const sqlData = toSQL(data as MedicalStudyDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO MedicalStudy (${columns}) VALUES (${placeholders}) RETURNING _id`;

    const { rows } = await PostgresPool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM MedicalStudy");
    return rows.map(fromSQL);
  }

  static async getById(_id: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM MedicalStudy WHERE _id = $1",
      [_id]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async getByName(name: string) {
    const words = name.split(/\s+/);
    const likeClauses = words.map((_, i) => `name ILIKE $${i + 1}`); // ILIKE para case-insensitive search en PG
    const query = `SELECT * FROM MedicalStudy WHERE ${likeClauses.join(
      " OR "
    )}`;
    const values = words.map((word) => `%${word}%`);

    const { rows } = await PostgresPool.query(query, values);
    return rows.map(fromSQL);
  }

  static async deleteOne(_id: string) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM MedicalStudy WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    const sqlData = toSQL(data as MedicalStudyDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE MedicalStudy SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [
      ...values,
      _id,
    ]);

    if (rows.length > 0) {
      return fromSQL(rows[0]); 
    }

    return null;
  }
}
