<?php
include 'db.php';
session_start(); 


if (!isset($_SESSION['user_id'])) {
    echo "Vous devez être connecté pour envoyer un message.";
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
$message = $_POST['message'];

$stmt = $pdo->prepare("INSERT INTO messages (user_id, username, message) VALUES (:user_id, :username, :message)");
$stmt->bindParam(':user_id', $user_id);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':message', $message);

if ($stmt->execute()) {
    echo "Message envoyé avec succès.";
} else {
    echo "Erreur lors de l'envoi du message.";
}
?>