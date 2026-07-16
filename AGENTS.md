# AGENTS.md

# LabSystem Development Guide

Este documento define las reglas que TODOS los agentes de IA deben seguir al modificar este proyecto.

El objetivo principal es mantener una arquitectura limpia, escalable y consistente tanto en frontend como backend.

---

# Proyecto

Monorepo.

```
/
├── frontend/
├── backend/
├── shared/
└── AGENTS.md
```

- Nunca mover archivos entre frontend y backend.
- Nunca romper compatibilidad entre ambos proyectos.
- Los tipos compartidos viven únicamente en `/shared`.

---

# Reglas Generales

## Siempre

- Escribir código limpio.
- Priorizar reutilización.
- Mantener consistencia.
- Evitar duplicación.
- Respetar la arquitectura existente.
- Mantener nombres descriptivos.
- No modificar funcionalidades existentes si no es necesario.

---

# Tecnologías

## Frontend

- React
- TypeScript
- Tailwind CSS v4
- React Router
- Zustand
- TanStack Query
- Axios
- React Hook Form
- Zod
- Lucide React

## Backend

- TypeScript
- Node.js
- NestJS (o Express según corresponda)
- PostgreSQL

No agregar librerías nuevas sin una razón clara.

---

# Arquitectura General

Separar responsabilidades.

Nunca mezclar:

- UI
- lógica
- llamadas HTTP
- estado global

Cada capa debe tener una única responsabilidad.

---

# ========================

# FRONTEND

# ========================

# Objetivo

El frontend representa un sistema profesional utilizado por personal administrativo y bioquímicos de un laboratorio.

No debe parecer una landing page.

Debe parecer una aplicación SaaS moderna.

Inspiraciones:

- Stripe
- Notion
- Linear
- Clerk
- Vercel Dashboard

---

# Responsive

Desktop First.

Resolución mínima:

1280x720

Optimizar también para:

- 1366x768
- 1600x900
- 1920x1080
- 2560x1440

El diseño móvil no es prioritario.

Nunca romper el layout en 720p.

---

# Layout

Toda página utiliza:

```
<AppLayout>

    <Sidebar />

    <Topbar />

    <MainContent />

</AppLayout>
```

Nunca duplicar Sidebar.

Nunca duplicar Topbar.

---

# Sidebar

Siempre fija.

Debe contener:

- Logo
- Navegación
- Accesos rápidos
- Usuario
- Logout

Debe poder colapsarse.

---

# Topbar

Debe contener:

- búsqueda global
- usuario
- notificaciones
- fecha
- acciones rápidas

Siempre visible.

---

# Organización de Carpetas

```
src/

app/

assets/

components/

ui/

layout/

common/

features/

hooks/

services/

stores/

types/

utils/

constants/

styles/

pages/
```

Evitar carpetas desordenadas.

---

# Arquitectura por Features

Cada módulo mantiene su propia estructura.

Ejemplo:

```
features/

patients/

components/

hooks/

services/

store/

types/

pages/

results/

appointments/

studies/

staff/

billing/
```

---

# Componentes

Separar componentes en tres niveles.

## UI

Componentes completamente reutilizables.

Ejemplos

Button

Card

Input

Badge

Modal

Avatar

Table

Select

Tabs

Dialog

Tooltip

Skeleton

---

## Feature

Componentes propios del módulo.

Ejemplo

PatientTable

PatientFilters

PatientForm

AppointmentCalendar

StudyCard

---

## Page

Las páginas únicamente ensamblan componentes.

No contienen lógica compleja.

---

# Design System

Todo el proyecto utiliza un único sistema visual.

No crear estilos distintos para cada pantalla.

Todos los componentes reutilizables viven en:

```
components/ui
```

---

# Cards

Todas las Cards deben compartir:

- mismo radio
- mismo padding
- misma sombra
- mismo borde

Nunca crear variantes innecesarias.

---

# Colores

## Filosofía

La aplicación utiliza un Design System propio.

La paleta oficial de Tailwind CSS NO debe modificarse ni sobrescribirse.

Los colores de Tailwind permanecen disponibles para casos excepcionales o librerías de terceros.

Toda la identidad visual del proyecto debe construirse utilizando una paleta personalizada.

---

## Paletas personalizadas

Se definen las siguientes familias de colores:

- brand
- neutral
- success
- warning
- danger
- info

Ejemplos:

brand-50
brand-100
...
brand-950

neutral-50
...
neutral-950

success-50
...
success-950

etc.

Estas paletas viven en `globals.css` utilizando `@theme`.

No crear nuevas familias de colores sin aprobación.

---

## Tokens semánticos

Los componentes NO deben depender directamente de la paleta.

Siempre utilizar tokens semánticos.

Ejemplos:

- background
- surface
- surface-muted
- primary
- secondary
- text-primary
- text-secondary
- text-muted
- border-default
- border-strong
- input
- ring
- card
- popover
- sidebar
- sidebar-primary
- sidebar-accent
- sidebar-border

Estos tokens apuntan internamente a la paleta `brand`, `neutral`, etc.

---

## Uso correcto

Correcto

```tsx
<Button className="bg-primary text-primary-foreground" />

<Card className="bg-surface border-border-default" />

<p className="text-text-secondary" />
```

También es válido cuando realmente se necesita un color de marca:

```tsx
<div className="bg-brand-600" />
```

Por ejemplo:

- Gradientes
- Logo
- Sidebar
- Hero
- Ilustraciones

---

## Uso incorrecto

No utilizar colores de Tailwind directamente dentro de la aplicación.

Incorrecto:

```tsx
bg - blue - 500;
text - blue - 700;
border - sky - 400;
bg - indigo - 600;
text - cyan - 500;
```

Tampoco utilizar valores hexadecimales dentro de componentes.

Incorrecto:

```tsx
bg-[#237BE8]
text-[#124CA4]
```

Toda referencia de color debe provenir del Design System.

---

## Objetivo

Si en el futuro cambia la identidad visual del laboratorio, únicamente deberá modificarse la paleta `brand`.

El resto de la aplicación deberá actualizarse automáticamente mediante los tokens semánticos.

No debe ser necesario modificar componentes.

---

# Espaciado

Sistema de spacing:

```
4
8
12
16
20
24
32
40
48
64
```

No usar valores arbitrarios.

---

# Tipografía

Mantener jerarquía consistente.

Utilizar únicamente:

- Heading
- Subheading
- Body
- Caption

Evitar múltiples pesos tipográficos innecesarios.

---

# Iconos

Utilizar únicamente:

Lucide React

No mezclar librerías.

---

# Tailwind CSS

Todo el proyecto utiliza Tailwind.

No usar Bootstrap.

No usar Material UI.

No usar CSS inline.

No usar Styled Components.

CSS Modules únicamente cuando sea realmente necesario.

---

# Orden de clases Tailwind

Siempre ordenar las clases.

Ejemplo

```
flex items-center justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm
```

Orden recomendado:

- Layout
- Flex/Grid
- Position
- Spacing
- Size
- Typography
- Background
- Border
- Effects
- Animation

---

# Estado Global

Utilizar Zustand.

Cada dominio posee su propio Store.

Ejemplo

```
stores/

auth.store.ts

patient.store.ts

study.store.ts

appointment.store.ts

settings.store.ts
```

Nunca crear un store gigante.

---

# Estado del Servidor

Utilizar TanStack Query.

Toda llamada HTTP debe utilizar Query o Mutation.

No guardar respuestas del backend en Zustand salvo necesidad real.

---

# Servicios

Toda llamada HTTP vive en:

```
services/
```

Nunca utilizar Axios directamente dentro de un componente.

Correcto

```
Page

↓

Hook

↓

Service

↓

API
```

---

# Hooks

Toda lógica reutilizable debe vivir en Hooks.

Ejemplo

```
usePatients()

useStudies()

useAppointments()

useAuth()
```

---

# Tipado

Nunca utilizar:

```
any
```

Evitar

```
as any
```

Preferir:

- interfaces
- types
- generics

Todo dato proveniente del backend debe estar tipado.

---

# Tablas

Todas las tablas deben soportar:

- loading
- empty state
- búsqueda
- paginación
- ordenamiento
- filtros

---

# Formularios

Todos los formularios utilizan:

- React Hook Form
- Zod

Nunca validar manualmente.

---

# Estados Visuales

Toda pantalla debe contemplar:

- Loading
- Empty
- Error
- Success

---

# Modales

Todos los modales reutilizan el mismo componente base.

Nunca crear un modal desde cero.

---

# Animaciones

Muy sutiles.

Duración

150ms–250ms

Evitar animaciones exageradas.

---

# Accesibilidad

Todo botón debe tener:

- hover
- focus
- active
- disabled

Todos los inputs deben tener label.

---

# Código React

Los componentes deben ser pequeños.

Recomendación:

Máximo 250 líneas.

Extraer lógica a hooks.

Extraer llamadas HTTP a services.

---

# Rendimiento

Utilizar:

React.memo

useMemo

useCallback

únicamente cuando exista beneficio.

No optimizar prematuramente.

---

# ========================

# BACKEND

# ========================

Separar por módulos.

Cada módulo contiene:

```
controller

service

repository

dto

entity

validator

types
```

Nunca acceder a la base desde un Controller.

Toda lógica pertenece al Service.

---

# Shared

Los tipos compartidos viven únicamente aquí.

```
shared/
```

Nunca duplicar interfaces.

---

# IA

Antes de generar código:

1. Buscar componentes reutilizables.
2. Buscar servicios existentes.
3. Buscar hooks existentes.
4. Buscar stores existentes.
5. Buscar tipos existentes.

Si existe una solución reutilizable, utilizarla.

Nunca duplicar código.

---

# Consistencia Visual

Toda pantalla nueva debe parecer parte del mismo sistema.

Mantener:

- radios
- sombras
- espaciados
- botones
- inputs
- tablas
- cards
- tipografía
- colores

---

# Regla de Oro

Antes de crear cualquier componente nuevo preguntarse:

¿Puede reutilizarse?

Si la respuesta es sí, debe implementarse como componente compartido.

Priorizar composición sobre duplicación.

La mantenibilidad es más importante que la velocidad de implementación.
