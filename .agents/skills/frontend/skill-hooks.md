# Hooks

## Propósito

Centralizar y estandarizar la creación de hooks reutilizables en el frontend, manteniendo la lógica de negocio fuera de los componentes y favoreciendo la composición.

## Cuándo utilizar esta Skill

- Al crear un nuevo hook.
- Al extraer lógica reutilizable desde un componente.
- Al integrar TanStack Query para manejo de estado del servidor.
- Al integrar Zustand para acceso a estado global.

## Responsabilidades

- Garantizar que toda lógica reutilizable viva en hooks.
- Tipar correctamente entradas y salidas.
- Nombrar hooks con el prefijo `use`.
- Coordinar la interacción entre services, stores y TanStack Query.

## Reglas

- Toda lógica reutilizable debe vivir en Hooks.
- Ejemplos: `usePatients()`, `useStudies()`, `useAppointments()`, `useAuth()`.
- Nombrar siempre con prefijo `use`.
- Un hook debe tener una única responsabilidad.
- Toda llamada HTTP debe pasar por services, nunca por Axios directo dentro del hook.
- Toda llamada HTTP debe utilizar Query o Mutation de TanStack Query.
- No guardar respuestas del backend en Zustand salvo necesidad real.
- Tipar entradas y salidas con interfaces o types.
- Nunca usar `any` ni `as any`.

## Buenas prácticas

- Encapsular queries y mutations dentro de hooks (`usePatients`, `useCreatePatient`).
- Devolver objetos o tuplas claras según el caso de uso.
- Manejar estados de loading, error y success dentro del hook.
- Reutilizar hooks entre features siempre que sea posible.
- Evitar hooks que mezclen múltiples dominios.

## Errores comunes

- Colocar lógica de fetching dentro de componentes.
- Crear hooks genéricos sin responsabilidad clara.
- Devolver datos sin tipar.
- Usar `any` para silenciar el compilador.
- Duplicar lógica entre hooks.

## Ejemplos

Hook de listado:

```ts
export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: () => patientsService.getAll(),
  })
}
```

Hook de mutación:

```ts
export function useCreatePatient() {
  return useMutation({
    mutationFn: (data: PatientInput) => patientsService.create(data),
  })
}
```

## Archivos relacionados

- `src/hooks/`
- `src/services/`
- `src/stores/`
- `src/components/patientsPage/`
- `src/components/results/`
- `src/components/medicalStudies/`
- `src/components/doctorsAppointments/`
- `src/components/labstaff/`
- `src/components/payment/`
- `src/utils/`
