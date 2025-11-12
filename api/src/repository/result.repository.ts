// result.repository.ts
import Repository from "../repository/index.respository";
import ResultDTO from "../dto/result.dto";
import dao from "../dao/factory";
import {
  toSQL as resultToSQL,
  fromSQL as resultFromSQL,
} from "../dao/mysql/mappers/result.mapper";
import envsUtils from "../utils/envs.utils";

const { ResultDao } = dao;
const { PERSISTENCE } = envsUtils;
console.log("🚀 ~ PERSISTENCE:", PERSISTENCE);

const isMySQL = String(PERSISTENCE).toLowerCase() === "mysql";

class ResultRepository extends Repository<ResultDTO> {
  constructor() {
    super(
      ResultDao,
      ResultDTO,
      isMySQL ? { toSQL: resultToSQL, fromSQL: resultFromSQL } : undefined
    );
  }

  // ✅ Método custom para obtener resultados de un paciente
  async getAllByPatientId(patientId: string) {
    console.log("📘 [ResultRepository] getAllByPatientId:", patientId);

    // Llamamos al método del DAO
    const rows = await ResultDao.getAllPatientId(patientId);

    console.log("📘 [ResultRepository] rows:", rows);

    // Primero pasamos por el mapper (si existe)
    const mappedRows = isMySQL ? rows.map(resultFromSQL) : rows;

    // Luego construimos los DTOs (si querés mantener consistencia)
    const results = mappedRows.map((row: any) => new ResultDTO(row));

    console.log("📘 [ResultRepository] mapped results:", results);

    return results;
  }
}

export default new ResultRepository();
