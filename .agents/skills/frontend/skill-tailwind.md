# Tailwind CSS

## Propósito

Definir las reglas de uso de Tailwind CSS en el proyecto, asegurando consistencia visual, orden de clases y respeto al Design System propio del laboratorio.

## Cuándo utilizar esta Skill

- Al escribir o modificar clases de Tailwind.
- Al configurar el sistema de estilos.
- Al revisar código que use Tailwind.
- Al tomar decisiones sobre sombras, bordes, espaciado o colores.

## Responsabilidades

- Garantizar el uso correcto de Tailwind como única herramienta de estilos principal.
- Mantener el orden consistente de las clases.
- Evitar el uso de valores arbitrarios y de la paleta de Tailwind por defecto.
- Asegurar el cumplimiento del enfoque de Low Elevation Design.

## Reglas

- Todo el proyecto utiliza Tailwind.
- No usar Bootstrap.
- No usar Material UI.
- No usar CSS inline.
- No usar Styled Components.
- CSS Modules únicamente cuando sea realmente necesario.
- La paleta oficial de Tailwind CSS NO debe modificarse ni sobrescribirse.
- Los colores de Tailwind permanecen disponibles para casos excepcionales o librerías de terceros.
- No utilizar colores de Tailwind directamente dentro de la aplicación.
- No utilizar valores hexadecimales dentro de componentes.
- No crear nuevas familias de colores sin aprobación.
- Evitar `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg` y similares.
- Priorizar bordes suaves (`border`).
- Utilizar diferentes superficies (`surface`, `surface-muted`, `background`) para crear jerarquía.
- Utilizar espaciado para separar bloques.
- Utilizar radios consistentes.
- Las sombras únicamente están permitidas en componentes flotantes: Dialog, Popover, DropdownMenu, Tooltip, Command, ContextMenu.
- No utilizar sombras en Cards, Dashboard, Sidebar, Topbar, Formularios, Tablas, Widgets o Contenedores.
- Siempre ordenar las clases.

### Orden recomendado de clases

1. Layout
2. Flex/Grid
3. Position
4. Spacing
5. Size
6. Typography
7. Background
8. Border
9. Effects
10. Animation

### Ejemplo de orden

```
flex items-center justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm
```

## Buenas prácticas

- Utilizar tokens semánticos en lugar de colores de la paleta directamente.
- Usar valores de spacing predefinidos del sistema.
- Centralizar las clases reutilizables en componentes UI.
- Evitar valores arbitrarios como `p-[13px]`.

## Errores comunes

- Usar colores de Tailwind (`bg-blue-500`, `text-cyan-700`) directamente.
- Usar valores hexadecimales inline (`bg-[#237BE8]`).
- Aplicar sombras para decorar Cards o paneles.
- Mezclar librerías de estilos.
- Desordenar las clases de Tailwind.

## Ejemplos

Uso correcto de tokens semánticos:

```tsx
<Button className="bg-primary text-primary-foreground" />
<Card className="bg-surface border-border-default" />
<p className="text-text-secondary" />
```

Uso permitido de color de marca:

```tsx
<div className="bg-brand-600" />
```

Uso incorrecto:

```tsx
<div className="bg-blue-500" />
<div className="bg-[#237BE8]" />
```

## Archivos relacionados

- `src/app/globals.css`
- `tailwind.config.js`
- `postcss.config.mjs`
- `src/components/ui/`
- `src/app/layout.tsx`
- `src/styles/`
