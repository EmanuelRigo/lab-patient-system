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

  static async update(
    _id: number,
    data: Partial<LabStaff>
  ): Promise<Partial<LabStaff> | null> {
    const keys = Object.keys(data) as (keyof LabStaff)[];
    const values = Object.values(data);

    if (keys.length === 0) return null;

    // 1. Traemos los datos actuales antes de actualizar
    const [currentRows] = await MySQLPool.query<LabStaff[]>(
      "SELECT * FROM LabStaff WHERE _id = ?",
      [_id]
    );
    const current = currentRows[0];
    if (!current) return null; // no existe el registro

    // 2. Ejecutamos el UPDATE
    const setClause = keys.map((key) => `${String(key)} = ?`).join(", ");
    const query = `UPDATE LabStaff SET ${setClause} WHERE _id = ?`;

    const [result] = await MySQLPool.query<ResultSetHeader>(query, [
      ...values,
      _id,
    ]);

    const { affectedRows, changedRows } = result;

    if (affectedRows === 0) {
      return null; // no existía ningún registro con ese id
    }

    if (changedRows === 0) {
      return {}; // existía, pero los datos eran idénticos
    }

    // 3. Solo devolver los campos modificados
    const changedData: Partial<LabStaff> = {};
    for (const key of keys) {
      if (current[key] !== data[key]) {
        changedData[key] = data[key]!;
      }
    }

    return changedData;
  }
}
