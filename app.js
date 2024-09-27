let currentIndex = 0;
const slideItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let animeName = document.getElementById('anime-name').value;
            let selectedGenre = document.getElementById('genre-select').value; // Obtenir le genre sélectionné

            // Construire l'URL de la requête API avec le genre si sélectionné
            let apiUrl = `https://api.jikan.moe/v4/anime?q=${animeName}`;
            if (selectedGenre) {
                apiUrl += `&genres=${selectedGenre}`; // Ajouter le paramètre de genre
            }

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    let resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = ''; // Vider les résultats précédents

                    if (data.data && data.data.length > 0) {
                        displayAnimes(data.data);
                    } else {
                        resultsDiv.innerHTML = '<p>Aucun résultat trouvé.</p>';
                    }
                })
                .catch(error => console.error('Erreur API:', error));
        });
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        moveSlide(-1);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        moveSlide(1);
    });

    // Gestion du modal
    const modal = document.getElementById('animeModal');
    const modalContent = document.getElementById('modal-details');
    const closeModal = document.getElementsByClassName('close')[0];

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

function displayAnimes(animes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    const sliderTrack = document.getElementById('slider-track');
    sliderTrack.innerHTML = ''; 

    animes.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('slider-item');

        // Nom de l'anime
        const animeName = document.createElement('h3');
        animeName.textContent = `${anime.title} (${anime.aired.prop.from ? anime.aired.prop.from.year : 'N/A'})`;

        // Image de l'anime
        if (anime.images && anime.images.jpg && anime.images.jpg.image_url) {
            const animeImage = document.createElement('img');
            animeImage.src = anime.images.jpg.image_url;
            animeImage.alt = anime.title;
            
            // Limiter la taille de l'image
            animeImage.style.width = '150px';
            animeImage.style.height = 'auto';
            
            animeDiv.appendChild(animeImage);
        } else {
            const noImageText = document.createElement('p');
            noImageText.textContent = "Image indisponible.";
            animeDiv.appendChild(noImageText);
        }

        // Bouton "Enregistrer"
        const saveButton = document.createElement('button');
        saveButton.textContent = "Enregistrer";
        saveButton.classList.add('btn');
        saveButton.classList.add('btn-save');
        saveButton.onclick = function() {
            saveAnimeToDatabase(anime);
        };

        // Bouton "Voir détails"
        const viewButton = document.createElement('button');
        viewButton.textContent = "Voir détails";
        viewButton.classList.add('btn');
        viewButton.classList.add('btn-view');
        viewButton.onclick = function() {
            showAnimeDetails(anime);
        };

        // Conteneur pour les boutons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(viewButton);

        // Ajouter le nom, l'image et les boutons à l'animeDiv
        animeDiv.appendChild(animeName);
        animeDiv.appendChild(buttonContainer);

        // Ajouter l'animeDiv au slider
        sliderTrack.appendChild(animeDiv);
        slideItems.push(animeDiv);
    });

    sliderTrack.style.width = `${slideItems.length * 1}px`;
}


function saveAnimeToDatabase(anime) {
    const animeData = {
        name: anime.title,
        year: anime.aired.prop.from ? anime.aired.prop.from.year : 'N/A',
        season: anime.season || "N/A",
        synopsis: anime.synopsis || "Synopsis indisponible."
    };

    fetch('save_anime.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animeData)
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Erreur lors de la sauvegarde:', error));
}

// Fonction pour afficher les détails de l'anime dans un modal
function showAnimeDetails(anime) {
    const modal = document.getElementById('animeModal');
    const modalContent = document.getElementById('modal-details');

    modalContent.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="max-width: 100px;">
        <p><strong>Année:</strong> ${anime.aired.prop.from ? anime.aired.prop.from.year : 'N/A'}</p>
        <p><strong>Synopsis:</strong> ${anime.synopsis || 'Synopsis indisponible.'}</p>
    `;

    modal.style.display = 'block';
}

function moveSlide(direction) {
    const sliderTrack = document.getElementById('slider-track');
    const sliderContainerWidth = document.querySelector('.slider-container').offsetWidth;
    const itemWidth = document.querySelector('.slider-item').offsetWidth + 20; 
    const maxIndex = Math.floor(slideItems.length - (sliderContainerWidth / itemWidth)); 

    currentIndex += direction;


    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    
    const translateX = -currentIndex * itemWidth;
    sliderTrack.style.transform = `translateX(${translateX}px)`;
}
