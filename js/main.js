alert('JavaScript este activ!');
document.addEventListener('DOMContentLoaded', function() {
    // 1. Preluăm elementele din DOM
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('petTable');

    // 2. Funcția principală de filtrare
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const currentPage = window.location.pathname;

        // --- LOGICA PENTRU PAGINA HOME ---
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            // Dacă e gol, nu facem nimic
            if (query === "") return; 

            if (query.includes('caine') || query.includes('cățel')) {
                window.location.href = 'caini.html';
            } else if (query.includes('pisica') || query.includes('mâță')) {
                window.location.href = 'pisici.html';
            } else {
                alert('Te rugăm să cauți "caine" sau "pisica" pentru a vedea listele noastre!');
            }
            return;
        }

        // --- LOGICA PENTRU PAGINILE CU TABEL (Câini/Pisici) ---
        if (tableBody) {
            const rows = tableBody.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const rowText = rows[i].textContent.toLowerCase();
                
                if (rowText.includes(query)) {
                    rows[i].style.display = ""; 
                } else {
                    rows[i].style.display = "none"; 
                }
            }
        }
    }

    // 3. Ascultă pentru tasta ENTER (Doar dacă există bara de căutare)
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Oprește refresh-ul paginii
                performSearch();
            }
        });
    }

    // 4. Ascultă pentru click pe butonul "Cauta" (Doar dacă există butonul)
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault(); // Oprește refresh-ul paginii
            performSearch();
        });
    }
});
