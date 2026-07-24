# Tables

## Propósito

Definir las reglas para construir tablas reutilizables en el frontend, asegurando que toda tabla soporte los mismos estados, acciones y patrones visuales.

## Cuándo utilizar esta Skill

- Al crear una nueva tabla para listar datos.
- Al agregar paginación, búsqueda, filtros u ordenamiento.
- Al definir el estado vacío o de carga de una tabla.

## Responsabilidades

- Garantizar que toda tabla soporte loading, empty state, búsqueda, paginación, ordenamiento y filtros.
- Mantener consistencia visual con el Design System.
- Componer la tabla a partir del componente UI base.

## Reglas

- Todas las tablas deben soportar:
  - loading
  - empty state
  - búsqueda
  - paginación
  - ordenamiento
  - filtros
- Reutilizar el componente `Table` definido en `src/components/ui`.
- No construir tablas con HTML crudo fuera del componente base.
- Las tablas deben manejar estados visuales: Loading, Empty, Error, Success.
- No utilizar sombras en tablas (Low Elevation Design).

## Buenas prácticas

- Centralizar la lógica de paginación, filtros y orden en el componente base.
- Tipar las columnas y filas con interfaces claras.
- Separar la definición de columnas en archivos auxiliares para tablas complejas.
- Internacionalizar los textos (estados, encabezados, mensajes).
- Permitir personalizar densidad de filas si el feature lo requiere.

## Errores comunes

- Crear tablas ad-hoc en cada feature en lugar de reutilizar el componente base.
- Olvidar el estado de carga o vacío.
- No soportar búsqueda o paginación desde el inicio.
- Romper la consistencia visual con tamaños o radios distintos.

## Ejemplos

Uso del componente base:

```tsx
<Table
  data={patients}
  columns={patientColumns}
  isLoading={isLoading}
  onSearch={setSearch}
  onPageChange={setPage}
  onSortChange={setSort}
/>
```

Definición de columnas:

```ts
export const patientColumns: Column<Patient>[] = [
  { key: "name", header: "Nombre", sortable: true },
  { key: "dni", header: "DNI", sortable: true },
  { key: "actions", header: "Acciones" },
]
```

## Archivos relacionados

- `src/components/ui/Table`
- `src/components/patientsPage/`
- `src/components/results/`
- `src/components/medicalStudies/`
- `src/components/doctorsAppointments/`
- `src/components/labstaff/`
- `src/components/payment/`
- `src/components/talon/`
