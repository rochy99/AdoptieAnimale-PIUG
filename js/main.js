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