// --- File: orderConfirmation.js (FINALIZED for Customer Name) ---

const TAX_RATE = 0.08875;
let cartItems = []; 
let orderType = 'Pickup'; 
const deliveryTime = '30-45 mins';
const pickupTime = '15-25 mins';

// Global variables
let orderID = '';
// 1. Global variable for the Customer Name, default to 'Guest'
let customerName = 'Guest'; 

// Function to generate a unique Order ID
function generateOrderID() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// --- Data Loading and Calculation (REVISED to load name) ---
function loadAndCalculate() {
    const storedData = localStorage.getItem('finalOrderData');
    
    // 2. Load the Customer Name from localStorage
    const storedName = localStorage.getItem('customerName'); 
    if (storedName) {
        customerName = storedName;
    }
    
    if (storedData) {
        try {
            const orderData = JSON.parse(storedData);
            cartItems = orderData.cart || []; 
            orderType = orderData.orderType || 'Pickup';
        } catch (e) {
            console.error("Error parsing final order data:", e);
            cartItems = [];
        }
    }

    let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    return { subtotal, taxes, total };
}

// --- DOM Rendering (REVISED to display name) ---
function renderOrderConfirmation(totals) {
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    
    // Target elements
    const itemsContainer = document.getElementById('confirmation-items-container'); 
    const subtotalEl = document.getElementById('confirmation-subtotal');
    const taxesEl = document.getElementById('confirmation-taxes');
    const totalEl = document.getElementById('confirmation-total');
    
    const orderIDEl = document.getElementById('confirmation-order-id');
    const orderTypeEl = document.getElementById('confirmation-order-type');
    const timeDisplayEl = document.getElementById('order-time-display');
    
    // 3. Target the Customer Name display element 
    const nameDisplayEl = document.getElementById('customer-name-display'); 

    // 4. Display the Customer Name 
    if (nameDisplayEl) {
        // If the stored name is empty/null, it defaults to 'Guest'
        nameDisplayEl.textContent = customerName;
    }
    
    // Display the newly generated Order ID
    if (orderIDEl) {
        orderIDEl.textContent = `(ID: #${orderID})`;
    }

    // 1. Render Line Items 
    if (itemsContainer) {
        itemsContainer.innerHTML = '';
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const totalItemPrice = item.price * item.qty;
                const itemRow = document.createElement('div');
                itemRow.className = 'flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0';
                
                itemRow.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="${item.img || 'https://placehold.co/80x80/E2E8F0/000000?text=Item'}" 
                             alt="${item.name}" 
                             class="w-16 h-16 rounded-md object-cover">
                        <div>
                            <p class="font-medium text-lg">${item.name}</p>
                            <p class="text-sm text-gray-500">Qty: ${item.qty}</p>
                        </div>
                    </div>
                    <span class="font-medium text-lg">${formatCurrency(totalItemPrice)}</span>
                `;
                itemsContainer.appendChild(itemRow);
            });
        } else {
             itemsContainer.innerHTML = '<p class="text-center text-gray-500 py-4">No items found for this order.</p>';
        }
    }

    // 2. Update Totals
    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (taxesEl) taxesEl.textContent = formatCurrency(totals.taxes);
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);
    
    // 3. Update Order Type and Estimated Time
    if (orderTypeEl && timeDisplayEl) {
        orderTypeEl.textContent = orderType; 
        
        if (orderType === 'delivery') {
            timeDisplayEl.textContent = deliveryTime;
            orderTypeEl.classList.remove('text-gray-800', 'font-medium');
            orderTypeEl.classList.add('text-red-500', 'font-bold'); 

        } else { // 'pickup'
            timeDisplayEl.textContent = pickupTime;
            orderTypeEl.classList.remove('text-red-500', 'font-bold');
            orderTypeEl.classList.add('text-gray-800', 'font-medium');
        }
    }
    
    // 4. Clear the cart data (Order is complete)
    localStorage.removeItem('finalOrderData'); 
    localStorage.removeItem('shoppingCart'); 
    // 5. Clear the stored name once the order is confirmed
    localStorage.removeItem('customerName'); 
}

// --- Execution ---
document.addEventListener("DOMContentLoaded", function () {
    orderID = generateOrderID(); 
    const totals = loadAndCalculate();
    renderOrderConfirmation(totals);
    
    const backBtn = document.getElementById('checkoutBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; 
        });
    }
});


