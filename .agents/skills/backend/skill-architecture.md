# Backend Architecture

## Propósito

Definir la arquitectura general del backend, asegurando separación clara de responsabilidades entre controladores, servicios, repositorios y otras capas.

## Cuándo utilizar esta Skill

- Al crear un nuevo módulo backend.
- Al definir la estructura de un nuevo endpoint.
- Al revisar código backend.
- Al tomar decisiones sobre comunicación con la base de datos.

## Responsabilidades

- Garantizar la separación por capas.
- Evitar que los Controllers accedan directamente a la base de datos.
- Asegurar que toda lógica de negocio viva en los Services.
- Mantener consistencia entre módulos.

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
- Nunca acceder a la base desde un Controller.
- Toda lógica pertenece al Service.
- Tipar todo con TypeScript.
- No agregar librerías nuevas sin una razón clara.
- Nunca romper compatibilidad entre frontend y backend.
- Los tipos compartidos viven únicamente en `/shared`.

## Buenas prácticas

- Diseñar primero los DTOs y entidades antes de implementar la lógica.
- Mantener cada módulo cohesivo y desacoplado.
- Documentar endpoints y reglas de negocio críticas.
- Centralizar el manejo de errores.
- Aplicar validaciones en la capa correspondiente.

## Errores comunes

- Colocar lógica de negocio en los Controllers.
- Consultar la base desde capas indebidas.
- Duplicar lógica entre módulos.
- Romper la separación de capas por simplicidad.

## Ejemplos

Estructura de un módulo:

```
module/
├── controller.ts
├── service.ts
├── repository.ts
├── dto/
├── entity/
├── validator/
└── types/
```

Flujo de una petición:

```
Request
  ↓
Controller (recibe, valida, responde)
  ↓
Service (lógica de negocio)
  ↓
Repository (acceso a datos)
  ↓
Database
```

## Archivos relacionados

- `api/src/`
- `api/src/modules/`
- `src/shared/`
- `db/`
