document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('petTable');

    // Funcția principală de filtrare
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const currentPage = window.location.pathname;

        // --- LOGICA PENTRU PAGINA HOME ---
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
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
                // Luăm tot textul din rând (Nume, Vârstă, Rasă, etc.)
                const rowText = rows[i].textContent.toLowerCase();
                
                // Dacă query-ul se regăsește oriunde în textul rândului
                if (rowText.includes(query)) {
                    rows[i].style.display = ""; // Afișează
                } else {
                    rows[i].style.display = "none"; // Ascunde
                }
            }
        }
    }

    // Ascultă pentru tasta ENTER
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Ascultă pentru click pe butonul "Cauta"
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
});
