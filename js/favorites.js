document.addEventListener('DOMContentLoaded', function() {
    displayFavorites();
});

function displayFavorites() {
    const tableBody = document.getElementById('favoritesTableBody');
    const noFavMsg = document.getElementById('noFavoritesMsg');
    
    // Preluăm datele salvate sub cheia 'myFavorites'
    const favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];

    // Verificăm dacă avem date
    if (favorites.length === 0) {
        tableBody.innerHTML = "";
        noFavMsg.classList.remove('d-none');
        return;
    }

    noFavMsg.classList.add('d-none');
    tableBody.innerHTML = "";

    // Generăm rândurile tabelului
    favorites.forEach((pet, index) => {
        const row = `
            <tr>
                <td><img src="${pet.img}" width="80" class="rounded shadow-sm"></td>
                <td><strong>${pet.name}</strong></td>
                <td><span class="badge bg-secondary">${pet.race}</span></td>
                <td class="text-center">
                    <button class="btn btn-danger btn-sm" onclick="removeOneFavorite(${index})">Șterge</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function removeOneFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('myFavorites')) || [];
    favorites.splice(index, 1); // Ștergem elementul de la poziția respectivă
    localStorage.setItem('myFavorites', JSON.stringify(favorites));
    displayFavorites(); // Reîmprospătăm tabelul
}

function clearAllFavorites() {
    if (confirm("Ești sigur că vrei să golești toată lista de favorite?")) {
        localStorage.removeItem('myFavorites');
        displayFavorites();
    }
}