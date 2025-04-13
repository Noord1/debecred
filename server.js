app.post('/enviar', async (req, res) => {
  const { nome, valor, tipo } = req.body; // Dados enviados pelo formulário
  let mensagem = `${tipo === 'debito' ? '🟥' : '🟩'} ${nome} R$ ${valor}`;

  console.log('Mensagem:', mensagem); // Log da mensagem para verificar o que está sendo enviado

  try {
    const response = await fetch(`https://api.telegram.org/bot<seu_token>/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: '<seu_chat_id>', // Certifique-se de ter inserido o chat_id correto
        text: mensagem
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Resposta do Telegram:', data); // Log da resposta da API do Telegram

    if (data.ok) {
      res.send('Mensagem enviada com sucesso!');
    } else {
      res.status(500).send('Erro ao enviar mensagem.');
    }
  } catch (error) {
    console.error('Erro:', error); // Log do erro no servidor
    res.status(500).send('Erro ao enviar mensagem.');
  }
});
