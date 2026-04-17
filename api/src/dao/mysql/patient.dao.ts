import { MySQLPool } from "../../utils/mysqlDB.utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { toSQL, fromSQL } from "./mappers/patient.mapper";
import PatientDTO from "../../dto/patient.dto";

export default class PatientDaoSQL {
  static async create(data: PatientDTO) {
    const sqlData = toSQL(data);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO Patient (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM Patient");
    return (rows as RowDataPacket[]).map(fromSQL);
  }

  static async getByNameLastName(text: string) {
    const search = `%${text}%`;

    const [rows] = await MySQLPool.query<RowDataPacket[]>(
      `
      SELECT *
      FROM Patient
      WHERE firstname LIKE ?
         OR secondname LIKE ?
         OR lastname LIKE ?
    `,
      [search, search, search]
    );

    return rows.map(fromSQL);
  }

  static async getById(id: number) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM Patient WHERE _id = ?",
      [id]
    );
    const row = (rows as RowDataPacket[])[0];
    return row ? fromSQL(row) : null;
  }

  static async deleteOne(id: number) {
    const [result] = await MySQLPool.query("DELETE FROM Patient WHERE id = ?", [
      id,
    ]);
    return result;
  }

  static async update(
    _id: number,
    data: Partial<PatientDTO>
  ): Promise<Partial<PatientDTO> | null> {
    const sqlData = toSQL(data as PatientDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return {};

    const [currentRows] = await MySQLPool.query<RowDataPacket[]>(
      "SELECT * FROM Patient WHERE _id = ?",
      [_id]
    );
    const current = currentRows[0];
    if (!current) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE Patient SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query<ResultSetHeader>(query, [
      ...values,
      _id,
    ]);

    const { affectedRows, changedRows } = result;

    if (affectedRows === 0) {
      return null;
    }

    if (changedRows === 0) {
      return {};
    }

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
