import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import datosRoutes from "./routes/datos.routes";
import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import filesRoutes from "./routes/files.routes";

import { createRoles, createAdmin} from "./libs/initialSetup";

const app = express();
const path = require('path');
createRoles();
//createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ...",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/datos", datosRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/datos/files", filesRoutes);
  //carpeta para almacenar los archivos
app.use('/uploads', express.static(path.resolve('uploads')));
export default app;
