import mysql from "mysql2/promise";
import envsUtils from "./envs.utils";

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  envsUtils;

export const MySQLPool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT),
});

export async function testMySQLConnection() {
  try {
    const connection = await MySQLPool.getConnection();
    console.log("✅ Conectado a MySQL!");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error);
  }
}
