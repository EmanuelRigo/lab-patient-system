# Backend Validation

## Propósito

Definir cómo se validan los datos en el backend, asegurando que la entrada sea correcta antes de llegar a la lógica de negocio y manteniendo consistencia con los formularios del frontend.

## Cuándo utilizar esta Skill

- Al validar datos recibidos en endpoints.
- Al crear validators nuevos.
- Al definir reglas de validación de un dominio.

## Responsabilidades

- Garantizar que toda entrada sea validada antes de procesarse.
- Mantener consistencia con los schemas de Zod del frontend cuando aplique.
- Centralizar las validaciones por módulo.

## Reglas

- Cada módulo contiene una carpeta `validator/`.
- Los validators se aplican en la capa correspondiente antes de llegar al Service.
- Nunca validar manualmente en el Controller reglas que ya existen en el validator.
- Tipar las reglas de validación.
- Compartir schemas con el frontend cuando sea posible.

## Buenas prácticas

- Definir validators con esquemas declarativos.
- Componer validators cuando sea necesario.
- Internacionalizar mensajes de error.
- Devolver errores claros y consistentes al frontend.

## Errores comunes

- Omitir validaciones en endpoints internos.
- Duplicar validaciones en Controller y Service.
- Devolver mensajes de error genéricos.

## Ejemplos

Validator con Zod:

```ts
import { z } from "zod"

export const createPatientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dni: z.string().min(7),
})

export type CreatePatientInput = z.infer<typeof createPatientSchema>
```

## Archivos relacionados

- `api/src/modules/*/validator/`
- `api/src/modules/patients/validator/`
- `api/src/modules/studies/validator/`
- `api/src/modules/appointments/validator/`
- `api/src/modules/staff/validator/`
- `api/src/modules/billing/validator/`
- `api/src/modules/results/validator/`
- `src/shared/`
