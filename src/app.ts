import express from "express";
import { Response } from "express";
import "reflect-metadata";

import router from "./routes";
import { AppDataSource } from "./config/dataSource.config";

const app = express();
app.use(express.json());

router(app);

AppDataSource.initialize()
  .then(() => console.log("Banco de dados conectado!"))
  .catch((e: Error) => console.log("Erro", e));

export default app;
