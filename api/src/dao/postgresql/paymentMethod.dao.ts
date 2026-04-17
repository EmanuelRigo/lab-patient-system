import { PostgresPool } from "../../utils/postgresqlDB.utils";
import { toSQL, fromSQL } from "./mappers/paymentMethod.mapper";
import PaymentMethodDTO from "../../dto/paymentMethod.dto";

export default class PaymentMethodDaoPostgres {
  static async create(data: Record<string, any> | PaymentMethodDTO) {
    const sqlData = toSQL(data as PaymentMethodDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const columns = keys.join(", ");
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    const query = `INSERT INTO PaymentMethod (${columns}) VALUES (${placeholders}) RETURNING _id`;

    const { rows } = await PostgresPool.query(query, values);
    return rows[0];
  }

  static async getAll() {
    const { rows } = await PostgresPool.query("SELECT * FROM PaymentMethod");
    return rows.map(fromSQL);
  }

  static async getById(_id: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM PaymentMethod WHERE _id = $1",
      [_id]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async getByName(name: string) {
    const { rows } = await PostgresPool.query(
      "SELECT * FROM PaymentMethod WHERE name = $1",
      [name]
    );
    return rows[0] ? fromSQL(rows[0]) : null;
  }

  static async deleteOne(_id: string) {
    const { rowCount } = await PostgresPool.query(
      "DELETE FROM PaymentMethod WHERE _id = $1",
      [_id]
    );
    return { affectedRows: rowCount };
  }

  static async update(_id: string, data: Record<string, any>) {
    const sqlData = toSQL(data as PaymentMethodDTO);
    const keys = Object.keys(sqlData);
    const values = Object.values(sqlData);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE PaymentMethod SET ${setClause} WHERE _id = $${keys.length + 1} RETURNING *`;

    const { rows } = await PostgresPool.query(query, [...values, _id]);
    return rows[0] ? fromSQL(rows[0]) : null;
  }
}
