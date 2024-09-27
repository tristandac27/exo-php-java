<?php
// save_anime.php : Enregistre un anime dans la base de données
include 'db.php';
session_start(); 


if (!isset($_SESSION['user_id'])) {
    echo "Vous devez être connecté pour enregistrer un anime.";
    exit();
}

// Récupération des données envoyées en JSON
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $name = $data['name'];
    $year = $data['year'];
    $season = $data['season'];
    $synopsis = $data['synopsis'];
    $user_id = $_SESSION['user_id']; 

    // Requête d'insertion en utilisant PDO
    $stmt = $pdo->prepare("INSERT INTO animes (name, year, season, synopsis, user_id) VALUES (:name, :year, :season, :synopsis, :user_id)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':season', $season);
    $stmt->bindParam(':synopsis', $synopsis);
    $stmt->bindParam(':user_id', $user_id);

    if ($stmt->execute()) {
        echo "L'anime a été enregistré avec succès.";
    } else {
        echo "Erreur lors de l'enregistrement de l'anime.";
    }
} else {
    echo "Aucune donnée reçue.";
}
?>