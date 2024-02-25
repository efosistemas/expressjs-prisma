import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from './routes'

import { errorMiddleware } from './middlewares/error'

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use(routes)
  
app.use(errorMiddleware)
app.listen(process.env.PORT)
