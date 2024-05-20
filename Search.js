document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const query = document.getElementById('search-input').value; // Get the search query
    const url = 'Shop.html?q=' + encodeURIComponent(query); // Construct the search URL
    window.location.href = url; // Redirect to the search page
});

function hideProducts(selectedProduct) {
    var productSections = document.querySelectorAll('.productSection');
    productSections.forEach(function(section) {
        if (selectedProduct === 'all' || section.getAttribute('data-product') === selectedProduct) {
            section.style.display = 'table-row-group';
        } else {
            section.style.display = 'none';
        }
    });
}

function filterProducts() {
    var searchQuery = document.getElementById('search-input').value.toLowerCase(); // Get the search query
    var productSections = document.querySelectorAll('.productSection');
    productSections.forEach(function(section) {
        var productName = section.getAttribute('data-product').toLowerCase();
        if (productName.includes(searchQuery)) {
            section.style.display = 'table-row-group';
        } else {
            section.style.display = 'none';
        }
    });
}

// Add event listener to search input for filtering products dynamically
document.getElementById('search-input').addEventListener('input', filterProducts);