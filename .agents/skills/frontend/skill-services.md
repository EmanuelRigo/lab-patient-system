# Services (Frontend)

## Propósito

Centralizar todas las llamadas HTTP del frontend en una capa de servicios dedicada, evitando que los componentes o hooks dependan directamente de Axios o del cliente HTTP.

## Cuándo utilizar esta Skill

- Al consumir cualquier endpoint del backend.
- Al crear un nuevo recurso o feature que requiera llamadas HTTP.
- Al refactorizar código que use `axios` directamente.

## Responsabilidades

- Encapsular todas las llamadas HTTP.
- Proveer funciones tipadas por dominio.
- Ser el único punto de contacto con la API.
- Facilitar el mocking en pruebas.

## Reglas

- Toda llamada HTTP vive en `services/`.
- Nunca utilizar Axios directamente dentro de un componente.
- Nunca utilizar Axios directamente dentro de un hook (los hooks consumen services).
- Flujo obligatorio:
  - Page
  - ↓
  - Hook
  - ↓
  - Service
  - ↓
  - API
- Toda llamada HTTP debe utilizar Query o Mutation de TanStack Query.
- No guardar respuestas del backend en Zustand salvo necesidad real.
- Tipar request y response de cada función del service.
- Nunca usar `any` ni `as any`.

## Buenas prácticas

- Un service por dominio (`patients.api.ts`, `studies.api.ts`).
- Nombrar funciones siguiendo convenciones REST (`getAll`, `getById`, `create`, `update`, `remove`).
- Centralizar el manejo de errores y autenticación en el cliente HTTP base.
- Reutilizar tipos definidos en `shared/` para requests y responses.

## Errores comunes

- Usar `axios` directamente desde un componente o hook.
- Duplicar endpoints en múltiples archivos.
- No tipar las respuestas del backend.
- Mezclar lógica de UI con llamadas HTTP.

## Ejemplos

Service por dominio:

```ts
// services/patients.api.ts
import { restApi } from "./restApi"
import { Patient, PatientInput } from "@/shared/types/patient"

export const patientsService = {
  getAll: () => restApi.get<Patient[]>("/patients"),
  getById: (id: string) => restApi.get<Patient>(`/patients/${id}`),
  create: (data: PatientInput) => restApi.post<Patient>("/patients", data),
  update: (id: string, data: PatientInput) => restApi.put<Patient>(`/patients/${id}`, data),
  remove: (id: string) => restApi.delete<void>(`/patients/${id}`),
}
```

Consumo desde un hook:

```ts
export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => patientsService.getById(id),
  })
}
```

## Archivos relacionados

- `src/services/`
- `src/services/restApi.ts`
- `src/services/patients.api.ts`
- `src/services/medicalStudies.api.ts`
- `src/services/doctorsAppointment.api.ts`
- `src/services/labStaff.api.ts`
- `src/services/payment.api.ts`
- `src/services/result.api.ts`
- `src/services/session.api.ts`
- `src/services/talon.api.ts`
- `src/hooks/`
