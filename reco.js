document.addEventListener('DOMContentLoaded', function() {
    const mangaTab = document.getElementById('manga-tab');
    const animeTab = document.getElementById('anime-tab');
    const recommendationsDiv = document.getElementById('recommendations');
    const reviewsDiv = document.getElementById('reviews');

    // Gestion des tabs : affiche les recommandations manga par défaut
    recommendationsDiv.classList.add('active');

    mangaTab.addEventListener('click', function() {
        recommendationsDiv.classList.add('active');
        reviewsDiv.classList.remove('active');
        fetchRecentMangaRecommendations(1); // Récupère les recommandations manga
    });

    animeTab.addEventListener('click', function() {
        reviewsDiv.classList.add('active');
        recommendationsDiv.classList.remove('active');
        fetchRecentAnimeReviews(1); // Récupère les critiques anime
    });
});

// Fonction pour récupérer les recommandations de manga
function fetchRecentMangaRecommendations(page) {
    fetch(`https://api.jikan.moe/v4/recommendations/manga?page=${page}`)
        .then(response => response.json())
        .then(data => {
            displayMangaRecommendations(data.data);
        })
        .catch(error => console.error('Erreur API:', error));
}

// Fonction pour afficher les recommandations de manga
function displayMangaRecommendations(mangaRecommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Vider les résultats précédents

    if (mangaRecommendations.length > 0) {
        mangaRecommendations.forEach(manga => {
            const mangaDiv = document.createElement('div');
            mangaDiv.classList.add('item');
            mangaDiv.innerHTML = `
                <h3>${manga.entry[0].title}</h3>
                <p>${manga.content || "Aucun commentaire disponible."}</p>
            `;
            recommendationsDiv.appendChild(mangaDiv);
        });
    } else {
        recommendationsDiv.innerHTML = '<p>Aucune recommandation trouvée.</p>';
    }
}

// Fonction pour récupérer les critiques d'anime
function fetchRecentAnimeReviews(page, preliminary = false, spoilers = false) {
    const url = `https://api.jikan.moe/v4/reviews/anime?page=${page}${preliminary ? '&preliminary=true' : ''}${spoilers ? '&spoiler=true' : ''}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayAnimeReviews(data.data);
        })
        .catch(error => console.error('Erreur API:', error));
}

// Fonction pour afficher les critiques d'anime
function displayAnimeReviews(animeReviews) {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = ''; // Vider les résultats précédents

    if (animeReviews.length > 0) {
        animeReviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('item');
            reviewDiv.innerHTML = `
                <h3>${review.entry.title}</h3>
                <p>${review.review || "Aucun contenu disponible."}</p>
            `;
            reviewsDiv.appendChild(reviewDiv);
        });
    } else {
        reviewsDiv.innerHTML = '<p>Aucune critique trouvée.</p>';
    }
}
