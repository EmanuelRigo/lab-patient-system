# Backend Repositories

## Propósito

Definir las reglas para la capa de Repositories, estableciendo cómo se accede a la base de datos y qué operaciones se permiten desde el resto de la aplicación.

## Cuándo utilizar esta Skill

- Al crear un Repository nuevo.
- Al agregar consultas a la base de datos.
- Al refactorizar la capa de acceso a datos.

## Responsabilidades

- Encapsular el acceso a la base de datos.
- Proveer métodos claros para operaciones CRUD y consultas específicas.
- Evitar fugas de detalles de la base hacia capas superiores.

## Reglas

- Nunca acceder a la base desde un Controller.
- Los Repositories son la única capa que interactúa con la base.
- Un Repository por entidad o agregado.
- Tipar entradas y salidas.
- Evitar lógica de negocio dentro del Repository.

## Buenas prácticas

- Definir interfaces claras para los Repositories.
- Usar el ORM o query builder definido en el proyecto.
- Documentar consultas complejas.
- Manejar errores propios de la base de datos en esta capa.

## Errores comunes

- Acceder a la base desde Controllers.
- Mezclar lógica de negocio con acceso a datos.
- Generar dependencias circulares entre Repositories.

## Ejemplos

Repository básico:

```ts
export class PatientsRepository {
  async findAll(): Promise<Patient[]> {
    return db.patient.findMany()
  }

  async create(data: PatientInput): Promise<Patient> {
    return db.patient.create({ data })
  }
}
```

## Archivos relacionados

- `api/src/modules/*/repository.ts`
- `api/src/db/`
- `db/`
- `db/lab_patient_system.sql`
