import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from './routes'

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.post("/login", async (req, res) => {
  const { email, password } = req.body		
  res.send(res.json({
    email: email,
    pass: password,
  })
)}
)
  
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
  