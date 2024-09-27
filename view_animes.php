<?php
// view_animes.php : Affiche tous les animes enregistrés par l'utilisateur connecté
include 'db.php';
session_start(); // Start the session to access the logged-in user

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "Vous devez être connecté pour voir vos animes enregistrés.";
    exit();
}

$user_id = $_SESSION['user_id']; // Get the logged-in user's ID

// Récupérer tous les animes de l'utilisateur connecté
$query = 'SELECT * FROM animes WHERE user_id = :user_id'; // Assurez-vous que "animes" est le nom de votre table
$stmt = $pdo->prepare($query);
$stmt->bindParam(':user_id', $user_id);
$stmt->execute();
$animes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fonction pour supprimer un anime
if (isset($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    $deleteStmt = $pdo->prepare("DELETE FROM animes WHERE id = :id AND user_id = :user_id");
    $deleteStmt->bindParam(':id', $id);
    $deleteStmt->bindParam(':user_id', $user_id);
    $deleteStmt->execute();
    header("Location: view_animes.php"); // Rediriger après suppression
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tous les Animes Enregistrés</title>
    <link rel="stylesheet" href="view_animes.css"> 
</head>
<body>
    <h1>Tous les Animes Enregistrés</h1>
    <div id="anime-list">
        <?php if (count($animes) > 0): ?>
            <?php foreach ($animes as $anime): ?>
                <div class="anime-item">
                    <h3><?php echo htmlspecialchars($anime['name']); ?> (<?php echo htmlspecialchars($anime['year']); ?>)</h3>
                    <p>Saison: <?php echo htmlspecialchars($anime['season']); ?></p>
                    <p><?php echo nl2br(htmlspecialchars($anime['synopsis'])); ?></p>
                    <button onclick="window.location.href='view_animes.php?delete=<?php echo $anime['id']; ?>'">Supprimer</button>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucun anime enregistré.</p>
        <?php endif; ?>
    </div>
    <a href="index.php" class="btn-style">Retour à la recherche</a>
</body>
</html>