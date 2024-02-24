import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from './routes'

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use(routes)

app.get("/", async (req, res) => {
    res.send(
      `
    <h1>REST API Mensagem</h1>
     </pre>
    `.trim(),
    );
  });
  
  app.listen(Number(port), "0.0.0.0", () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });
  