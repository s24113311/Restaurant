// --- File: checkout.js (FINAL FIX: Customer Name Saving) ---

let cartItems = []; 
const TAX_RATE = 0.08875; 

function loadCart() {
    const storedCart = localStorage.getItem('shoppingCart'); 
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

function calculateTotals() {
    if (cartItems.length === 0) {
        return { subtotal: 0, taxes: 0, total: 0 };
    }
    
    let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    return { subtotal: subtotal, taxes: taxes, total: total };
}

function updateCheckoutSummary() {
    const totals = calculateTotals();
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    
    const itemListContainer = document.getElementById('checkout-items-list');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const taxesEl = document.getElementById('checkout-taxes');
    const totalEl = document.getElementById('checkout-total');

    if (itemListContainer) {
        itemListContainer.innerHTML = '';
        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'item-summary-row flex justify-between';
                itemRow.innerHTML = `
                    <span>${item.qty} × ${item.name}</span>
                    <span>${formatCurrency(item.price * item.qty)}</span>
                `;
                itemListContainer.appendChild(itemRow);
            });
        } else {
             itemListContainer.innerHTML = '<span class="text-gray-500">Your cart is empty.</span>';
        }
    }

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    if (taxesEl) taxesEl.textContent = formatCurrency(totals.taxes);
    if (totalEl) totalEl.textContent = formatCurrency(totals.total);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to get the currently selected order type value
function getSelectedOrderType() {
    const radioButtons = document.getElementsByName('orderType');
    let selectedValue = 'pickup'; // Default to pickup
    
    for (const radio of radioButtons) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    return selectedValue;
}

// -------------------------------------------------------------------
// 🔥 MAIN EXECUTION AND CONNECTION LOGIC (FIXED) 🔥
// -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    loadCart(); 
    updateCheckoutSummary(); 

    // Select button and form elements
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddress');
    const phoneInput = document.getElementById('phoneNumber');
    const proceedButton = document.querySelector('.proceed-button'); 

    const highlightError = (input, condition) => {
        if (condition) {
            input.classList.add('border-red-500', 'ring-2', 'ring-red-500'); 
        } else {
            input.classList.remove('border-red-500', 'ring-2', 'ring-red-500');
        }
    };
    
    if (proceedButton) {
        proceedButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            let validationPassed = true; 

            // --- Validation Checks ---
            const isNameEmpty = fullNameInput ? fullNameInput.value.trim() === '' : false;
            const isEmailEmpty = emailInput ? emailInput.value.trim() === '' : false;
            const isPhoneEmpty = phoneInput ? phoneInput.value.trim() === '' : false;
            const isEmailInvalid = !isEmailEmpty && emailInput && !validateEmail(emailInput.value.trim()); 
            
            // Apply error styling and check validity
            if (fullNameInput) { 
                if (isNameEmpty) { 
                    highlightError(fullNameInput, true); 
                    validationPassed = false; 
                } else { 
                    highlightError(fullNameInput, false); 
                } 
            }
            // ... (Other validation checks remain here) ...

            if (emailInput) { if (isEmailEmpty || isEmailInvalid) { highlightError(emailInput, true); validationPassed = false; } else { highlightError(emailInput, false); } }
            if (phoneInput) { if (isPhoneEmpty) { highlightError(phoneInput, true); validationPassed = false; } else { highlightError(phoneInput, false); } }

            // Cart check
            if (cartItems.length === 0) {
                // Use a modal or custom message box instead of alert()
                console.error('Your cart is empty. Please add items before checking out.');
                return; 
            }
            
            // --- Final Action ---
            if (!validationPassed) {
                // Use a modal or custom message box instead of alert()
                console.error('Please correct the highlighted fields before proceeding.');
                return; // Stop if validation failed
            } 
            
            // *************************************************************
            // 🎉 CRITICAL FIX: SAVES CUSTOMER NAME BEFORE REDIRECT 🎉
            // This runs ONLY if validation passes and the button is clicked!
            // *************************************************************
            const nameToSave = fullNameInput ? fullNameInput.value.trim() : 'Guest';
            localStorage.setItem('customerName', nameToSave); // Save the name

            // Save the complete order data object for the confirmation page
            const selectedOrderType = getSelectedOrderType();
            const orderData = {
                 cart: cartItems, 
                 orderType: selectedOrderType,
             };
            localStorage.setItem('finalOrderData', JSON.stringify(orderData)); 
            
            // Redirects to the Order Confirmation Page
            window.location.href = 'orderConfirmation.html';
        });
    }

    // Optional: Add listeners to the label boxes (if they aren't working automatically)
    document.getElementById('pickupOption')?.addEventListener('click', () => {
        document.getElementById('pickupOption').querySelector('input').checked = true;
    });
    document.getElementById('deliveryOption')?.addEventListener('click', () => {
        document.getElementById('deliveryOption').querySelector('input').checked = true;
    });
});


const nameToSave = fullNameInput ? fullNameInput.value.trim() : 'Guest';
localStorage.setItem('customerName', nameToSave);
