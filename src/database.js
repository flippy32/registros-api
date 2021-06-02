import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true,
  })
  .then((db) => console.log(`La base de datos está conectada`))
  .catch((err) => console.log(err));
