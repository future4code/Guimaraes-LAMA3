import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { Migrations } from './migration/migrations'
import { bandRouter } from "./routes/bandRouter";
dotenv.config();
const migration = new Migrations()
migration.create()
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter);


const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });