import mongoose, { Connection } from "mongoose";

class MongoSingleton {
  private static instance: Connection;

  public static getInstance(): Connection {
    if (!MongoSingleton.instance) {
      const mongoUrl = process.env.MONGO_LINK;

      if (!mongoUrl) {
        throw new Error("La variable de entorno MONGO_LINK no está definida.");
      }

      mongoose.connect(mongoUrl);
      MongoSingleton.instance = mongoose.connection;

      console.log("Conexión a MongoDB establecida");
    } else {
      console.log("Conexión a MongoDB ya está establecida");
    }

    return MongoSingleton.instance;
  }
}

export default MongoSingleton;
