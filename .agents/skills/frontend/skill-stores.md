# Stores (Zustand)

## Propósito

Definir las reglas para el uso de Zustand como librería de estado global, asegurando que cada dominio tenga su propio store y evitando stores monolíticos.

## Cuándo utilizar esta Skill

- Al crear un nuevo store global.
- Al decidir qué estado debe vivir en Zustand y qué estado debe vivir en TanStack Query.
- Al migrar estado entre stores.

## Responsabilidades

- Garantizar el uso correcto de Zustand para estado global de UI o cliente.
- Mantener separados los stores por dominio.
- Tipar correctamente el estado y las acciones.
- Evitar duplicación con TanStack Query.

## Reglas

- Utilizar Zustand para estado global.
- Cada dominio posee su propio Store.
- Ejemplos de stores:
  - `auth.store.ts`
  - `patient.store.ts`
  - `study.store.ts`
  - `appointment.store.ts`
  - `settings.store.ts`
- Nunca crear un store gigante.
- No guardar respuestas del backend en Zustand salvo necesidad real.
- El estado del servidor debe vivir en TanStack Query.
- Tipar el estado con interfaces.
- Nunca usar `any` ni `as any`.

## Buenas prácticas

- Definir el store con su tipo de estado y acciones explícitas.
- Separar stores por dominio funcional.
- Exponer selectores para evitar renders innecesarios.
- Documentar cada store con su responsabilidad.
- Evitar lógica de fetching dentro del store.

## Errores comunes

- Crear un único store global con todo el estado.
- Guardar respuestas del backend en Zustand.
- Mezclar estado de UI con estado de servidor.
- No tipar el estado del store.

## Ejemplos

Estructura de un store:

```ts
interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

Organización:

```
stores/
├── auth.store.ts
├── patient.store.ts
├── study.store.ts
├── appointment.store.ts
└── settings.store.ts
```

## Archivos relacionados

- `src/stores/`
- `src/context/LabContext.tsx`
- `src/context/CustomProvider.tsx`
- `src/services/`
- `src/hooks/`
