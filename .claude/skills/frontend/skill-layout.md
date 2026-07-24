# Layout

## Propósito

Definir la estructura general de layout de la aplicación, asegurando consistencia entre páginas y evitando duplicación de Sidebar y Topbar.

## Cuándo utilizar esta Skill

- Al crear una nueva página o ruta.
- Al modificar la estructura general de la aplicación.
- Al integrar nuevos componentes estructurales.

## Responsabilidades

- Garantizar que toda página utilice el layout estándar.
- Evitar duplicación de Sidebar y Topbar.
- Mantener el principio de Desktop First.
- Asegurar que el layout nunca se rompa en 720p.

## Reglas

### Estructura obligatoria

Toda página utiliza:

```
<AppLayout>
    <Sidebar />
    <Topbar />
    <MainContent />
</AppLayout>
```

- Nunca duplicar Sidebar.
- Nunca duplicar Topbar.
- El layout se monta una única vez en la raíz de la aplicación.

### Responsive

- Desktop First.
- Resolución mínima: 1280x720.
- Optimizar también para:
  - 1366x768
  - 1600x900
  - 1920x1080
  - 2560x1440
- El diseño móvil no es prioritario.
- Nunca romper el layout en 720p.

### Sidebar

- Siempre fija.
- Debe contener:
  - Logo
  - Navegación
  - Accesos rápidos
  - Usuario
  - Logout
- Debe poder colapsarse.

### Topbar

- Debe contener:
  - búsqueda global
  - usuario
  - notificaciones
  - fecha
  - acciones rápidas
- Siempre visible.

## Buenas prácticas

- Centralizar la configuración del layout en `src/app/layout.tsx`.
- Reutilizar el mismo layout para todas las rutas autenticadas.
- Evitar lógica condicional compleja dentro del layout.
- Mantener el orden visual: Sidebar a la izquierda, Topbar arriba, MainContent ocupa el resto.

## Errores comunes

- Renderizar Sidebar o Topbar en cada página individualmente.
- Asumir que el diseño móvil es prioritario.
- No soportar resoluciones intermedias (1366x768, 1600x900).
- Romper la estructura base al agregar rutas nuevas.

## Ejemplos

Estructura del layout raíz:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppLayout>
          <Sidebar />
          <Topbar />
          <MainContent>{children}</MainContent>
        </AppLayout>
      </body>
    </html>
  )
}
```

## Archivos relacionados

- `src/app/layout.tsx`
- `src/components/Aside.tsx`
- `src/components/aside/`
- `src/components/topbar/`
- `src/app/lab-dashboard/`
- `src/app/labstaff/`
- `src/app/medical-studies/`
- `src/app/login/`
