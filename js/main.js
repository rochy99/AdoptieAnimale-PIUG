document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('petTable');
    const resultsCounter = document.getElementById('resultsCounter');

    // --- 1. LOGICA PENTRU PAGINILE CU ANIMALE (Filtrare în timp real) ---
    // Executăm acest bloc DOAR dacă există un tabel pe pagină
    if (tableBody && searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase().trim();
            const rows = tableBody.getElementsByTagName('tr');
            let count = 0;

            for (let i = 0; i < rows.length; i++) {
                const rowText = rows[i].textContent.toLowerCase();
                if (rowText.includes(query)) {
                    rows[i].style.display = ""; 
                    count++; // Numărăm rândul dacă este vizibil
                } else {
                    rows[i].style.display = "none"; 
                }
            }

            // Actualizăm textul contorului, dacă elementul există
            if (resultsCounter) {
                if (query === "") {
                    resultsCounter.textContent = ""; 
                } else {
                    resultsCounter.textContent = `Am găsit ${count} ${count === 1 ? 'rezultat' : 'rezultate'}.`;
                }
            }
        });
    } 
    
    // --- 2. LOGICA PENTRU HOME (Redirecționare doar la click) ---
    // Executăm acest bloc DOAR dacă nu suntem pe o pagină cu tabel
    // --- 2. LOGICA PENTRU HOME ---
    else if (!tableBody && searchButton && searchInput) {
        
        // Funcția de căutare (mutată într-o variabilă pentru a fi apelată de ambele evenimente)
        const handleHomeSearch = function(e) {
            if (e) e.preventDefault();
            
            const query = searchInput.value.toLowerCase().trim();
            if (query === "") return;

            if (query.includes('cain') || query.includes('catel')) {
                window.location.href = 'caini.html';
            } else if (query.includes('pisic') || query.includes('mat')) {
                window.location.href = 'pisici.html';
            } else {
                alert('Te rugăm să cauți "caine" sau "pisica"!');
                searchInput.value = '';
            }
        };

        // Ascultă pentru CLICK pe buton
        searchButton.addEventListener('click', handleHomeSearch);

        // Ascultă pentru tasta ENTER în casetă
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleHomeSearch(e);
            }
        });
    }
});

// --- 3. LOGICA PENTRU FAVORITE ---
// Așteptăm click-uri pe orice element din pagină
document.addEventListener('click', function(e) {
    // Verificăm dacă elementul apăsat este butonul de favorite (sau iconița din el)
    if (e.target.classList.contains('fav-btn') || e.target.closest('.fav-btn')) {
        const btn = e.target.classList.contains('fav-btn') ? e.target : e.target.closest('.fav-btn');
        
        // Extragem datele din atributele data-* ale butonului
        const petData = {
            name: btn.getAttribute('data-name'),
            img: btn.getAttribute('data-img'),
            race: btn.getAttribute('data-race')
        };

        addToFavorites(petData);
    }
});

function addToFavorites(pet) {
    // Luăm lista actuală sau creăm una goală dacă nu există
    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

    // Verificăm dacă animalul este deja în listă (după nume)
    const isAlreadyAdded = favorites.some(item => item.name === pet.name);

    if (!isAlreadyAdded) {
        favorites.push(pet);
        localStorage.setItem('myFavorites', JSON.stringify(favorites));
        alert(`${pet.name} a fost adăugat la favorite! ❤️`);
    } else {
        alert(`${pet.name} este deja în lista ta de favorite.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Lista completă cu datele celor 20 de animale (Câini + Pisici)
    const allPets = [
        { name: "Max", img: "assets/img/dogs/dog-max.jpg", race: "Metis" },
        { name: "Kira", img: "assets/img/dogs/dog-kira.jpg", race: "Podenco mix" },
        { name: "Milo", img: "assets/img/dogs/dog-milo.jpg", race: "Amstaff mix" },
        { name: "Zara", img: "assets/img/cats/cat-zara.jpg", race: "European Shorthair" },
        { name: "Leo", img: "assets/img/dogs/dog-leo.jpg", race: "Pinscher mix" },
        { name: "Luna", img: "assets/img/cats/cat-luna.jpg", race: "Bengal mix" },
        { name: "Rex", img: "assets/img/dogs/dog-rex.jpg", race: "Terrier mix" },
        { name: "Oreo", img: "assets/img/cats/cat-oreo.jpg", race: "Tuxedo cat" },
        { name: "Tobi", img: "assets/img/dogs/dog-tobi.jpg", race: "Jack Russell mix" }
        
    ];

    const carouselContainer = document.getElementById('randomPetCarousel');
    if (!carouselContainer) return;

    // 2. Amestecăm lista și tăiem primele 6
    const shuffled = allPets.sort(() => 0.5 - Math.random());
    const selectedPets = shuffled.slice(0, 6);

    // 3. Generăm HTML-ul pentru Indicators și Inner Items
    let indicatorsHTML = '<div class="carousel-indicators">';
    let itemsHTML = '<div class="carousel-inner">';

    selectedPets.forEach((pet, index) => {
        const isActive = index === 0 ? 'active' : '';
        
        indicatorsHTML += `
            <button type="button" data-bs-target="#randomPetCarousel" data-bs-slide-to="${index}" 
                    class="${isActive}" aria-current="${isActive ? 'true' : 'false'}"></button>`;
        
        itemsHTML += `
            <div class="carousel-item ${isActive}">
                <img src="${pet.img}" class="d-block w-100 carousel-img" alt="${pet.name}">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                    <h5>${pet.name}</h5>
                    <p>${pet.race}</p>
                </div>
            </div>`;
    });

    indicatorsHTML += '</div>';
    itemsHTML += '</div>';

    // 4. Adăugăm butoanele de control (Prev/Next)
    const controlsHTML = `
        <button class="carousel-control-prev" type="button" data-bs-target="#randomPetCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#randomPetCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>`;

    // 5. Injectăm totul în container
    carouselContainer.innerHTML = indicatorsHTML + itemsHTML + controlsHTML;
});