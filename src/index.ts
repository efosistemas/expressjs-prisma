import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/mensagens", async (req, res) => {
  const mensagem = await prisma.mensagem.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(mensagem);
});

app.post("/mensagem", async (req, res) => {
  const mensagem = await prisma.mensagem.create({
    data: {
      descricao,
      celular,
      createdAt: new Date(),
    },
  });

  return res.json(mensagem);
});


app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Mensagem REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /mensagens
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
