const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
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

// Rota POST para enviar dados ao Telegram
app.post('/enviar', async (req, res) => {
  const { nome, valor, tipo } = req.body; // Dados enviados pelo formulário

  let mensagem = `${tipo === 'debito' ? '🟥' : '🟩'} ${nome} R$ ${valor}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot<seu_token>/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: '<seu_chat_id>',
        text: mensagem
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.ok) {
      res.send('Mensagem enviada com sucesso!');
    } else {
      res.status(500).send('Erro ao enviar mensagem.');
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro ao enviar mensagem.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
