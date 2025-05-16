import { connect } from "mongoose";

async function dbConnect() {
  try {
    const mongoLink = process.env.MONGO_LINK;
    if (!mongoLink) {
      throw new Error("MONGO_LINK environment variable is not defined");
    }
    await connect(mongoLink);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
