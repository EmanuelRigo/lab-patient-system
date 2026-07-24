# React UI

## Propósito

Estandarizar la forma en que se construyen interfaces con React en el proyecto, manteniendo componentes pequeños, claros y consistentes con la arquitectura por features.

## Cuándo utilizar esta Skill

- Al crear cualquier componente nuevo en `src/`.
- Al refactorizar componentes existentes.
- Al decidir cómo estructurar la UI de un feature.
- Al revisar código frontend.

## Responsabilidades

- Garantizar que los componentes respeten el límite de tamaño recomendado.
- Separar UI, lógica y datos.
- Mantener la arquitectura de tres niveles (UI, Feature, Page).
- Asegurar tipado estricto en todo componente.

## Reglas

- Los componentes deben ser pequeños. Recomendación: máximo 250 líneas.
- Extraer lógica a hooks.
- Extraer llamadas HTTP a services.
- Nunca utilizar `any`.
- Evitar `as any`.
- Preferir interfaces, types y generics.
- Todo dato proveniente del backend debe estar tipado.
- Las páginas únicamente ensamblan componentes. No contienen lógica compleja.
- Componentes UI: completamente reutilizables (Button, Card, Input, Badge, Modal, Avatar, Table, Select, Tabs, Dialog, Tooltip, Skeleton).
- Componentes Feature: propios del módulo (PatientTable, PatientFilters, PatientForm, AppointmentCalendar, StudyCard).
- Componentes Page: solo composición.
- El frontend representa un sistema profesional para personal administrativo y bioquímicos. No debe parecer una landing page. Debe parecer una aplicación SaaS moderna.
- Inspiraciones: Stripe, Notion, Linear, Clerk, Vercel Dashboard.

## Buenas prácticas

- Separar responsabilidades: nunca mezclar UI, lógica, llamadas HTTP y estado global en un mismo archivo.
- Cada capa debe tener una única responsabilidad.
- Priorizar composición sobre duplicación.
- Extraer subcomponentes cuando un componente crece demasiado.
- Utilizar props tipadas con interfaces nombradas.
- Manejar estados visuales (Loading, Empty, Error, Success) en toda pantalla.

## Errores comunes

- Crear componentes monolíticos con lógica de negocio, fetching y UI.
- Usar `any` para evitar definir tipos.
- Duplicar componentes UI en lugar de reutilizar los existentes.
- Colocar lógica compleja dentro de páginas.

## Ejemplos

Componente UI reutilizable:

```tsx
export function Button({ children, ...props }: ButtonProps) {
  return <button className="..." {...props}>{children}</button>
}
```

Componente Feature:

```tsx
export function PatientTable({ patients }: { patients: Patient[] }) {
  return <Table data={patients} />
}
```

Página (solo composición):

```tsx
export default function PatientsPage() {
  return (
    <MainContent>
      <PatientFilters />
      <PatientTable />
    </MainContent>
  )
}
```

## Archivos relacionados

- `src/app/`
- `src/components/ui/`
- `src/components/features/`
- `src/components/atomics/`
- `src/components/generics/`
- `src/components/dashboard/`
- `src/components/patientsPage/`
- `src/components/results/`
- `src/components/medicalStudies/`
- `src/components/doctorsAppointments/`
- `src/components/labstaff/`
- `src/components/payment/`
- `src/components/talon/`
