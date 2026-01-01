document.addEventListener('DOMContentLoaded', () => {
    // This function handles the active state for tab buttons
    function setupTabs(tabContainerClass) {
        const tabContainer = document.querySelector(tabContainerClass);
        if (tabContainer) {
            const tabs = tabContainer.querySelectorAll('.tab-button');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove 'active' class from all tabs in the container
                    tabs.forEach(t => t.classList.remove('active'));
                    // Add 'active' class to the clicked tab
                    tab.classList.add('active');
                });
            });
        }
    }

    // Initialize the main category tabs
    setupTabs('.category-tabs');

    // Initialize the subcategory tabs
    setupTabs('.subcategory-tabs');
    
    // You can add more JavaScript functionality here,
    // for example, handling the "Add to Order" button clicks
    const addToOrderButtons = document.querySelectorAll('.add-to-order');
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Item added to your order!');
            // In a real application, you'd add the item to a shopping cart object
            // and update the cart display.
        });
    });

    // Example of a simple hover effect for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.02)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
        });
    });
});


// --- 1. DATA: Use the comprehensive Chinese menu structure ---
//example when i add image { id: "S01", name: "A-1 (雞米花 + 飲料)", desc: "Popcorn Chicken Set with Drink", price: 75, rating: 4.5, image: "images/S01.png" }

const menuData = {
    friedFoodsSet: [
        { id: "S01", name: "A-1 (雞米花 + 飲料)", desc: "Popcorn Chicken Set with Drink", price: 75, rating: 4.5 },
        { id: "S02", name: "A-2 (雞塊 + 飲料)", desc: "Chicken Nuggets Set with Drink", price: 75, rating: 4.4 },
        { id: "S03", name: "B (炸雞腿 + 飲料)", desc: "Fried Drumstick Set with Drink", price: 90, rating: 4.6 },
        { id: "S04", name: "C-1 (雞腿 + 雞米花 + 飲料)", desc: "Drumstick & Popcorn Chicken Set", price: 95, rating: 4.7 },
        { id: "S05", name: "C-2 (雞腿 + 雞塊 + 飲料)", desc: "Drumstick & Nuggets Set", price: 95, rating: 4.7 },
        { id: "S06", name: "D (全餐)", desc: "Ultimate Combo Set", price: 115, rating: 4.8 },
        { id: "S07", name: "全餐 Combo", desc: "Popcorn Chicken & Nuggets Combo", price: 125, rating: 4.9 }
    ],
    alacarte: [
        { id: "A01", name: "雞米花 Popcorn Chicken", desc: "Crispy fried popcorn chicken.", price: 70, rating: 4.5 },
        { id: "A02", name: "雞塊 Chicken Nugget", desc: "Classic fried chicken nuggets.", price: 70, rating: 4.3 },
        { id: "A03", name: "薯條 Fries", desc: "Golden salted french fries.", price: 70, rating: 4.2 },
        { id: "A04", name: "雞排 Chicken Patty", desc: "Large fried chicken patty.", price: 100, rating: 4.8 },
        { id: "A05", name: "炸豬排 Deep-fried Pork Chop", desc: "Savory deep-fried pork chop.", price: 50, rating: 4.6 },
        { id: "A06", name: "水餃 Dumplings", desc: "Boiled dumplings (5 pcs).", price: 50, rating: 4.1 },
        { id: "A07", name: "白飯 Rice", desc: "A bowl of steamed white rice.", price: 15, rating: 3.5 }
    ],
    chineseOmelet: [
        { id: "O01", name: "原味 Original", desc: "Classic plain Chinese-style omelet.", price: 40, rating: 4.0 },
        { id: "O02", name: "雙蛋 Double Egg", desc: "Omelet with two eggs.", price: 45, rating: 4.1 },
        { id: "O03", name: "火腿 Ham", desc: "Omelet with sliced ham.", price: 50, rating: 4.2 },
        { id: "O04", name: "培根 Bacon", desc: "Omelet with crispy bacon.", price: 50, rating: 4.3 },
        { id: "O05", name: "起司 Cheese", desc: "Omelet with melted cheese.", price: 50, rating: 4.5 },
        { id: "O06", name: "肉鬆 Pork Floss", desc: "Omelet with sweet pork floss.", price: 50, rating: 4.3 },
        { id: "O07", name: "玉米 Corn", desc: "Omelet with corn kernels.", price: 50, rating: 4.2 },
        { id: "O08", name: "鮪魚 Tuna", desc: "Omelet with tuna filling.", price: 60, rating: 4.4 },
        { id: "O09", name: "起司條 Cheese Strings", desc: "Omelet with cheese sticks inside.", price: 60, rating: 4.4 },
        { id: "O10", name: "豬排 Pork Chop", desc: "Omelet with fried pork chop.", price: 70, rating: 4.6 },
        { id: "O11", name: "卡啦雞腿排 Spicy Chicken Thigh", desc: "Omelet with crispy spicy chicken thigh.", price: 80, rating: 4.7 }
    ],
    sandwich: [
        { id: "W01", name: "沙拉+蛋 Salad+Egg", desc: "Sandwich with salad and egg.", price: 40, rating: 4.0 },
        { id: "W02", name: "培根+蛋 Bacon+Egg", desc: "Sandwich with bacon and fried egg.", price: 50, rating: 4.3 },
        { id: "W03", name: "火腿+蛋 Ham+Egg", desc: "Sandwich with ham and fried egg.", price: 50, rating: 4.3 },
        { id: "W04", name: "肉鬆+蛋 Pork Floss+Egg", desc: "Sandwich with pork floss and egg.", price: 50, rating: 4.2 },
        { id: "W05", name: "起司+蛋 Cheese+Egg", desc: "Sandwich with melted cheese and egg.", price: 50, rating: 4.4 },
        { id: "W06", name: "炸豬排+蛋 Fried Pork Chop+Egg", desc: "Sandwich with fried pork chop and egg.", price: 60, rating: 4.5 },
        { id: "W07", name: "卡啦雞腿排+蛋 Spicy Chicken Thigh+Egg", desc: "Sandwich with spicy fried chicken thigh and egg.", price: 80, rating: 4.7 }
    ],
    toast: [
        { id: "T01", name: "奶油 Butter", desc: "Toast with spread butter.", price: 40, rating: 4.0, thick: 45 },
        { id: "T02", name: "巧克力 Chocolate", desc: "Toast with chocolate spread.", price: 40, rating: 4.1, thick: 45 },
        { id: "T03", name: "花生 Peanut Butter", desc: "Toast with peanut butter spread.", price: 40, rating: 4.2, thick: 45 },
        { id: "T04", name: "舒芙蕾 Soufflé", desc: "Sweet fluffy soufflé toast.", price: 40, rating: 4.4, thick: 45 }
    ],
    panFriedNoodles: [
        { id: "N01", name: "蛋＋麵 Noodles+Egg", desc: "Plain pan-fried noodles with an egg.", price: 60, rating: 4.2, options: ["Mushroom", "Black Pepper"] },
        { id: "N02", name: "雞肉炒麵 Chicken Noodles", desc: "Pan-fried noodles with chicken.", price: 90, rating: 4.4, options: ["Mushroom", "Black Pepper"] },
        { id: "N03", name: "豬排炒麵 Pork Chop Noodles", desc: "Pan-fried noodles with pork chop.", price: 90, rating: 4.5, options: ["Mushroom", "Black Pepper"] },
        { id: "N04", name: "炸雞排炒麵 Deep-fried Pork Chop Noodles", desc: "Pan-fried noodles with deep-fried pork chop.", price: 90, rating: 4.5, options: ["Mushroom", "Black Pepper"] },
        { id: "N05", name: "卡啦雞腿排炒麵 Spicy Chicken Thigh Noodles", desc: "Pan-fried noodles with spicy chicken thigh.", price: 100, rating: 4.7, options: ["Mushroom", "Black Pepper"] },
        { id: "N06", name: "培根豬肉炒麵 Bacon Pork Noodles", desc: "Pan-fried noodles with bacon and pork.", price: 100, rating: 4.6, options: ["Mushroom", "Black Pepper"] }
    ],
    rice: [
        { id: "R01", name: "飯+蛋 Rice+Egg", desc: "Steamed rice served with egg.", price: 60, rating: 4.1 },
        { id: "R02", name: "雞肉飯 Rice with Chicken", desc: "Rice with chicken served with a free small black tea.", price: 90, rating: 4.5 },
        { id: "R03", name: "炸豬排飯 Fried Pork Chop Rice", desc: "Rice with deep-fried pork chop.", price: 90, rating: 4.5 },
        { id: "R04", name: "卡啦雞腿飯 Spicy Chicken Thigh Rice", desc: "Rice with spicy fried chicken thigh.", price: 100, rating: 4.7 },
        { id: "R05", name: "雙拼飯 Two-Patty Rice", desc: "Double meat combo rice meal.", price: 130, rating: 4.8 },
        { id: "R06", name: "雞排拼雙層飯 Chicken Patty Rice", desc: "Rice with chicken patty combo.", price: 145, rating: 4.8 }
    ],
    gratin: [
        { id: "G01", name: "火腿 Ham Gratin", desc: "Baked ham and cheese gratin.", price: 110, rating: 4.3 },
        { id: "G02", name: "培根 Bacon Gratin", desc: "Baked bacon and cheese gratin.", price: 110, rating: 4.4 },
        { id: "G03", name: "鮪魚 Tuna Gratin", desc: "Baked tuna and cheese gratin.", price: 120, rating: 4.5 },
        { id: "G04", name: "豬肉 Pork Gratin", desc: "Baked pork and cheese gratin.", price: 120, rating: 4.4 }
    ],
    gratinToast: [
        { id: "GT01", name: "奶油 Butter Gratin Toast", desc: "Butter gratin served on toast.", price: 45, rating: 4.1, thick: 60 },
        { id: "GT02", name: "花生 Peanut Butter Gratin Toast", desc: "Peanut butter gratin on toast.", price: 45, rating: 4.2, thick: 60 },
        { id: "GT03", name: "火腿 Ham Gratin Toast", desc: "Ham gratin served on thick toast.", price: 70, rating: 4.4, thin: 60, thick: 70 },
        { id: "GT04", name: "培根 Bacon Gratin Toast", desc: "Bacon gratin served on thick toast.", price: 70, rating: 4.4, thin: 60, thick: 70 },
        { id: "GT05", name: "玉米 Corn Gratin Toast", desc: "Corn and cheese gratin toast.", price: 80, rating: 4.5, thin: 70, thick: 80 },
        { id: "GT06", name: "鮪魚 Tuna Gratin Toast", desc: "Tuna gratin served on thick toast.", price: 90, rating: 4.6, thin: 80, thick: 90 }
    ],
    drinks: [
        { id: "D01", name: "Black Tea (紅茶)", desc: "Classic black tea.", price: 30, rating: 4.2, M: 25 },
        { id: "D02", name: "Green Tea (綠茶)", desc: "Refreshing green tea.", price: 30, rating: 4.2, M: 25 },
        { id: "D03", name: "White Gourd Tea (冬瓜茶)", desc: "Sweet white gourd tea.", price: 30, rating: 4.3, M: 25 },
        { id: "D04", name: "White Gourd Black Tea (冬瓜紅茶)", desc: "White gourd mixed with black tea.", price: 35, rating: 4.4, M: 30 },
        { id: "D05", name: "Plum Iced Tea (梅子紅茶)", desc: "Sweet-sour plum black tea.", price: 35, rating: 4.3, M: 30 },
        { id: "D06", name: "Milk Tea (奶茶)", desc: "Creamy milk tea.", price: 45, rating: 4.5, M: 40 },
        { id: "D07", name: "Milk Green Tea (奶綠)", desc: "Creamy milk green tea.", price: 45, rating: 4.5, M: 40 },
        { id: "D08", name: "Lemon Red Tea (檸檬紅茶)", desc: "Zesty lemon black tea.", price: 45, rating: 4.4, M: 40 },
        { id: "D09", name: "Lemon Green Tea (檸檬綠茶)", desc: "Refreshing lemon green tea.", price: 45, rating: 4.4, M: 40 },
        { id: "D10", name: "Fresh Milk Tea (鮮奶茶)", desc: "Tea mixed with fresh milk.", price: 55, rating: 4.7, M: 45 },
        { id: "D11", name: "White Gourd Milk Tea (冬瓜鮮奶茶)", desc: "Sweet white gourd with milk.", price: 55, rating: 4.6, M: 45 },
        { id: "SD01", name: "Boba Milk Tea (珍珠奶茶)", desc: "Milk tea with chewy boba pearls.", price: 55, rating: 4.8, M: 45 },
        { id: "SD02", name: "Boba Milk Green Tea (珍珠奶綠)", desc: "Green milk tea with boba pearls.", price: 55, rating: 4.8, M: 45 },
        { id: "SD03", name: "Boba Fresh Milk Tea (珍珠鮮奶茶)", desc: "Fresh milk tea with boba pearls.", price: 55, rating: 4.8, M: 45 },
        { id: "SD04", name: "Coconut Jelly Milk Tea (椰果奶茶)", desc: "Milk tea with coconut jelly.", price: 55, rating: 4.7, M: 45 },
        { id: "SD05", name: "Yakult Green Tea (養樂多綠茶)", desc: "Green tea with Yakult yogurt.", price: 55, rating: 4.6, M: 45 },
        { id: "SD06", name: "Ovaltine (阿華田)", desc: "Classic malt chocolate drink.", price: 55, rating: 4.6, M: 45 },
        { id: "SD07", name: "Ice Coffee (冰咖啡)", desc: "Chilled black coffee.", price: 55, rating: 4.5, M: 45 },
        { id: "SD08", name: "Boba Milk (珍珠鮮奶)", desc: "Fresh milk with boba pearls.", price: 70, rating: 4.8, M: 60 },
        { id: "SD09", name: "Coconut Jelly + Milk (椰果鮮奶)", desc: "Fresh milk with coconut jelly.", price: 80, rating: 4.8, M: 70 }
    ]
};

// --- 2. GLOBAL STATE & DOM ELEMENTS ---
const cart = []; 
const menuContainer = document.getElementById('menu-items-container');
const tabButtons = document.querySelectorAll('.tab-button');
const notificationElement = document.getElementById('cart-notification');

// --- 3. CORE FUNCTIONS ---

/**
 * Creates the star rating HTML based on a numeric rating.
 */
function generateRatingHtml(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

/**
 * Displays a custom, animated notification banner (toast).
 */
function showNotification(message) {
    if (!notificationElement) return;

    // Set the content
    notificationElement.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
    
    // Show the notification
    notificationElement.classList.add('show');

    // Automatically hide it after 3 seconds
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 3000);
}

/**
 * Renders the menu items for a specific category key.
 */
function renderMenuItems(categoryKey) {
    // Look up the array of items for the given category key
    const items = menuData[categoryKey] || [];
    if (!menuContainer) return; 
    
    menuContainer.innerHTML = ''; // Clear the current items

    if (items.length === 0) {
        menuContainer.innerHTML = '<p class="text-center text-xl text-gray-500 col-span-full py-10">No dishes found in this category.</p>';
        return;
    }

    items.forEach(item => {
        const ratingHtml = generateRatingHtml(item.rating);
        
        // This is a placeholder image URL as the Chinese data didn't have images
        // In a real app, you would define image paths in the menuData object
        const placeholderImgUrl = 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=200&h=160&fit=crop';
        
        // Get the main price. If it's an object (for different sizes/options), display the lowest or range.
        let displayPrice;
        if (typeof item.price === 'object') {
            displayPrice = Object.values(item.price).sort((a, b) => a - b)[0];
            // displayPrice = `$${displayPrice} – $${Object.values(item.price).pop()}`; // Could show a range
            displayPrice = `$${displayPrice}`;
        } else {
             displayPrice = `$${item.price}`;
        }

        // Template for a single menu item card
        const itemHtml = `
            <div class="menu-item bg-white shadow-lg rounded-xl flex flex-col overflow-hidden">
                <img src="${item.img || placeholderImgUrl}" alt="${item.name}" class="w-full h-40 object-cover">
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg font-bold mb-1">${item.name}</h3>
                    <p class="text-sm text-gray-600 mb-2 flex-grow">${item.desc}</p>
                    
                    <div class="item-rating text-yellow-500 mb-3">
                        ${ratingHtml}
                        <span class="text-gray-600 text-sm ml-1">(${item.rating.toFixed(1)}/5)</span>
                    </div>
                    
                    <div class="flex justify-between items-center mt-auto">
                        <span class="price font-extrabold text-xl text-red-500">${displayPrice}</span>
                        <button 
                            class="add-to-order bg-red-500 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-red-600 transition duration-150 shadow-md"
                            data-item-name="${item.name}"
                            data-category-key="${categoryKey}"
                        >
                            Add to Order
                        </button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
}

/**
 * Adds an item to the global cart array and updates the notification.
 */
function addToCart(item) {
    cart.push(item);
    // You would typically call a function here to update a cart counter element in the header
    
    const message = `Added "${item.name}"! Total items: ${cart.length}`;
    showNotification(message); 
    
    console.log("Current Cart:", cart); 
}

/**
 * Handles the click event on a category button and updates the menu.
 */
function handleTabClick(event) {
    const clickedButton = event.currentTarget;
    
    // 1. Update active button state (removes 'active' from all, adds to clicked)
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    clickedButton.classList.add('active');

    // 2. Get category key from data attribute and render foods
    const category = clickedButton.getAttribute('data-category');
    renderMenuItems(category);
}


// --- 4. INITIALIZATION & EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // **A. Tab and Rendering Setup**
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });

    // Determine initial active category from the HTML
    const initialCategoryButton = document.querySelector('.tab-button.active');
    const initialCategory = initialCategoryButton 
        ? initialCategoryButton.getAttribute('data-category') 
        : 'alacarte'; // Default to 'alacarte' if none is active
        
    // Load the initial category
    renderMenuItems(initialCategory);
    
    // **B. "Add to Order" Click Handler (Event Delegation)**
    // This handler finds the correct item object and calls the addToCart function.
    document.addEventListener('click', (event) => {
        const button = event.target.closest('.add-to-order'); // Use closest for robustness
        
        if (button) {
            const itemName = button.getAttribute('data-item-name');
            const categoryKey = button.getAttribute('data-category-key');
            
            // Find the item object in the data structure
            const item = menuData[categoryKey].find(i => i.name === itemName);
            
            if (item) {
                // IMPORTANT: When adding to cart, create a copy of the object 
                // to prevent unintended modifications later.
                addToCart({...item, category: categoryKey}); 
            }
        }
    });
    
    // **C. Menu Item Hover Effect (CSS is generally better, but keeping JS implementation)**
    // Re-attach hover listeners after items are rendered (or use CSS)
    // NOTE: This will only apply to the *initial* items. You'll need to re-run
    // this on every 'renderMenuItems' call or use CSS for dynamic content.
    // For now, let's use CSS for better performance, as JS event listeners 
    // are less efficient when constantly replaced.
});

// For better performance, define hover/scaling effects directly in CSS
// For example:
/* .menu-item:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
} 
*/