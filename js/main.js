document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('petTable');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const fullUrl = window.location.href.toLowerCase();

        // 1. LOGICA PENTRU PAGINA HOME
        // Verificăm dacă suntem pe prima pagină (index)
        if (fullUrl.includes('index.html') || fullUrl.endsWith('/') || !fullUrl.includes('.html')) {
            if (query === "") return;

            if (query.includes('cain') || query.includes('catel')) {
                window.location.href = 'caini.html';
            } else if (query.includes('pisic') || query.includes('mata') || query.includes('mâț')) {
                window.location.href = 'pisici.html';
            } else {
                alert('Te rugăm să cauți "caine" sau "pisica" pentru a vedea listele!');
            }
            return;
        }

        // 2. LOGICA PENTRU FILTRARE (În paginile cu tabel)
        if (tableBody) {
            const rows = tableBody.getElementsByTagName('tr');
            let found = false;

            for (let i = 0; i < rows.length; i++) {
                const rowText = rows[i].textContent.toLowerCase();
                if (rowText.includes(query)) {
                    rows[i].style.display = ""; 
                    found = true;
                } else {
                    rows[i].style.display = "none"; 
                }
            }
        }
    }

    // Event Listeners cu prevenirea erorilor de browser
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
});
