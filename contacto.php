<?php
header('Content-Type: application/json');

// Configuración de correo
$to = "contacto@myrefrigeracion.com";
$subject = "Consulta desde el blog de MY Refrigeración";

// Validación CSRF
if (!isset($_POST['csrf_token'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Token CSRF inválido']);
    exit;
}

// Validación de datos
if (!isset($_POST['nombre']) || !isset($_POST['email']) || !isset($_POST['mensaje'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit;
}

$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$mensaje = filter_var($_POST['mensaje'], FILTER_SANITIZE_STRING);

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

// Preparar el mensaje
$message = "Consulta desde el blog de MY Refrigeración\n\n";
$message .= "Nombre: " . $nombre . "\n";
$message .= "Email: " . $email . "\n\n";
$message .= "Mensaje: " . $mensaje;

$headers = array(
    'From: ' . $email,
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
);

// Enviar correo
if (mail($to, $subject, $message, implode("\r\n", $headers))) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje']);
}
?>
