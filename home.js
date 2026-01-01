// File: home.js

// --- 1. Global State Management and Persistence ---
let cartItems = []; // CRITICAL: The array holding the actual cart data
let totalItems = 0; // Simple counter for the item added alert (can be removed later)
const TAX_RATE = 0.08875;

function saveCart() {
    // Saves the current state of cartItems to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

function loadCart() {
    // Loads cart state from localStorage on page load
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

function calculateAllTotals() {
    let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    return { 
        subtotal: subtotal, 
        taxes: taxes, 
        total: total 
    };
}

// --- 2. Main DOMContentLoaded Execution Block ---
document.addEventListener('DOMContentLoaded', function() {
    // --- 2a. Initial Setup & Element Selection ---
    loadCart(); // Load any saved cart data immediately

    const cartIcon = document.querySelector('.cart-icon'); 
    const addButtons = document.querySelectorAll('.add-to-order-btn'); 
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartFooter = document.getElementById('cart-footer');
    const itemAlert = document.getElementById('item-added-alert');
    const messageSpan = itemAlert.querySelector('.alert-message');

    // --- 2b. Cart Rendering Function (The heart of the cart) ---

    function renderCart() {
        const totals = calculateAllTotals();
        const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

        // Handle Empty State
        if (cartItems.length === 0) {
            cartEmptyState.classList.remove('hidden');
            cartItemsList.classList.add('hidden');
            cartFooter.classList.add('hidden');
            localStorage.removeItem('shoppingCart'); // Clear storage if empty
            return;
        }

        // Handle Filled State
        cartEmptyState.classList.add('hidden');
        cartItemsList.classList.remove('hidden');
        cartFooter.classList.remove('hidden');

        // Render items list
        cartItemsList.innerHTML = ''; 
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.setAttribute('data-index', index);
            
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="item-img">
                <div class="item-details-main">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price-current">${formatCurrency(item.price * item.qty)}</span>
                </div>
                <div class="item-controls-wrapper">
                    <div class="item-controls">
                        <button class="qty-btn decrement-btn" data-action="decrement" ${item.qty === 1 ? 'disabled' : ''}>-</button>
                        <span class="item-qty">${item.qty}</span>
                        <button class="qty-btn increment-btn" data-action="increment">+</button>
                        <button class="item-remove-btn" data-action="remove">×</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(li);
        });

        // Update totals in the footer (These IDs match your HTML)
        document.getElementById('subtotal-price').textContent = formatCurrency(totals.subtotal);
        document.getElementById('taxes-price-sidebar').textContent = formatCurrency(totals.taxes);
        document.getElementById('total-price').textContent = formatCurrency(totals.total);
        
        // CRITICAL: Save the cart after successfully rendering the new state
        saveCart();
    }
    
    // --- 2c. Cart Modification and Alert Functions ---

    function addItemToCart(itemName, itemPrice, itemImage) {
        const existingItem = cartItems.find(item => item.name === itemName);
        
        if (existingItem) {
            existingItem.qty++;
        } else {
            // Price must be stored as a number for calculations
            cartItems.push({ name: itemName, price: parseFloat(itemPrice), qty: 1, img: itemImage });
        }
        renderCart();
        showItemAlert(itemName);
    }

    function showItemAlert(itemName) {
        const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
        messageSpan.textContent = `Added "${itemName}"! Total items: ${totalItemsCount}`;
        itemAlert.classList.remove('hidden');
        setTimeout(window.hideItemAlert, 4000); 
    }
    
    // Make hideItemAlert globally accessible for the button in HTML
    window.hideItemAlert = function() {
        itemAlert.classList.add('hidden');
    }

    // --- 2d. Event Listeners ---
    
    // Listener for "Add to Order" buttons (on the menu cards)
    addButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            const foodCard = button.closest('.food-card');
            const itemName = foodCard.querySelector('.item-name')?.textContent.trim() || 'New Item';
            // Extract the price, ensuring it's a number
            const priceText = foodCard.querySelector('.price')?.textContent.replace('$', '') || '1.00';
            const itemPrice = parseFloat(priceText);
            const itemImage = foodCard.querySelector('img')?.src || 'images/chiken.png';

            addItemToCart(itemName, itemPrice, itemImage);
        });
    });

    // Cart Sidebar Open/Close Logic
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            renderCart(); // Re-render every time it opens to ensure freshness
        });
    }
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    // Close on overlay click
    if (cartOverlay) cartOverlay.addEventListener('click', function(event) {
        if (event.target === cartOverlay) {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Quantity and Remove Controls (Delegation)
    cartItemsList.addEventListener('click', function(e) {
        const btn = e.target.closest('.qty-btn, .item-remove-btn');
        if (!btn) return;

        const li = btn.closest('.cart-item');
        const index = parseInt(li.getAttribute('data-index'));
        const action = btn.getAttribute('data-action');
        
        if (!cartItems[index]) return;

        if (action === 'increment') {
            cartItems[index].qty++;
        } else if (action === 'decrement' && cartItems[index].qty > 1) {
            cartItems[index].qty--;
        } else if (action === 'remove') {
            cartItems.splice(index, 1);
        }
        
        renderCart();
    });

    // --- 2e. Non-Cart Specific Listeners ---
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section'); 
    const heroHeight = heroSection ? heroSection.offsetHeight : 100;
    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Hero Slider
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider-image');
    let currentImageIndex = 0;

    function nextImage() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0; 
        }
        const newPosition = -currentImageIndex * 100;
        slider.style.transform = `translateX(${newPosition}%)`;
    }
    setInterval(nextImage, 3000);

    // Initial load: Render the cart once when the page loads
    renderCart(); 
});
