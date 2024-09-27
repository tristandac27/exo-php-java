<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche d'Animes</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="header">
        <h1>Recherche d'Animes</h1>
        <?php
        session_start();
        if (isset($_SESSION['username'])) {
            echo '<div class="user-info">';
            echo '<span>Bienvenue, ' . htmlspecialchars($_SESSION['username']) . '!</span>';
            echo '<button onclick="window.location.href=\'logout.php\'">Déconnexion</button>';
            echo '</div>';
        } else {
            echo '<button onclick="window.location.href=\'login.php\'">Connexion</button>';
        }
        ?>
    </div>

    <div class="navbar">
        <button id="view-animes-btn" onclick="window.location.href='chat.php'">Chat</button>
        <button id="view-animes-btn" onclick="window.location.href='reco.php'">Recommandations / critiques</button>
        <button id="view-animes-btn" onclick="window.location.href='view_animes.php'">Voir tous les Animes sauvegarder</button>
        <button id="Quizz-btn" onclick="window.location.href='quizz.php'">Quizz</button>
        <button id="character-btn" onclick="window.location.href='character.php'">Personnage</button>
    </div>

    <form id="search-form">
        <input type="text" id="anime-name" placeholder="Nom de l'anime" required>
        
        <select id="genre-select">
            <option value="">Tous les genres</option>
            <option value="1">Action</option>
            <option value="2">Aventure</option>
            <option value="4">Comédie</option>
            <option value="8">Drame</option>
            <option value="10">Fantaisie</option>
            <option value="14">Horreur</option>
            <option value="22">Romance</option>
            <option value="24">Sci-Fi</option>
            <option value="26">Slice of Life</option>
            <option value="28">Sports</option>
            <option value="30">Supernatural</option>
            <option value="36">Mystery</option>
            <option value="37">Psychological</option>
            <option value="38">Thriller</option>
            <option value="40">Ecchi</option>
            <option value="42">Mecha</option>
            <option value="46">Military</option>
            <option value="47">Music</option>
            <option value="48">Parody</option>
            <option value="49">Samurai</option>
            <option value="50">School</option>
        </select>

        <button type="submit">Rechercher</button>
    </form>

    <div id="results"></div>

  
    <div class="slider-container">
        <button class="slider-button left" id="prev-btn">&lt;</button>
        <div class="slider">
            <div class="slider-track" id="slider-track">
            
            </div>
        </div>
        <button class="slider-button right" id="next-btn">&gt;</button>
    </div>

    <div id="animeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modal-details"></div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>