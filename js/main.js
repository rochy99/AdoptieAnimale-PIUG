document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('petTable');
    const resultsCounter = document.getElementById('resultsCounter');

    function performSearch(event) {
        if (event) event.preventDefault();

        const query = searchInput.value.toLowerCase().trim();
        
        // --- LOGICA PENTRU PAGINI CU TABEL ---
        if (tableBody) {
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

            // Actualizăm textul contorului
            if (query === "") {
                resultsCounter.textContent = ""; // Ascundem contorul dacă nu căutăm nimic
            } else {
                resultsCounter.textContent = `Am găsit ${count} ${count === 1 ? 'rezultat' : 'rezultate'}.`;
            }
        } 
        // --- LOGICA PENTRU HOME ---
        else {
            if (query === "") return;
            if (query.includes('cain') || query.includes('catel')) {
                window.location.href = 'caini.html';
            } else if (query.includes('pisic') || query.includes('mat')) {
                window.location.href = 'pisici.html';
            } else {
                alert('Te rugăm să cauți "caine" sau "pisica"!');
            }
        }
    }

    // Filtrare în timp real pe măsură ce scrii (fără să mai apeși Enter)
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }

    if (searchButton) searchButton.addEventListener('click', performSearch);
});