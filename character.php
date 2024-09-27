<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personnages d'Anime</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .character-item {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            margin: 10px 0;
            display: flex;
            align-items: flex-start; 
            width: 100%; 
            height: 200px;
            box-sizing: border-box; 
            overflow: hidden; 
        }
        img {
            margin-right: 20px;
            border-radius: 8px;
            max-width: 100px; 
            max-height: 100%; 
        }
        h3 {
            font-size: 1.5em;
            margin: 0;
        }
        p {
            font-size: 0.9em;
            margin: 5px 0;
            line-height: 1.4;
            flex-grow: 1;
       
        form {
            margin-bottom: 20px;
        }
        input[type="text"] {
            padding: 10px;
            width: 250px;
            margin-right: 10px;
        }
        button {
            padding: 10px;
        }
    </style>
</head>
<body>
    <button type="button" class="Home-btn" id="Home-btn"onclick="window.location.href='index.php'">Accueil</button>
    <h1>Recherche de Personnages d'Anime</h1>

    <form id="search-form">
        <input type="text" id="character-name" placeholder="Nom du personnage" required>
        <button type="submit">Rechercher</button>
    </form>

    <div id="results"></div>

    <script src="character.js"></script>
</body>
</html>
