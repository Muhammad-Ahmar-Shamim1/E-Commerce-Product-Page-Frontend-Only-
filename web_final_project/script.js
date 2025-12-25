// ========================================
// PRODUCT DATA ARRAY
// ========================================

const products = [
    // Wearables Category
    {
        id: 1,
        name: "Premium Smartwatch",
        price: 299.99,
        description: "Advanced fitness tracking with AMOLED display and heart rate monitoring",
        image: "images/smartwatch.png",
        category: "wearables"
    },
    {
        id: 2,
        name: "Fitness Tracker Pro",
        price: 149.99,
        description: "Waterproof fitness band with sleep tracking and 14-day battery life",
        image: "images/fitness_tracker.png",
        category: "wearables"
    },
    {
        id: 3,
        name: "Smart Ring",
        price: 199.99,
        description: "Titanium smart ring tracks sleep, steps, and heart rate with 7-day battery",
        image: "images/smart_ring.png",
        category: "wearables"
    },
    {
        id: 4,
        name: "VR Headset",
        price: 449.99,
        description: "Next-gen VR with 120Hz refresh rate, hand tracking, and spatial audio",
        image: "images/headphones.png",
        category: "wearables"
    },
    {
        id: 5,
        name: "Smart Glasses",
        price: 349.99,
        description: "Augmented reality glasses with heads-up display and real-time translation",
        image: "images/keyboard.png",
        category: "wearables"
    },

    // Audio Category
    {
        id: 6,
        name: "Wireless Headphones",
        price: 199.99,
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        image: "images/headphones.png",
        category: "audio"
    },
    {
        id: 7,
        name: "Gaming Headset",
        price: 129.99,
        description: "Pro gaming headset with detachable mic, 7.1 surround, and RGB effects",
        image: "images/headphones.png",
        category: "audio"
    },
    {
        id: 8,
        name: "Wireless Earbuds",
        price: 159.99,
        description: "Premium TWS earbuds with ANC, transparency mode, and 24hr battery life",
        image: "images/headphones.png",
        category: "audio"
    },
    {
        id: 9,
        name: "Studio Monitors",
        price: 399.99,
        description: "Professional studio monitor speakers with balanced sound",
        image: "images/headphones.png",
        category: "audio"
    },
    {
        id: 10,
        name: "Bluetooth Speaker",
        price: 89.99,
        description: "IPX7 waterproof speaker with bass boost, party mode, and 20hr playtime",
        image: "images/headphones.png",
        category: "audio"
    },
    {
        id: 11,
        name: "USB Microphone",
        price: 119.99,
        description: "Professional condenser microphone for streaming and podcasting",
        image: "images/mouse.png",
        category: "audio"
    },

    // Peripherals Category
    {
        id: 12,
        name: "Mechanical Keyboard",
        price: 149.99,
        description: "RGB backlit mechanical keyboard with aluminum frame and tactile switches",
        image: "images/keyboard.png",
        category: "peripherals"
    },
    {
        id: 13,
        name: "Wireless Mouse",
        price: 79.99,
        description: "Ergonomic wireless mouse with precision tracking and customizable buttons",
        image: "images/mouse.png",
        category: "peripherals"
    },
    {
        id: 14,
        name: "Gaming Mouse",
        price: 99.99,
        description: "High-DPI gaming mouse with RGB lighting and programmable buttons",
        image: "images/mouse.png",
        category: "peripherals"
    },
    {
        id: 15,
        name: "Webcam 4K",
        price: 139.99,
        description: "4K webcam with auto-focus and built-in noise-cancelling microphone",
        image: "images/smartwatch.png",
        category: "peripherals"
    },
    {
        id: 16,
        name: "Drawing Tablet",
        price: 249.99,
        description: "Professional graphics tablet with pressure-sensitive stylus",
        image: "images/keyboard.png",
        category: "peripherals"
    },
    {
        id: 17,
        name: "USB Hub",
        price: 49.99,
        description: "7-port USB 3.0 hub with individual power switches",
        image: "images/headphones.png",
        category: "peripherals"
    },
    {
        id: 18,
        name: "External SSD",
        price: 179.99,
        description: "1TB portable SSD with USB-C and blazing fast read/write speeds",
        image: "images/keyboard.png",
        category: "peripherals"
    },
    {
        id: 19,
        name: "Monitor Stand",
        price: 69.99,
        description: "Adjustable dual monitor stand with cable management",
        image: "images/mouse.png",
        category: "peripherals"
    },
    {
        id: 20,
        name: "Laptop Cooling Pad",
        price: 39.99,
        description: "RGB cooling pad with 6 fans and adjustable height",
        image: "images/smartwatch.png",
        category: "peripherals"
    }
];

// ========================================
// GLOBAL VARIABLES
// ========================================

let cart = [];
let filteredProducts = [...products]; // For search and filter

// ========================================
// DOM ELEMENTS
// ========================================

const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalAmount = document.getElementById('total-amount');
const toast = document.getElementById('toast-notification');
const checkoutBtn = document.getElementById('checkout-btn');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadTheme();
    renderProducts();
    updateCart();
    setupEventListeners();
});

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    // Cart toggle
    cartToggleBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            showToast('Checkout feature coming soon!');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', filterProducts);

    // Category filter
    categoryFilter.addEventListener('change', filterProducts);

    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Clear cart button
    clearCartBtn.addEventListener('click', clearCart);
}

// ========================================
// FILTER PRODUCTS (SEARCH + CATEGORY)
// ========================================

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderProducts();
}

// ========================================
// RENDER PRODUCTS
// ========================================

function renderProducts() {
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-light);">
                <p style="font-size: 1.25rem; font-weight: 500;">No products found</p>
                <p style="margin-top: 0.5rem;">Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', product.id);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" id="add-to-cart-${product.id}" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// ========================================
// ADD TO CART FUNCTIONALITY
// ========================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Increment quantity if product already in cart
        existingItem.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Save to localStorage
    saveCart();

    // Update cart display
    updateCart();

    // Show toast notification
    showToast(`${product.name} added to cart!`);
}

// ========================================
// UPDATE CART DISPLAY
// ========================================

function updateCart() {
    // Update cart count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Clear cart items container
    cartItems.innerHTML = '';

    // Check if cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is currently empty</p>
            </div>
        `;
        totalAmount.textContent = '$0.00';
        return;
    }

    // Render cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-item-id', item.id);

        const subtotal = item.price * item.quantity;

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
                <div class="cart-item-controls">
                    <button class="quantity-btn" id="decrease-${item.id}" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                    <span class="quantity-display" id="quantity-${item.id}">${item.quantity}</span>
                    <button class="quantity-btn" id="increase-${item.id}" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
                </div>
                <p class="cart-item-subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
                <button class="remove-btn" id="remove-${item.id}" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // Update grand total
    calculateTotal();
}

// ========================================
// UPDATE QUANTITY (+ / - BUTTONS)
// ========================================

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    // Update quantity
    item.quantity += change;

    // Remove item if quantity reaches 0
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    // Save to localStorage
    saveCart();

    // Update cart display
    updateCart();
}

// ========================================
// REMOVE FROM CART
// ========================================

function removeFromCart(productId) {
    // Filter out the item
    cart = cart.filter(item => item.id !== productId);

    // Save to localStorage
    saveCart();

    // Update cart display
    updateCart();

    // Show toast notification
    showToast('Item removed from cart');
}

// ========================================
// CALCULATE GRAND TOTAL
// ========================================

function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// ========================================
// LOCALSTORAGE - SAVE CART
// ========================================

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ========================================
// LOCALSTORAGE - LOAD CART
// ========================================

function loadCart() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            cart = [];
        }
    }
}

// ========================================
// CART SIDEBAR CONTROLS
// ========================================

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;

    toast.classList.add('show');

    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// CLEAR CART
// ========================================

function clearCart() {
    if (cart.length === 0) {
        showToast('Cart is already empty!');
        return;
    }

    // Confirmation
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCart();
        showToast('Cart cleared successfully!');
    }
}

// ========================================
// DARK/LIGHT MODE TOGGLE
// ========================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    // Toggle icon visibility
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');

    if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
        showToast('Dark mode enabled');
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
        showToast('Light mode enabled');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const moonIcon = themeToggleBtn.querySelector('.moon-icon');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Close cart when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
        closeCart();
    }
});

// Smooth scroll for footer links
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Feature coming soon!');
    });
});
