import { Pool } from "pg";

import envsUtils from "./envs.utils";

const { DATABASE_URL } = envsUtils;

console.log("DATABASE_URL =>", DATABASE_URL);
console.log("tipo =>", typeof DATABASE_URL);

export const PostgresPool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario para Neon
  },
});

export async function testPostgresConnection() {
  try {
    const client = await PostgresPool.connect();
    console.log("✅ Conectado a PostgreSQL!");
    client.release();
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error);
  }
}
