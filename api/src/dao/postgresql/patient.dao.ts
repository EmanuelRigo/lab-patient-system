import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/patient.mapper";
import PatientDTO from "../../dto/patient.dto";

export default class PatientDaoPostgres {
  static async create(data: PatientDTO) {
    const sqlData = toSQL(data);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO Patient (${columns}) VALUES (${placeholders}) RETURNING _id`;

    const { rows } = await PostgresPool.query(query, values);
    return rows[0]; 
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM Patient");
    return rows.map(fromSQL);
  }

  static async getByNameLastName(text: string) {
    const search = `%${text}%`;

    const { rows } = await PostgresPool.query(
      `
      SELECT *
      FROM Patient
      WHERE firstname ILIKE $1
         OR secondname ILIKE $2
         OR lastname ILIKE $3
    `,
      [search, search, search]
    );

    return rows.map(fromSQL);
  }

  static async getById(id: number | string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM Patient WHERE _id = $1",
      [id]
    );
    const row = rows[0];
    return row ? fromSQL(row) : null;
  }

  static async deleteOne(id: number | string) {
    const { rowCount } = await PostgresPool.query("DELETE FROM Patient WHERE _id = $1", [
      id,
    ]);
    return { affectedRows: rowCount };
  }

  static async update(
    _id: number | string,
    data: Partial<PatientDTO>
  ): Promise<Partial<PatientDTO> | null> {
    const sqlData = toSQL(data as PatientDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return {};

    const { rows: currentRows } = await PostgresPool.query(
      "SELECT * FROM Patient WHERE _id = $1",
      [_id]
    );
    const current = currentRows[0];
    if (!current) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE Patient SET ${setClause} WHERE _id = $${keys.length + 1}`;

    const { rowCount } = await PostgresPool.query(query, [
      ...values,
      _id,
    ]);

    if (rowCount === 0) {
      return null;
    }

    // Postgres no proporciona un 'changedRows' fácilmente como mysql. 
    // Comparamos manualmente con base al registro actual (current)
    const currentDTO = fromSQL(current);
    const changedData: Partial<PatientDTO> = {};
    for (const key of Object.keys(data) as (keyof PatientDTO)[]) {
      if (String(currentDTO[key]) !== String(data[key])) {
        changedData[key] = data[key] as any;
      }
    }

    return changedData;
  }
}
