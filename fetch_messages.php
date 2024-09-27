<?php
include 'db.php';

$stmt = $pdo->query("SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at ASC");
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($messages);
?>