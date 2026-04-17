import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lab Patient System API",
      version: "1.0.0",
      description:
        "API for managing patients, doctors, appointments and lab studies",
      contact: {
        name: "Lab Patient System Team",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: [
    "./src/routes/*.ts", // donde están tus routes
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
