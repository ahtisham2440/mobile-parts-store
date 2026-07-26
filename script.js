// ==========================
// Mobile Parts Store
// script.js
// ==========================

// Products Data
const products = [
    {
        id: 1,
        name: "iPhone 13 Original LCD",
        category: "LCD",
        price: 12500,
        stock: 15,
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400"
    },
    {
        id: 2,
        name: "Samsung Battery",
        category: "Battery",
        price: 2500,
        stock: 30,
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400"
    },
    {
        id: 3,
        name: "Fast Charger",
        category: "Accessories",
        price: 3200,
        stock: 18,
        brand: "Anker",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    }
];

// ==========================
// Variables
// ==========================

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let cart = [];
let wishlist = [];

// ==========================
// Toast Notification
// ==========================

function showToast(message) {

    toastMessage.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ==========================
// Display Products
// ==========================

function displayProducts(productList) {

    productGrid.innerHTML = "";

    productList.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

            <span class="discount">-15%</span>

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p><strong>Brand:</strong> ${product.brand}</p>

            <p><strong>Category:</strong> ${product.category}</p>

            <p><strong>Stock:</strong> ${product.stock}</p>

            <p class="price">
                Rs. ${product.price.toLocaleString()}
            </p>

            <div class="rating">
                ⭐⭐⭐⭐⭐
            </div>

            <button
                class="cart-btn"
                onclick="addToCart(${product.id})">

                Add To Cart

            </button>

            <button
                class="wishlist-btn"
                onclick="addToWishlist(${product.id})">

                ❤️

            </button>

        </div>

        `;

    });

}

// ==========================
// Initial Load
// ==========================

displayProducts(products);

// ==========================
// Search & Category Filter
// ==========================

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All Categories" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}

searchInput.addEventListener("keyup", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// ==========================
// Add To Cart
// ==========================

function addToCart(id) {

    const selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct) return;

    cart.push(selectedProduct);

    cartCount.innerText = cart.length;

    showToast(selectedProduct.name + " added to cart!");

}

// ==========================
// Add To Wishlist
// ==========================

function addToWishlist(id) {

    const selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct) return;

    const exists = wishlist.some(product => product.id === id);

    if (exists) {

        showToast("Product already exists in wishlist.");
        return;

    }

    wishlist.push(selectedProduct);

    wishlistCount.innerText = wishlist.length;

    showToast(selectedProduct.name + " added to wishlist!");

}