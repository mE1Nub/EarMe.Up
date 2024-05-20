let iconCart = document.querySelector('.Cart');
let closeCart = document.querySelector('.Close');
let body = document.querySelector('body');
let listProductsHTML = document.querySelector('.listProducts');

let listOfProducts = [];
// Load cart data from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listOfProducts = JSON.parse(savedCart);
        renderCart();
    }
});

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', (event) => {
    event.preventDefault();
    body.classList.toggle('showCart');
});

// Define a function to save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(listOfProducts));
}

// Define a function to add products to the shopping cart
function updateCartCount() {
    const cartCount = document.querySelector('.Cart span');
    cartCount.textContent = listOfProducts.length;
}

// Update the addToCart and removeProduct functions to call updateCartCount
function addToCart(imageSrc, productName, price) {
    event.preventDefault();
    const existingProductIndex = listOfProducts.findIndex(product => product.productName === productName);
    if (existingProductIndex !== -1) {
        const existingProduct = listOfProducts[existingProductIndex];
        existingProduct.quantity += 1;
    } else {
        const product = { imageSrc, productName, price: parseFloat(price.replace('₱', '')), quantity: 1 };
        listOfProducts.push(product);
    }
    saveCart();
    renderCart();
    updateCartCount(); // Call the function to update the cart count
}

// Function to decrease quantity
function decreaseQuantity(element) {
    var quantityElement = element.parentNode.querySelector('.number');
    var currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
        var basePrice = parseFloat(element.getAttribute('data-base-price'));
        var newPrice = basePrice * (currentQuantity - 1);
        var priceElement = element.parentNode.parentNode.querySelector('.Price');
        priceElement.textContent = '₱' + newPrice.toFixed(2);
        var index = Array.from(element.parentNode.parentNode.parentNode.children).indexOf(element.parentNode.parentNode);
        listOfProducts[index].quantity--;
    } else {
        var cartItem = element.parentNode.parentNode;
        var index = Array.from(cartItem.parentNode.children).indexOf(cartItem);
        listOfProducts.splice(index, 1);
        renderCart();
    }
    saveCart();
}

// Function to increase quantity
function increaseQuantity(element) {
    var quantityElement = element.parentNode.querySelector('.number');
    var currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
    var basePrice = parseFloat(element.getAttribute('data-base-price'));
    var newPrice = basePrice * (currentQuantity + 1);
    var priceElement = element.parentNode.parentNode.querySelector('.Price');
    priceElement.textContent = '₱' + newPrice.toFixed(2);
    var index = Array.from(element.parentNode.parentNode.parentNode.children).indexOf(element.parentNode.parentNode);
    listOfProducts[index].quantity++;
    saveCart();
}

function removeProduct(element) {
    var cartItem = element.parentNode.parentNode;
    var index = Array.from(cartItem.parentNode.children).indexOf(cartItem);
    listOfProducts.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount(); // Call the function to update the cart count
}

// Define a function to render the shopping cart
function renderCart() {
    const cartList = document.querySelector('.cartList');
    cartList.innerHTML = '';
    listOfProducts.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('Item');
        cartItem.innerHTML = `
            <div class="Image">
                <img src="${product.imageSrc}" alt="${product.productName}">
            </div>
            <div class="Name">${product.productName}</div>
            <div class="Price" data-base-price="${product.price}">₱${(product.price * product.quantity).toFixed(2)}</div>
            <div class="Quantity">
                <span class="minus" onclick="decreaseQuantity(this)" data-base-price="${product.price}">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                </span>
                <span class="number">${product.quantity}</span> 
                <span class="add" onclick="increaseQuantity(this)" data-base-price="${product.price}"> 
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </span>
                <span class="remove" onclick="removeProduct(this)">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </span>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}