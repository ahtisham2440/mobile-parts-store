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

const cartSidebar = document.getElementById("cartSidebar");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
// ==========================
// PRODUCT MODAL
// ==========================

const productModal = document.getElementById("productModal");

const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");

const modalName = document.getElementById("modalName");

const modalBrand = document.getElementById("modalBrand");

const modalCategory = document.getElementById("modalCategory");

const modalStock = document.getElementById("modalStock");

const modalPrice = document.getElementById("modalPrice");

const modalDescription = document.getElementById("modalDescription");

const modalCartBtn = document.getElementById("modalCartBtn");

const modalWishlistBtn = document.getElementById("modalWishlistBtn");

let currentProductId = null;

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
    class="details-btn"
    onclick="openProduct(${product.id})">

    View Details

</button>

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

    const existing = cart.find(item => item.id === id);

if(existing){

    existing.quantity++;

}else{

    cart.push({

        ...selectedProduct,

        quantity:1

    });

}

    cartCount.innerText = cart.length;updateCart

    showToast(selectedProduct.name + " added to cart!");

    updateCart();

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

// ==========================
// CART SIDEBAR
// ==========================

openCart.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    updateCart();

});

closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

});
function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.innerText = "0";

        cartCount.innerText = "0";

        return;

    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        cartItems.innerHTML += `

        <div class="cart-product">

            <h4>${product.name}</h4>

            <p>

Qty : ${product.quantity}

<br>

Rs. ${(product.price * product.quantity).toLocaleString()}

</p>

<div class="qty-box">

    <button onclick="decreaseQty(${index})">-</button>

    <span>${product.quantity}</span>

    <button onclick="increaseQty(${index})">+</button>

</div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        </div>

        <hr>

        `;

    });

    cartTotal.innerText = total.toLocaleString();

   cartCount.innerText = cart.reduce(
    (total,item)=> total + item.quantity,
    0
);

}

function removeFromCart(index){

    cart.splice(index,1);

    updateCart();

    showToast("Product removed from cart.");

}

// ==========================
// PRODUCT MODAL FUNCTIONS
// ==========================

function openProduct(id){

    const product = products.find(item => item.id === id);

    if(!product) return;

    currentProductId = id;

    modalImage.src = product.image;

    modalName.innerText = product.name;

    modalBrand.innerText = product.brand;

    modalCategory.innerText = product.category;

    modalStock.innerText = product.stock + " Available";

    modalPrice.innerText = "Rs. " + product.price.toLocaleString();

    modalDescription.innerText = product.description;

    productModal.classList.add("active");

}

closeModal.addEventListener("click", () => {

    productModal.classList.remove("active");

});

productModal.addEventListener("click", (e) => {

    if(e.target === productModal){

        productModal.classList.remove("active");

    }

});

modalCartBtn.addEventListener("click", () => {

    addToCart(currentProductId);

});

modalWishlistBtn.addEventListener("click", () => {

    addToWishlist(currentProductId);

});

function increaseQty(index){

    cart[index].quantity++;

    updateCart();

}

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

        showToast("Product removed from cart.");

    }

    updateCart();

}