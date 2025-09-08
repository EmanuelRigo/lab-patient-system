import { MySQLPool } from "../../utils/mysqlDB.utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Definimos la interfaz que representa una fila de la tabla LabStaff
export interface LabStaff extends RowDataPacket {
  _id: number;
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

export default class LabStaffDaoSQL {
  static async create(data: Partial<LabStaff>) {
    const keys = Object.keys(data) as (keyof LabStaff)[];
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO LabStaff (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query<ResultSetHeader>(query, values);
    return result;
  }

  static async getAll(): Promise<LabStaff[]> {
    const [rows] = await MySQLPool.query<LabStaff[]>("SELECT * FROM LabStaff");
    return rows;
  }

  static async getById(_id: number): Promise<LabStaff | null> {
    const [rows] = await MySQLPool.query<LabStaff[]>(
      "SELECT * FROM LabStaff WHERE _id = ?",
      [_id]
    );
    return rows[0] || null;
  }

  static async getByUsername(name: string): Promise<LabStaff | null> {
    const [rows] = await MySQLPool.query<LabStaff[]>(
      "SELECT * FROM LabStaff WHERE username = ?",
      [name]
    );
    return rows[0] || null;
  }

  static async deleteOne(_id: number): Promise<ResultSetHeader> {
    const [result] = await MySQLPool.query<ResultSetHeader>(
      "DELETE FROM LabStaff WHERE _id = ?",
      [_id]
    );
    return result;
  }

  static async update(_id: string, data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE LabStaff SET ${setClause} WHERE _id = ?`;

    // UPDATE → devuelve ResultSetHeader
    const [updateResult] = await MySQLPool.query<ResultSetHeader>(query, [
      ...values,
      _id,
    ]);

    if (updateResult.affectedRows > 0) {
      // SELECT → devuelve RowDataPacket[]
      const [rows] = await MySQLPool.query<RowDataPacket[]>(
        "SELECT * FROM LabStaff WHERE _id = ?",
        [_id]
      );
      return rows[0] as RowDataPacket; // ✅ ahora TS sabe que rows[0] existe
    }

    return null;
  }
}
