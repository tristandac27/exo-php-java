<?php
session_start(); 

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$username = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat</title>
    <link rel="stylesheet" href="chat.css"> 
</head>
<body>
    <div class="header">
        <h1>Chat</h1>
        <div class="user-info">
            <span>Bienvenue, <?php echo htmlspecialchars($username); ?>!</span>
            <button onclick="window.location.href='index.php'">Accueil</button>
            <button onclick="window.location.href='logout.php'">Déconnexion</button>
        </div>
    </div>

    <div id="chat-container">
        <div id="messages"></div>
        <form id="message-form">
            <input type="text" id="message-input" placeholder="Votre message..." required>
            <button type="submit">Envoyer</button>
        </form>
    </div>

    <script src="chat.js"></script> 
</body>
</html>