const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 10000;

// Token do bot
const token = '7942455440:AAFDmOasKnwRxzHkoe2ogl-OuevNhU_GYV8';
// Chat ID
const chatId = '-1002423185408';
// ID do tópico (Controle Financeiro)
const messageThreadId = 3;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/enviar', async (req, res) => {
  const { tipo, nome, valor, banco, data, hora, aba, usuario } = req.body;

  if (!tipo || !nome || !valor) {
    return res.status(400).json({ success: false, message: 'Preencha tipo, nome e valor.' });
  }

  const emoji = tipo === 'debito' ? '🟥' : '🟩';

  const numero = parseFloat(valor);
  const partes = numero.toFixed(2).split('.');
  const inteiroComPonto = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const valorBr = `${inteiroComPonto},${partes[1]}`;

  // Montar mensagem no formato solicitado
  let mensagem = `${emoji} ${nome}`;
  if (aba === 'apostas' && usuario) {
    mensagem += ` ${usuario}`;
  }
  mensagem += ` R$ ${valorBr}`;
  if (banco) {
    mensagem += ` 🏦 ${banco}`;
  }
  if (data) {
    const [ano, mes, dia] = data.split('-');
    mensagem += ` 📅 ${dia}/${mes}/${ano}`;
  }
  if (hora) {
    mensagem += ` ⏰ ${hora}`;
  }

  console.log('Mensagem a enviar:', mensagem);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensagem,
        message_thread_id: messageThreadId
      })
    });

    const result = await response.json();
    console.log('Resposta do Telegram:', result);

    if (result.ok) {
      return res.json({ success: true, message: 'Lançamento enviado com sucesso!' });
    } else {
      console.error('Erro no Telegram:', result);
      return res.status(500).json({ success: false, message: 'Erro ao enviar para o Telegram.' });
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
