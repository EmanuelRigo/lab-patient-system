import ResultDTO from "../../../dto/result.dto";
import { ResultWithData } from "../../../../../types/result.types";

export function fromSQL(row: Record<string, any>): ResultDTO {
  const resultWithData: ResultWithData = {
    appointmentDate: row.appointment_date,
    medicalStudyName: row.study_name,
    resultValue: row.result_value,
    resultDescription: row.result_description,
  };

  return new ResultDTO(resultWithData);
}
