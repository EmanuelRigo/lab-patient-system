import { Pool } from "pg";

export class DaoIndexPostgres<T> {
  private tableName: string;
  private pool: Pool;

  constructor(tableName: string, pool: Pool) {
    this.tableName = tableName;
    this.pool = pool;
  }

  async getAll(): Promise<T[]> {
    const { rows } = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return rows as T[];
  }

  async getById(id: number | string): Promise<T | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return (rows as T[])[0] || null;
  }

  async getByName(name: string): Promise<T | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE name = $1`,
      [name]
    );
    return (rows as T[])[0] || null;
  }

  async getByUsername(username: string): Promise<T | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE username = $1`,
      [username]
    );
    return (rows as T[])[0] || null;
  }

  async search(criteria: Record<string, any>): Promise<T[]> {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);
    const whereClause = keys.map((key, i) => `${key} = $${i + 1}`).join(" AND ");
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${whereClause}`,
      values
    );
    return rows as T[];
  }

  async create(data: Partial<T>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
    await this.pool.query(
      `INSERT INTO ${this.tableName} (${keys.join(
        ", "
      )}) VALUES (${placeholders})`,
      values
    );
  }

  async update(id: number | string, data: Partial<T>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    await this.pool.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1}`,
      [...values, id]
    );
  }

  async deleteOne(id: number | string): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  }
}
