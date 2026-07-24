# Backend Services

## Propósito

Definir el rol y las reglas de la capa de Services en el backend, donde debe vivir toda la lógica de negocio.

## Cuándo utilizar esta Skill

- Al implementar un Service nuevo.
- Al mover lógica de negocio desde Controllers.
- Al revisar dónde debe ubicarse una determinada regla.

## Responsabilidades

- Contener toda la lógica de negocio.
- Coordinar Repositories, entidades y reglas de validación.
- Exponer métodos claros al Controller.

## Reglas

- Toda lógica pertenece al Service.
- Nunca acceder a la base desde un Controller.
- Un Service no debe conocer detalles del transporte HTTP.
- Tipar entradas y salidas.
- Evitar duplicación entre Services.
- Nunca romper compatibilidad entre frontend y backend.

## Buenas prácticas

- Un Service por módulo.
- Métodos con responsabilidad única.
- Manejar errores con excepciones tipadas.
- Componer Services cuando sea necesario sin generar acoplamiento.
- Documentar reglas de negocio dentro del Service.

## Errores comunes

- Colocar reglas de negocio en los Controllers.
- Mover lógica de validación a capas incorrectas.
- Acoplar Services con el transporte HTTP.

## Ejemplos

Service básico:

```ts
export class PatientsService {
  constructor(private patientsRepository: PatientsRepository) {}

  async getAll(): Promise<Patient[]> {
    return this.patientsRepository.findAll()
  }

  async create(data: PatientInput): Promise<Patient> {
    return this.patientsRepository.create(data)
  }
}
```

## Archivos relacionados

- `api/src/modules/*/service.ts`
- `api/src/modules/patients/patients.service.ts`
- `api/src/modules/studies/studies.service.ts`
- `api/src/modules/appointments/appointments.service.ts`
- `api/src/modules/staff/staff.service.ts`
- `api/src/modules/billing/billing.service.ts`
- `api/src/modules/results/results.service.ts`
