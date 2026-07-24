# Components

## Propósito

Definir cómo se organizan, clasifican y crean componentes en el frontend, evitando la proliferación de carpetas desordenadas y garantizando la reutilización.

## Cuándo utilizar esta Skill

- Al crear un componente nuevo.
- Al decidir dónde vive un componente.
- Al refactorizar la estructura de `src/components/`.
- Al revisar la arquitectura por features.

## Responsabilidades

- Garantizar la separación correcta entre componentes UI, Feature y Page.
- Mantener la organización de carpetas.
- Asegurar que cada componente respete el Design System.

## Reglas

### Niveles de componentes

#### UI

Componentes completamente reutilizables.

Ejemplos:

- Button
- Card
- Input
- Badge
- Modal
- Avatar
- Table
- Select
- Tabs
- Dialog
- Tooltip
- Skeleton

#### Feature

Componentes propios del módulo.

Ejemplos:

- PatientTable
- PatientFilters
- PatientForm
- AppointmentCalendar
- StudyCard

#### Page

Las páginas únicamente ensamblan componentes. No contienen lógica compleja.

### Organización de carpetas

```
src/
├── app/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
├── features/
│   ├── patients/
│   ├── results/
│   ├── appointments/
│   ├── studies/
│   ├── staff/
│   └── billing/
├── hooks/
├── services/
├── stores/
├── types/
├── utils/
├── constants/
├── styles/
└── pages/
```

- Evitar carpetas desordenadas.
- Los componentes reutilizables viven en `components/ui`.

### Arquitectura por Features

Cada módulo mantiene su propia estructura:

```
features/
├── patients/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── pages/
├── results/
├── appointments/
├── studies/
├── staff/
└── billing/
```

### Regla de Oro

Antes de crear cualquier componente nuevo preguntarse: ¿Puede reutilizarse?

Si la respuesta es sí, debe implementarse como componente compartido.

Priorizar composición sobre duplicación.

La mantenibilidad es más importante que la velocidad de implementación.

## Buenas prácticas

- Crear un componente UI base antes de duplicar estilos en varios componentes.
- Ubicar componentes de feature dentro de su carpeta correspondiente.
- Mantener el tamaño de los componentes (recomendación: máximo 250 líneas).
- Documentar props complejas con tipos o comentarios.

## Errores comunes

- Duplicar componentes UI en cada feature.
- Crear componentes que mezclan UI, lógica y fetching.
- Generar carpetas desordenadas sin estructura.
- Crear componentes pensando solo en una pantalla.

## Ejemplos

Componente UI base:

```tsx
export function Card({ children, className }: CardProps) {
  return (
    <div className="rounded-xl border bg-surface p-6">
      {children}
    </div>
  )
}
```

Componente Feature:

```tsx
// features/patients/components/PatientCard.tsx
export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card>
      <h3>{patient.name}</h3>
      <p>{patient.dni}</p>
    </Card>
  )
}
```

## Archivos relacionados

- `src/components/`
- `src/components/ui/`
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
- `src/components/homepage/`
- `src/components/login/`
- `src/components/aside/`
- `src/components/topbar/`
