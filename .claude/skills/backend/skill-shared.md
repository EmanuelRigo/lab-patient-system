# Shared

## Propósito

Definir el lugar y las reglas para los tipos compartidos entre frontend y backend, evitando duplicación de interfaces y manteniendo una única fuente de verdad.

## Cuándo utilizar esta Skill

- Al definir un tipo que será usado en frontend y backend.
- Al consumir un endpoint desde el frontend.
- Al exponer un response desde el backend.

## Responsabilidades

- Centralizar los tipos compartidos.
- Evitar la duplicación de interfaces.
- Mantener una única fuente de verdad para contratos entre frontend y backend.

## Reglas

- Los tipos compartidos viven únicamente en `/shared`.
- Nunca duplicar interfaces.
- Los tipos compartidos deben ser genéricos y estables.
- No incluir lógica en archivos compartidos, solo tipos y constantes.
- Nunca romper compatibilidad entre frontend y backend.
- Nunca mover archivos entre frontend y backend.

## Buenas prácticas

- Definir tipos por dominio.
- Versionar cambios incompatibles.
- Documentar campos opcionales.
- Reutilizar los tipos tanto en services frontend como en DTOs backend.

## Errores comunes

- Definir el mismo `interface` en frontend y backend.
- Incluir lógica en archivos compartidos.
- Usar tipos `any` o `unknown` en definiciones compartidas.

## Ejemplos

Tipo compartido:

```ts
// shared/types/patient.ts
export interface Patient {
  id: string
  firstName: string
  lastName: string
  dni: string
}

export interface PatientInput {
  firstName: string
  lastName: string
  dni: string
}
```

Uso en el frontend:

```ts
import { Patient } from "@/shared/types/patient"
```

Uso en el backend:

```ts
import { Patient } from "@/shared/types/patient"
```

## Archivos relacionados

- `src/shared/`
- `types/`
- `api/src/shared/`
- `src/services/`
- `api/src/modules/*/dto/`
