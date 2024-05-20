document.getElementById("checkoutButton").addEventListener("click", function(event) {
    // Check if the shopping cart is empty
    if (listOfProducts.length === 0) {
        // If cart is empty, prevent default action (navigation to checkout page)
        event.preventDefault();
        // Display alert
        alert('Your shopping cart is empty!');
    } else {
        // If cart is not empty, navigate to the checkout page
        window.location.href = "checkout.html";
    }
});

// Load cart data from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const listOfProducts = JSON.parse(savedCart);
        renderCheckoutProducts(listOfProducts);
    }
});

function updateTotalPriceAndQuantity(products) {
    let totalQuantity = 0;
    let totalPrice = 0;

    products.forEach(product => {
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
    });

    const totalQuantityElement = document.querySelector('.totalQuantity');
    const totalPriceElement = document.querySelector('.totalPrice');

    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = '₱' + totalPrice.toFixed(2);
}

function renderCheckoutProducts(products) {
    const checkoutItems = document.querySelector('.checkoutItems');
    checkoutItems.innerHTML = ''; // Clear existing items
    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('items');
        item.innerHTML = `
            <div class="Image">
                <img src="${product.imageSrc}" alt="${product.productName}">
            </div>
            <div class="Name">${product.productName}</div>
            <div class="Price">₱${product.price.toFixed(2)}</div>
            <div class="Quantity">${product.quantity}</div>
        `;
        checkoutItems.appendChild(item);
    });

    updateTotalPriceAndQuantity(products);
}

// Add event listener to detect when user leaves the checkout tab
window.addEventListener('beforeunload', function (e) {
    // Clear order summary when user leaves the checkout tab
    const checkoutItems = document.querySelector('.checkoutItems');
    checkoutItems.innerHTML = '';
});

document.getElementById('checkoutPageButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = document.getElementById('checkoutForm');
    
    // Check if the form is valid
    if (form.checkValidity()) {
        // If the form is valid, show custom confirmation pop-up
        document.getElementById('confirmPopup').style.display = 'flex';
    } else {
        // If the form is not valid, show an alert
        alert('Please fill out all required fields.');
    }
});

// Function to handle confirmation
// Function to handle confirmation
function confirmCheckout(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    document.getElementById('confirmPopup').style.display = 'none';
    showThankYouPopup();
}
// Function to cancel checkout
function cancelCheckout() {
    document.getElementById('confirmPopup').style.display = 'none';
}

// Function to show thank-you message pop-up
function showThankYouPopup() {
    // Clear form fields
    document.getElementById('checkoutForm').reset();

    // Show thank-you pop-up
    document.getElementById('thankYouPopup').style.display = 'flex';
}

// Function to close thank-you message pop-up
function closeThankYouPopup(event) {
    event.preventDefault(); // Prevent the default link click behavior
    document.getElementById('thankYouPopup').style.display = 'none';
    clearCart();
    window.location.href = 'home.html'; // Redirect to home page after closing thank-you pop-up
}

// Function to clear cart data from localStorage
function clearCart() {
    localStorage.removeItem('cart');
}