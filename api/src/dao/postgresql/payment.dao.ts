import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/payment.mapper";
import PaymentDTO from "../../dto/payment.dto";

export default class PaymentDaoPostgres {
  static async create(data: Record<string, any> | PaymentDTO) {
    const sqlData = toSQL(data as PaymentDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO Payment (${columns}) VALUES (${placeholders}) RETURNING _id`;

    const { rows } = await PostgresPool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM Payment");
    return rows.map(fromSQL);
  }

  static async getById(_id: number | string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM Payment WHERE _id = $1",
      [_id]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async getByUsername(name: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM Payment WHERE username = $1",
      [name]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async deleteOne(_id: number | string) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM Payment WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: number | string, data: Record<string, any>) {
    const sqlData = toSQL(data as PaymentDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE Payment SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [...values, _id]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }
}
