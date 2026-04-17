import { PostgresPool } from "../../utils/postgresqlDB.utils";

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
  static async create(data: Partial<LabStaff>) {
    const keys = Object.keys(data) as (keyof LabStaff)[];
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO LabStaff (${columns}) VALUES (${placeholders}) RETURNING _id`;

    try {
      const { rows } = await PostgresPool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error al insertar LabStaff:", error);
      return null;
    }
  }

  static async getAll(): Promise<LabStaff[]> {
    const { rows } = await PostgresPool.query("SELECT * FROM LabStaff");
    return rows;
  }

  static async getById(_id: number | string): Promise<LabStaff | null> {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM LabStaff WHERE _id = $1",
      [_id]
    );
    return rows[0] || null;
  }

  static async getByUsername(name: string): Promise<LabStaff | null> {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM LabStaff WHERE username = $1",
      [name]
    );
    return rows[0] || null;
  }

  static async deleteOne(_id: number | string) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM LabStaff WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE LabStaff SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [
      ...values,
      _id,
    ]);

    if (rows.length > 0) {
      return rows[0]; 
    }

    return null;
  }
}
