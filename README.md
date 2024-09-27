Vue d'ensemble
L'application Quiz Anime est une application web complète qui permet aux utilisateurs de :

- Créer un compte et se connecter.
- Rechercher des animes par nom et genre.
- Lire des critiques et des avis sur les animes et mangas.
- Participer à des quiz pour tester leurs connaissances en anime.
- Discuter avec d'autres utilisateurs en temps réel.

Fonctionnalités :
- Création de compte et connexion : Les utilisateurs peuvent créer un compte et se connecter pour accéder à toutes les fonctionnalités de l'application.
- Recherche d'animes : Recherche d'animes par nom et genre.
- Critiques et avis : Lire et écrire des critiques et des avis sur les animes et mangas.
- Quiz Anime : Testez vos connaissances en anime avec des questions aléatoires.
- Chat en temps réel : Discutez avec d'autres utilisateurs connectés.

Installation :
1. Clonez le dépôt sur votre machine locale.
2. Accédez au répertoire du projet.
3. Assurez-vous d'avoir un serveur web configuré (par exemple, XAMPP, WAMP ou un serveur local).

Utilisation :
1. Démarrez votre serveur web et placez le répertoire du projet dans le répertoire racine du serveur (par exemple, htdocs pour XAMPP).
2. Ouvrez votre navigateur web et accédez à l'application (par exemple, http://localhost/quiz-anime).
3. Utilisez la barre de navigation pour accéder aux différentes fonctionnalités :
    - Accueil : Retour à la page d'accueil.
    - Recommandations / Critiques : Accédez aux recommandations et critiques d'animes.
    - Voir les animes enregistrés : Affichez tous les animes que vous avez enregistrés.
    - Quiz : Testez vos connaissances avec le quiz anime.
    - Personnages : Recherchez des personnages d'animes.
    - Chat : Discutez avec d'autres utilisateurs connectés.

Structure des fichiers :
- index.php : Page d'accueil de l'application.
- quizz.php : Page principale du quiz.
- character.php : Page de recherche de personnages.
- reco.php : Page des recommandations et critiques.
- view_animes.php : Page pour afficher tous les animes enregistrés.
- app.js : Fichier JavaScript contenant la logique de recherche et d'affichage des animes.
- quizz.js : Fichier JavaScript contenant la logique du quiz.
- quizz.css : Fichier CSS pour
fetchAnimeData : Récupère les données des animes depuis l'API Jikan.
displayAnimeResults : Affiche les résultats de la recherche d'animes.
setupSlider : Initialise le slider pour parcourir les animes.
showAnimeDetails : Affiche les détails de l'anime dans une fenêtre modale.
quizz.js
Event Listener : Écoute le chargement du contenu du DOM et initialise le quiz.
startQuizRound : Récupère une question aléatoire sur les animes.
displayQuestion : Affiche la question et les réponses à choix multiples.
shuffleArray : Mélange le tableau des choix pour randomiser l'ordre.
displayFinalScore : Affiche le score final après toutes les manches.
fetchRandomAnimeQuestion : Récupère des données d'anime aléatoires depuis l'API Jikan et génère des choix incorrects.
index.php (Extrait)
Dépendances
Jikan API : Utilisée pour récupérer les données des animes.
Licence

