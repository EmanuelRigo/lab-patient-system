# Forms

## Propósito

Estandarizar la creación de formularios en el proyecto, garantizando validación robusta, tipado estricto y consistencia visual.

## Cuándo utilizar esta Skill

- Al crear cualquier formulario nuevo.
- Al modificar validaciones de formularios existentes.
- Al decidir cómo manejar errores y envíos.
- Al integrar formularios con el backend.

## Responsabilidades

- Garantizar el uso de React Hook Form y Zod en todos los formularios.
- Centralizar validaciones mediante schemas.
- Evitar validaciones manuales repetitivas.
- Asegurar accesibilidad y consistencia visual.

## Reglas

- Todos los formularios utilizan React Hook Form.
- Todos los formularios utilizan Zod.
- Nunca validar manualmente.
- Todos los inputs deben tener label.
- Los inputs deben respetar los estados visuales: hover, focus, active, disabled.
- Todo formulario debe contemplar estados de Loading, Empty, Error y Success.

## Buenas prácticas

- Definir schemas de validación con Zod antes de implementar el formulario.
- Reutilizar schemas entre frontend y backend cuando sea posible.
- Componer el formulario a partir de componentes UI reutilizables (Input, Select, etc.).
- Mostrar mensajes de error claros y próximos al campo correspondiente.
- Manejar el estado de envío para evitar dobles submits.

## Errores comunes

- Validar campos manualmente con `if` en lugar de delegar a Zod.
- No asociar labels a inputs.
- Duplicar lógica de validación entre componentes.
- Olvidar estados de loading y error al enviar el formulario.

## Ejemplos

Schema de validación con Zod:

```ts
import { z } from "zod"

export const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dni: z.string().min(7),
})

export type PatientFormValues = z.infer<typeof patientSchema>
```

Formulario con React Hook Form:

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema, PatientFormValues } from "./patient.schema"

export function PatientForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nombre" {...register("firstName")} />
      {errors.firstName && <span>{errors.firstName.message}</span>}
      <Button type="submit" disabled={isSubmitting}>Guardar</Button>
    </form>
  )
}
```

## Archivos relacionados

- `src/components/forms/`
- `src/components/ui/Input`
- `src/components/ui/Select`
- `src/components/ui/Button`
- `src/components/patientsPage/`
- `src/components/medicalStudies/`
- `src/components/doctorsAppointments/`
- `src/components/labstaff/`
- `src/components/payment/`
