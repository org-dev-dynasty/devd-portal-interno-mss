import "dotenv/config";
import app from "./src/app";

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} 🚀`);
});

import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();


app.use(express.json());
app.use(cors());

export default app;
