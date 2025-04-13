const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 10000;

// Token do bot
const token = '7942455440:AAFDmOasKnwRxzHkoe2ogl-OuevNhU_GYV8'; // Substitua com seu token real
// Chat ID
const chatId = '-1002423185408'; // Substitua com seu chat_id real
// ID do tópico
const messageThreadId = 3; // Substitua com o ID correto do tópico

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
  const { nome, valor, tipo } = req.body;
  let mensagem = `${tipo === 'debito' ? '🟥' : '🟩'} ${nome} R$ ${valor}`;

  console.log('Mensagem:', mensagem); // Verificando a mensagem

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId, // Usando o chat_id correto
        text: mensagem,
        message_thread_id: messageThreadId // Enviando para o tópico correto
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Resposta do Telegram:', data); // Verificando a resposta

    if (data.ok) {
      res.send('Mensagem enviada com sucesso!');
    } else {
      console.error('Erro na resposta do Telegram:', data); // Erro na resposta
      res.status(500).send('Erro ao enviar mensagem.');
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error); // Erro no servidor
    res.status(500).send('Erro ao enviar mensagem.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
