<?php
header('Content-Type: application/json');

// Conexión a la base de datos SQLite
$db = new SQLite3('comentarios.db');

// Crear la tabla si no existe
$db->exec("CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

// Manejar el envío de comentarios
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

    // Insertar el comentario
    $stmt = $db->prepare("INSERT INTO comentarios (nombre, email, mensaje) VALUES (?, ?, ?)");
    $stmt->bindValue(1, $nombre);
    $stmt->bindValue(2, $email);
    $stmt->bindValue(3, $mensaje);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Comentario enviado exitosamente']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error al enviar el comentario']);
    }
    exit;
}

// Obtener los comentarios
$result = $db->query("SELECT nombre, mensaje, fecha FROM comentarios ORDER BY fecha DESC LIMIT 10");
$comentarios = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $comentarios[] = [
        'nombre' => htmlspecialchars($row['nombre']),
        'mensaje' => nl2br(htmlspecialchars($row['mensaje'])),
        'fecha' => date('d/m/Y H:i', strtotime($row['fecha']))
    ];
}

echo json_encode(['success' => true, 'comentarios' => $comentarios]);
