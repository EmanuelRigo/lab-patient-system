# Backend DTO

## Propósito

Definir el uso de DTOs (Data Transfer Objects) en el backend para tipar la entrada y salida de los endpoints, evitando filtrar entidades directamente hacia el frontend.

## Cuándo utilizar esta Skill

- Al crear un endpoint nuevo.
- Al definir el contrato de un módulo.
- Al refactorizar responses del backend.

## Responsabilidades

- Definir DTOs de entrada y salida por módulo.
- Aislar la representación interna (entidades) de la representación externa (DTOs).
- Mantener compatibilidad entre frontend y backend.

## Reglas

- Cada módulo contiene una carpeta `dto/`.
- No exponer entidades directamente hacia el frontend.
- Tipar todos los DTOs.
- Evitar duplicar tipos: reutilizar los definidos en `shared/`.
- Nunca romper compatibilidad entre frontend y backend.

## Buenas prácticas

- Definir DTOs específicos para cada caso de uso.
- Versionar cambios incompatibles.
- Documentar campos opcionales y obligatorios.
- Reutilizar DTOs entre módulos solo cuando el dominio lo justifique.

## Errores comunes

- Devolver la entidad completa del ORM al frontend.
- Duplicar tipos ya definidos en `shared/`.
- Mezclar DTOs con entidades.

## Ejemplos

DTO de entrada:

```ts
export interface CreatePatientDto {
  firstName: string
  lastName: string
  dni: string
}
```

DTO de salida:

```ts
export interface PatientResponseDto {
  id: string
  firstName: string
  lastName: string
  dni: string
  createdAt: string
}
```

## Archivos relacionados

- `api/src/modules/*/dto/`
- `api/src/modules/patients/dto/`
- `api/src/modules/studies/dto/`
- `api/src/modules/appointments/dto/`
- `api/src/modules/staff/dto/`
- `api/src/modules/billing/dto/`
- `api/src/modules/results/dto/`
- `src/shared/`
- `types/`
