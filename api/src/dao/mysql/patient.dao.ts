import { MySQLPool } from "../../utils/mysqlDB.utils";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Definimos la interfaz que representa una fila de la tabla Patient
export interface Patient extends RowDataPacket {
  _id: string;
  firstname: string;
  secondname?: string;
  lastname: string;
  birthDate: Date;
  dni: number;
  email?: string;
  phone?: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class PatientDaoSQL {
  static async create(data: Record<string, any>) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const query = `INSERT INTO Patient (${columns}) VALUES (${placeholders})`;

    const [result] = await MySQLPool.query(query, values);
    return result;
  }

  static async getAll() {
    const [rows] = await MySQLPool.query("SELECT * FROM Patient");
    return rows;
  }

  static async getById(id: number) {
    const [rows] = await MySQLPool.query(
      "SELECT * FROM Patient WHERE _id = ?",
      [id]
    );
    return (rows as any[])[0] || null;
  }

  static async deleteOne(id: number) {
    const [result] = await MySQLPool.query("DELETE FROM Patient WHERE id = ?", [
      id,
    ]);
    return result;
  }

  static async update(
    _id: number,
    data: Partial<Patient>
  ): Promise<Partial<Patient> | null> {
    const keys = Object.keys(data) as (keyof Patient)[];
    const values = Object.values(data);

    if (keys.length === 0) return null;

    // 1. Traemos los datos actuales antes de actualizar
    const [currentRows] = await MySQLPool.query<Patient[]>(
      "SELECT * FROM Patient WHERE _id = ?",
      [_id]
    );
    const current = currentRows[0];
    if (!current) return null; // no existe el registro

    // 2. Ejecutamos el UPDATE
    const setClause = keys.map((key) => `${String(key)} = ?`).join(", ");
    const query = `UPDATE Patient SET ${setClause} WHERE _id = ?`;

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
    const changedData: Partial<Patient> = {};
    for (const key of keys) {
      if (current[key] !== data[key]) {
        changedData[key] = data[key]!;
      }
    }

    return changedData;
  }
}
