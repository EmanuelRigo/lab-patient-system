import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/labStaff.mapper";
import LabStaffDTO from "../../dto/labStaff.dto";

export interface LabStaff {
  _id: number | string;
  firstname: string;
  secondname?: string | null;
  lastname: string;
  username: string;
  password: string;
  role: string;
  email: string;
  phone?: string | null;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default class LabStaffDaoPostgres {
  static async create(data: LabStaffDTO | Partial<LabStaff>) {
    const sqlData = toSQL(data as LabStaffDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO LabStaff (${columns}) VALUES (${placeholders}) RETURNING _id`;

    try {
      const { rows } = await PostgresPool.query(query, values);
      return rows[0]; // Retorna {_id: ...}
    } catch (error) {
      console.error("Error al insertar LabStaff:", error);
      return null;
    }
  }

  static async getAll(): Promise<LabStaffDTO[]> {
    const { rows } = await PostgresPool.query("SELECT * FROM LabStaff");
    return rows.map(fromSQL);
  }

  static async getById(_id: number | string): Promise<LabStaffDTO | null> {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM LabStaff WHERE _id = $1",
      [_id]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async getByUsername(name: string): Promise<LabStaffDTO | null> {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM LabStaff WHERE username = $1",
      [name]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async deleteOne(_id: number | string) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM LabStaff WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    // Es posible que el update envíe un payload parcial. Si es así, toSQL la filtra.
    const sqlData = toSQL(data as LabStaffDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE LabStaff SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

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
