import { Pool } from "mysql2/promise";

export class DaoIndexSQL<T> {
  private tableName: string;
  private pool: Pool;

  constructor(tableName: string, pool: Pool) {
    this.tableName = tableName;
    this.pool = pool;
  }

  async getAll(): Promise<T[]> {
    const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
    return rows as T[];
  }

  async getById(id: number): Promise<T | null> {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return (rows as T[])[0] || null;
  }

  async getByName(name: string): Promise<T | null> {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE name = ?`,
      [name]
    );
    return (rows as T[])[0] || null;
  }

  async getByUsername(username: string): Promise<T | null> {
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE username = ?`,
      [username]
    );
    return (rows as T[])[0] || null;
  }

  async search(criteria: Record<string, any>): Promise<T[]> {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);
    const whereClause = keys.map((key) => `${key} = ?`).join(" AND ");
    const [rows] = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE ${whereClause}`,
      values
    );
    return rows as T[];
  }

  async create(data: Partial<T>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");
    await this.pool.query(
      `INSERT INTO ${this.tableName} (${keys.join(
        ", "
      )}) VALUES (${placeholders})`,
      values
    );
  }

  async update(id: number, data: Partial<T>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    await this.pool.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
  }

  async deleteOne(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}
