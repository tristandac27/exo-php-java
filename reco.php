<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recommandations Manga et Critiques Anime</title>
    <link rel="stylesheet" href="reco.css"> 
</head>
<body>
    <h1>Recommandations Manga et Critiques Anime</h1>

    <div class="tab-buttons">
        <button id="manga-tab">Voir les recommandations Manga</button>
        <button id="anime-tab">Voir les critiques Anime</button>
    </div>


    <div id="recommendations" class="active"></div>
    <div id="reviews"></div>

  
    <div class="home-button">
        <button onclick="window.location.href='index.php'">Retour à l'accueil</button>
    </div>

    <script src="reco.js"></script>
</body>
</html>