import Whiteboard from "../db";
import makeWhiteboardDb from "./whiteboard-db";
import mongoose from "mongoose";
import envConfig from "../env";

const MongoURI = envConfig["MONGO_URI"];

export const makeDB = async () => {
  return await mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(async (success) => {
      return success && makeWhiteboardDb(Whiteboard);
    })
    .catch((err) => {
      throw new Error("Failed to connect to Mongo");
    });
};

export default makeDB;
