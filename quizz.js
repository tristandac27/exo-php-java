document.addEventListener('DOMContentLoaded', function() {
    let currentRound = 0;
    const totalRounds = 5;
    let score = 0;

    // Fonction pour démarrer une manche
    function startQuizRound() {
        fetchRandomAnimeQuestion();
    }

    // Fonction pour afficher une nouvelle question
    function displayQuestion(anime, wrongChoices) {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = ''; // Effacer la question précédente

        // Créer les éléments pour afficher l'année de l'anime
        const animeYear = document.createElement('h2');
        animeYear.textContent = `Date de parution : ${anime.aired.prop.from.year || 'Inconnu'}`; // Affiche l'année

        const animeSynopsis = document.createElement('p');
        animeSynopsis.textContent = anime.synopsis || "Synopsis indisponible.";

        quizContainer.appendChild(animeYear);  // Affiche l'année dans la question
        quizContainer.appendChild(animeSynopsis);  // Affiche le synopsis

        // Créer une liste de réponses avec le nom des animes (1 correcte, 2 incorrectes)
        let choices = [...wrongChoices];
        choices.push(anime.title); // Ajouter la bonne réponse 
        choices = shuffleArray(choices); // Mélanger les choix aléatoirement

        // Créer les boutons de réponse
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', function() {
                if (choice === anime.title) {
                    score++;
                    alert('Bonne réponse!');
                } else {
                    alert('Mauvaise réponse!');
                }

                currentRound++;
                if (currentRound < totalRounds) {
                    setTimeout(startQuizRound, 500); // Attendre 500ms avant de passer à la question suivante
                } else {
                    displayFinalScore();
                }
            });

            quizContainer.appendChild(button);
        });
    }

    // Fonction pour mélanger un tableau 
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Fonction pour afficher le score final
    function displayFinalScore() {
        const scoreContainer = document.getElementById('score-container');
        scoreContainer.innerHTML = `<h2>Votre score final est de ${score} sur ${totalRounds}</h2>`;
        document.getElementById('quiz-container').style.display = 'none'; // Cacher le quiz
    }

    // Fonction pour obtenir une question aléatoire
    function fetchRandomAnimeQuestion() {
        fetch('https://api.jikan.moe/v4/top/anime')
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.data.length);
                    const selectedAnime = data.data[randomIndex];

                    // Générer deux choix de réponses incorrectes aléatoires
                    const wrongChoices = [];
                    while (wrongChoices.length < 2) {
                        const wrongIndex = Math.floor(Math.random() * data.data.length);
                        if (wrongIndex !== randomIndex) {
                            wrongChoices.push(data.data[wrongIndex].title);
                        }
                    }

                    displayQuestion(selectedAnime, wrongChoices);  // Appeler la fonction displayQuestion
                } else {
                    alert('Aucun anime trouvé.');
                }
            })
            .catch(error => console.error('Erreur API:', error));
    }

    // Démarrer la première manche
    startQuizRound();
});