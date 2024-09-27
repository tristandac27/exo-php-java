document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let characterName = document.getElementById('character-name').value;

            // Appel à l'API Jikan pour rechercher un personnage par nom
            fetch(`https://api.jikan.moe/v4/characters?q=${characterName}`)
                .then(response => response.json())
                .then(data => {
                    let resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = ''; // Vider les résultats précédents

                    if (data.data && data.data.length > 0) {
                        displayCharacters(data.data);
                    } else {
                        resultsDiv.innerHTML = '<p>Aucun personnage trouvé.</p>';
                    }
                })
                .catch(error => console.error('Erreur API:', error));
        });
    }

    // Fonction pour afficher les personnages
    function displayCharacters(characters) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Vider les résultats avant d'ajouter les nouveaux

        characters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character-item');

            // Titre du personnage
            const characterName = document.createElement('h3');
            characterName.textContent = character.name;

            // Image du personnage
            const characterImage = document.createElement('img');
            characterImage.src = character.images.jpg.image_url;
            characterImage.alt = character.name;
            characterImage.style.maxWidth = '200px'; // Limite la taille de l'image si nécessaire

            // Informations supplémentaires
            const characterInfo = document.createElement('p');
            characterInfo.innerHTML = `
                <strong>Nom Kanji:</strong> ${character.name_kanji || 'Inconnu'}<br>
                <strong>Surnoms:</strong> ${character.nicknames.length > 0 ? character.nicknames.join(', ') : 'Aucun'}<br>
                <strong>Favoris:</strong> ${character.favorites || 'Aucun'}<br>
                <strong>À propos:</strong> ${character.about || 'Aucune information disponible.'}
            `;

            // Ajout des éléments à characterDiv
            characterDiv.appendChild(characterImage);
            characterDiv.appendChild(characterName);
            characterDiv.appendChild(characterInfo);

            // Ajouter characterDiv à resultsDiv
            resultsDiv.appendChild(characterDiv);
        });
    }
});
