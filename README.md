# Sistema de Gestión de Pacientes de Laboratorio (lab-patient-system)

Este es un proyecto Full-Stack desarrollado con el stack MERN (MongoDB, Express, React, Node.js) y extendido con tecnologías modernas como Next.js y TypeScript. La aplicación permite gestionar pacientes, turnos médicos, estudios, resultados y personal de un laboratorio clínico.

## Características Principales

- **Gestión de Pacientes:** CRUD completo para pacientes.
- **Gestión de Turnos:** Creación, visualización, edición y cancelación de turnos médicos.
- **Estudios Médicos:** Administración de los tipos de estudios que ofrece el laboratorio.
- **Resultados:** Carga y consulta de resultados de los estudios de los pacientes.
- **Autenticación y Roles:** Sistema de login con roles (administrador, personal de laboratorio) utilizando Passport.js y JWT.
- **Frontend Moderno:** Interfaz de usuario reactiva y amigable construida con Next.js y Tailwind CSS.
- **Backend Robusto:** API RESTful construida con Node.js, Express y TypeScript, siguiendo patrones de diseño como DTOs y Repositorio.

## Tecnologías Utilizadas

### Frontend

- **Framework:** [Next.js](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Gestión de Estado:** React Context API

### Backend

- **Entorno de Ejecución:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)
- **Autenticación:** [Passport.js](http://www.passportjs.org/) (Estrategias `jwt` y `local`)

## Prerrequisitos

- [Node.js](https://nodejs.org/en/) (v18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Una instancia de [MongoDB](https://www.mongodb.com/try/download/community) en ejecución (local o en la nube).

## Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/EmanuelRigo/lab-patient-system.git
    cd lab-patient-system
    ```

2.  **Instalar dependencias del Frontend:**

    ```bash
    npm install
    ```

3.  **Instalar dependencias del Backend:**
    ```bash
    cd api
    npm install
    ```

## Configuración

1.  **Variables de Entorno del Backend:**
    - Navega al directorio `api`.
    - Crea un archivo `.env` a partir del archivo `.env.example` (si existe) o créalo desde cero.
    - Añade las siguientes variables:
      `env
    MONGO_URL="mongodb://localhost:27017/lab_patient_system"
    JWT_SECRET="tu_secreto_para_jwt"
    PORT=8080
    `
      > **Nota:** Asegúrate de que `MONGO_URL` apunte a tu instancia de MongoDB.

## Cómo Ejecutar la Aplicación

1.  **Iniciar el servidor Backend:**
    Desde el directorio `api`:

    ```bash
    npm run dev
    ```

    El servidor se ejecutará en el puerto especificado en tu archivo `.env` (por defecto, `http://localhost:8080`).

2.  **Iniciar la aplicación Frontend:**
    Desde el directorio raíz del proyecto:
    ```bash
    npm run dev
    ```
    La aplicación Next.js se ejecutará en `http://localhost:3000`.

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## Estructura del Proyecto

```
.
├── api/                # Proyecto del Backend (Node.js/Express)
│   ├── src/
│   │   ├── controllers/
│   │   ├── dao/
│   │   ├── dto/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
├── src/                # Proyecto del Frontend (Next.js)
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── ...
├── package.json
└── README.md
```

- **`/api`**: Contiene toda la lógica del backend, incluyendo rutas, controladores, servicios, y modelos de datos.
- **`/src`**: Contiene la aplicación de frontend construida con Next.js, incluyendo páginas, componentes y lógica de cliente.
