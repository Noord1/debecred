const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Middleware para servir arquivos estáticos e processar formulários
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
