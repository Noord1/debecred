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

// Rota POST para enviar dados ao Telegram
app.post('/enviar', async (req, res) => {
  const { nome, valor, tipo } = req.body;
  let mensagem = `${tipo === 'debito' ? '🟥' : '🟩'} ${nome} R$ ${valor}`;

  console.log('Mensagem:', mensagem); // Verificando a mensagem

  try {
    const response = await fetch(`https://api.telegram.org/bot7942455440:AAFDmOasKnwRxzHkoe2ogl-OuevNhU_GYV8/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: '-1002423185408', // Substitua com o seu chat_id
        text: mensagem
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
