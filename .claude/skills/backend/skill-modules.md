# Backend Modules

## Propósito

Estandarizar la organización de los módulos del backend, definiendo la estructura mínima y las responsabilidades de cada archivo dentro de un módulo.

## Cuándo utilizar esta Skill

- Al crear un nuevo módulo backend.
- Al revisar la estructura de un módulo existente.
- Al integrar un nuevo dominio al backend.

## Responsabilidades

- Garantizar que cada módulo tenga la estructura completa.
- Evitar la proliferación de archivos sueltos sin organización.
- Asegurar la separación de capas.

## Reglas

- Separar por módulos.
- Cada módulo contiene:
  - controller
  - service
  - repository
  - dto
  - entity
  - validator
  - types
- Un módulo representa un dominio funcional.
- Cada archivo debe tener una única responsabilidad.

## Buenas prácticas

- Nombrar módulos por dominio (`patients`, `studies`, `appointments`).
- Aislar dependencias entre módulos.
- Documentar endpoints y reglas específicas del módulo.
- Evitar dependencias circulares.

## Errores comunes

- Crear módulos que comparten lógica sin una capa común clara.
- Mezclar responsabilidades entre archivos.
- Omitir la separación entre DTO, entity y types.

## Ejemplos

Estructura de un módulo:

```
modules/
└── patients/
    ├── patients.controller.ts
    ├── patients.service.ts
    ├── patients.repository.ts
    ├── dto/
    ├── entity/
    ├── validator/
    └── types/
```

## Archivos relacionados

- `api/src/`
- `api/src/modules/patients/`
- `api/src/modules/studies/`
- `api/src/modules/appointments/`
- `api/src/modules/staff/`
- `api/src/modules/billing/`
- `api/src/modules/results/`
