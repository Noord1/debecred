const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir arquivos PHP
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
