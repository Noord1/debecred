const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // se for usar envio direto pro Telegram

const app = express();
const port = process.env.PORT || 10000;

// Middleware para servir arquivos estáticos e processar formulários
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota principal para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// (Opcional) Rota de envio se quiser usar Node puro no lugar do enviar.php
// app.post('/enviar', async (req, res) => { ... });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
