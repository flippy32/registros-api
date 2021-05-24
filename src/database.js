import mongoose from "mongoose";
import config from "./config";

mongoose
  .connect("mongodb://localhost/apiRegistros", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true, 
    useCreateIndex: true,
  })
  .then((db) => console.log(`La base de datos está conectada`))
  .catch((err) => console.log(err));
