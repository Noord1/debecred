<?php
// Defina o Token do seu bot e o chat_id do grupo
$botToken = "7942455440:AAFDmOasKnwRxzHkoe2ogl-OuevNhU_GYV8";  // Substitua pelo token do seu bot
$chatId = "-1002423185408"; // Substitua pelo chat_id do seu grupo

// Pegando os dados do formulário
$tipo = $_POST['tipo'];
$nome = $_POST['nome'];
$valor = $_POST['valor'];

// Formatando a mensagem
if ($tipo == "debito") {
    $cor = "🟥"; // Cor para débito
} else {
    $cor = "🟩"; // Cor para crédito
}

// Formatar o valor em R$
$valorFormatado = "R$ " . number_format($valor, 2, ',', '.');

// Mensagem que será enviada ao grupo
$mensagem = $cor . " " . $nome . " " . $valorFormatado;

// URL da API do Telegram
$url = "https://api.telegram.org/bot$botToken/sendMessage";

// Parâmetros para enviar a mensagem
$data = [
    'chat_id' => $chatId,
    'text' => $mensagem,
    'parse_mode' => 'HTML'
];

// Inicializa o cURL
$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

// Verificar se a mensagem foi enviada corretamente
if ($response) {
    echo "<p>🎉 Lançamento enviado com sucesso! 🎉</p>";
} else {
    echo "<p>❌ Erro ao enviar lançamento. Tentar novamente.</p>";
}
?>
