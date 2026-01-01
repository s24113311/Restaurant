document.addEventListener('DOMContentLoaded', function() {
    // --- Element Selectors ---
    const orderListContainer = document.querySelector('.order-list');
    const orderDetailsCard = document.querySelector('.order-details');
    const updateButton = document.querySelector('.action-update');
    const statusFilterButtons = document.querySelectorAll('.status-filter');
    const searchInput = document.querySelector('.filter-search input[type="text"]');
    const typeFilterSelect = document.querySelector('.filter-type select');
    const cancelButton = document.querySelector('.action-cancel');
    const printButton = document.querySelector('.action-print');
    
    // --- 1. Order Data Simulation ---
    // This is the source of truth for all order data.
    const ALL_ORDERS = {
        'LBA1006': {
            id: 'LBA1006', status: 'Pending', type: 'Pickup',
            customer: { name: 'Emily Brown', contact: '(555) 555-3333', address: 'N/A' },
            items: [{ name: '1x General Tso', price: 16.00 }],
            totals: { subtotal: 16.00, tax: 1.42, total: 17.42, payment: 'Credit Card' },
        },
        'LBA1005': {
            id: 'LBA1005', status: 'Pending', type: 'Delivery',
            customer: { name: 'David Lee', contact: '(555) 555-2222', address: '22 Elm St, NY 10002' },
            items: [{ name: '4x Chicken Skewers', price: 18.00 }],
            totals: { subtotal: 18.00, tax: 1.60, total: 19.60, payment: 'Credit Card' },
        },
        'LBA1004': {
            id: 'LBA1004', status: 'Pending', type: 'Delivery',
            customer: { name: 'Jenny Chen', contact: '(555) 555-1234', address: '45 Park Ave, NY 10016' },
            items: [{ name: '2x Pork & Chive Dumplings', price: 25.98 }, { name: '1x Hot & Sour Soup', price: 6.00 }],
            totals: { subtotal: 31.98, tax: 2.84, total: 34.82, payment: 'Cash on Delivery' },
        },
        'LBA1003': {
            id: 'LBA1003', status: 'Preparing', type: 'Pickup',
            customer: { name: 'Michael S.', contact: '(555) 555-5678', address: 'N/A' },
            items: [{ name: '3x Vegan Noodle Bowls', price: 45.00 }],
            totals: { subtotal: 45.00, tax: 3.99, total: 48.99, payment: 'Credit Card' },
        },
        'LBA1002': {
            id: 'LBA1002', status: 'Ready', type: 'Pickup',
            customer: { name: 'Sarah W.', contact: '(555) 555-9012', address: 'N/A' },
            items: [{ name: '1x Beef Rice Plate', price: 15.00 }],
            totals: { subtotal: 15.00, tax: 1.33, total: 16.33, payment: 'Credit Card' },
        },
        'LBA1001': {
            id: 'LBA1001', status: 'Completed', type: 'Delivery',
            customer: { name: 'John A.', contact: '(555) 555-0000', address: '10 Main St, NY 10001' },
            items: [{ name: '5x Spring Rolls', price: 10.00 }],
            totals: { subtotal: 10.00, tax: 0.89, total: 10.89, payment: 'Completed (Online)' },
        },
    };

    // Defines the order of status progression
    const STATUS_MAP = {
        'Pending': 'Preparing',
        'Preparing': 'Ready',
        'Ready': 'Completed',
        'Completed': 'Completed',
        'Canceled': 'Canceled'
    };

    let currentOrderID = 'LBA1004'; // Default selected order
    let activeFilterStatus = 'All';
    let activeFilterType = 'All'; // Should be 'All' by default for both Pickup and Delivery

    // --- Utility Functions ---

    function getOrdersArray(data) {
        // Sort by ID descending (most recent first)
        return Object.values(data).sort((a, b) => b.id.localeCompare(a.id));
    }

    function calculateStatusCounts(orders) {
        const counts = { All: orders.length, Pending: 0, Preparing: 0, Ready: 0, Completed: 0, Canceled: 0 };
        orders.forEach(order => {
            counts[order.status] = (counts[order.status] || 0) + 1;
        });
        return counts;
    }

    // --- Core Rendering & Filtering ---

    /** Renders the list of order rows and updates filter counts. */
    function renderOrderList(orders) {
        // Clear previous rows (but keep the header)
        document.querySelectorAll('.order-row').forEach(row => row.remove());

        const fragment = document.createDocumentFragment();

        orders.forEach(order => {
            const row = document.createElement('div');
            // 'selected' class highlights the currently viewed order
            row.className = `order-row ${order.id === currentOrderID ? 'selected' : ''}`;
            row.dataset.id = order.id;

            // Custom text for 'Ready' pickup orders
            const statusText = order.status === 'Ready' && order.type === 'Pickup' ? 'Ready for Pickup' : order.status;

            row.innerHTML = `
                <div class="order-info">
                    <p class="order-id">#${order.id}</p>
                    <p class="order-customer">${order.customer.name} (${order.type})</p>
                </div>
                <span class="status-tag status-${order.status.replace(/ /g, '_')}">${statusText}</span>
            `;
            fragment.appendChild(row);
        });

        orderListContainer.appendChild(fragment);
        orderListContainer.querySelector('h3').textContent = `Recent Orders (${orders.length}) (Click to View Details)`;

        // Update counts on filter buttons using the master list totals
        const counts = calculateStatusCounts(getOrdersArray(ALL_ORDERS));
        statusFilterButtons.forEach(button => {
            const status = button.dataset.status;
            const count = counts[status] || 0;
            button.textContent = `${status} (${count})`;
        });
    }

    /** Renders the detailed view of a specific order. */
    function renderOrderDetails(orderId) {
        const order = ALL_ORDERS[orderId];
        
        // Handle no selection or filtered-out selection
        if (!order) {
            orderDetailsCard.querySelector('h2').textContent = 'No Order Selected';
            // Hide action buttons when no order is selected
            updateButton.style.display = 'none';
            cancelButton.style.display = 'none';
            printButton.style.display = 'none';
            return;
        }

        currentOrderID = orderId;

        // Highlight the currently selected row
        document.querySelectorAll('.order-row').forEach(row => row.classList.remove('selected'));
        const currentRow = document.querySelector(`.order-row[data-id="${orderId}"]`);
        if (currentRow) currentRow.classList.add('selected');

        const statusDisplay = order.status === 'Ready' && order.type === 'Pickup' ? 'Ready for Pickup' : order.status;

        // Update Header and Status Tag
        orderDetailsCard.querySelector('h2').textContent = `Order #${orderId} Details`;
        const topStatusTag = orderDetailsCard.querySelector('.order-status-top');
        topStatusTag.className = `status-tag order-status-top status-${order.status.replace(/ /g, '_')}`;
        topStatusTag.textContent = statusDisplay;

        // Update Customer Info (Assuming fixed structure from HTML)
        orderDetailsCard.querySelector('.detail-item:nth-child(2)').innerHTML = `<strong>Name:</strong> ${order.customer.name}`;
        orderDetailsCard.querySelector('.detail-item:nth-child(3)').innerHTML = `<strong>Contact:</strong> ${order.customer.contact}`;
        orderDetailsCard.querySelector('.detail-item:nth-child(4)').innerHTML = `<strong>Address:</strong> ${order.customer.address}`;

        // Update Items List
        const itemsHtml = order.items.map(item => `
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">$${item.price.toFixed(2)}</p>
            </div>
        `).join('');
        
        // Clear and insert new item list
        const itemsSection = orderDetailsCard.querySelector('h3:nth-of-type(2)').parentElement;
        let currentItem = itemsSection.querySelector('.item-details');
        while (currentItem) {
            const next = currentItem.nextElementSibling;
            currentItem.remove();
            currentItem = next;
        }
        itemsSection.querySelector('h3:nth-of-type(2)').insertAdjacentHTML('afterend', itemsHtml);

        // Update Summary (Assuming fixed structure from HTML)
        const summaryLines = orderDetailsCard.querySelectorAll('.summary-line');
        summaryLines[0].querySelector('p:nth-child(2)').textContent = `$${order.totals.subtotal.toFixed(2)}`;
        summaryLines[1].querySelector('p:nth-child(2)').textContent = `$${order.totals.tax.toFixed(2)}`;
        summaryLines[2].querySelector('p:nth-child(2)').textContent = `$${order.totals.total.toFixed(2)}`;
        orderDetailsCard.querySelector('.detail-item:last-of-type').innerHTML = `<strong>Payment:</strong> ${order.totals.payment}`;

        // Control Visibility and Text of Action Buttons
        const nextStatus = STATUS_MAP[order.status] || 'N/A';
        updateButton.textContent = `Update Status to ${nextStatus}`;
        updateButton.dataset.nextStatus = nextStatus;

        // Hide Update/Cancel if order is completed or canceled
        if (order.status === 'Completed' || order.status === 'Canceled') {
            updateButton.style.display = 'none';
            cancelButton.style.display = 'none';
        } else {
            updateButton.style.display = 'inline-block';
            cancelButton.style.display = 'inline-block';
        }
        // Print button is always available for viewing/re-printing
        printButton.style.display = 'inline-block'; 
    }

    /** Applies all active filters (status, type, search) and updates the list. */
    function filterAndSearchOrders() {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredOrders = getOrdersArray(ALL_ORDERS);

        // 1. Status Filter
        if (activeFilterStatus !== 'All') {
            filteredOrders = filteredOrders.filter(order => order.status === activeFilterStatus);
        }

        // 2. Type Filter (Pickup/Delivery)
        if (activeFilterType !== 'All') {
            filteredOrders = filteredOrders.filter(order => order.type === activeFilterType);
        }

        // 3. Search Filter
        if (searchTerm) {
             filteredOrders = filteredOrders.filter(order => 
                order.id.toLowerCase().includes(searchTerm) || 
                order.customer.name.toLowerCase().includes(searchTerm) ||
                order.items.some(item => item.name.toLowerCase().includes(searchTerm))
            );
        }

        renderOrderList(filteredOrders);

        // Ensure a visible order is selected, or clear details
        if (filteredOrders.length > 0) {
            const currentOrderStillVisible = filteredOrders.some(order => order.id === currentOrderID);
            if (!currentOrderStillVisible) {
                 renderOrderDetails(filteredOrders[0].id); // Select the first visible one
            } else {
                renderOrderDetails(currentOrderID); // Re-render current one to keep it selected
            }
        } else {
             renderOrderDetails(null); // Clear the details panel
        }
    }


    // ------------------------------------------------------------------
    // --- 2. Event Listeners (Making all elements functional) ---
    // ------------------------------------------------------------------

    // ➡️ Initial Load Setup
    filterAndSearchOrders(); 

    // ➡️ Status Filter Buttons (All, Pending, Preparing, Ready)
    statusFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active styling
            statusFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Set new filter and re-run filter function
            activeFilterStatus = button.dataset.status;
            filterAndSearchOrders();
        });
    });

    // ➡️ Type Filter Select (Pickup/Delivery)
    typeFilterSelect.addEventListener('change', function() {
        // The HTML defaults to "Pickup" on load, adjust this for consistency
        activeFilterType = this.value === 'Pickup' ? 'Pickup' : (this.value === 'Delivery' ? 'Delivery' : 'All');
        filterAndSearchOrders();
    });

    // ➡️ Search Input (🔍)
    searchInput.addEventListener('input', filterAndSearchOrders);


    // ➡️ Order Row Click Handler (for selecting an order)
    orderListContainer.addEventListener('click', function(e) {
        const row = e.target.closest('.order-row');
        if (row) {
            const orderId = row.dataset.id;
            renderOrderDetails(orderId);
        }
    });


    // ➡️ Action Button: UPDATE STATUS
    updateButton.addEventListener('click', function() {
        const nextStatus = updateButton.dataset.nextStatus;
        const currentOrder = ALL_ORDERS[currentOrderID];

        if (!currentOrder || nextStatus === 'N/A' || currentOrder.status === 'Completed' || currentOrder.status === 'Canceled') return;

        const newStatus = nextStatus.replace(' for Pickup', ''); 

        currentOrder.status = newStatus; // Update local data
        
        // Re-render
        filterAndSearchOrders(); 
        renderOrderDetails(currentOrderID);

        console.log(`[SERVER LOG] Order ${currentOrderID} status updated to: ${newStatus}`);
        alert(`Order #${currentOrderID} status successfully updated to: ${newStatus}!`);
    });

    // ➡️ Action Button: CANCEL/REFUND
    cancelButton.addEventListener('click', function() {
        const currentOrder = ALL_ORDERS[currentOrderID];
        if (!currentOrder || currentOrder.status === 'Completed' || currentOrder.status === 'Canceled') return;

        if (confirm(`Are you sure you want to CANCEL Order #${currentOrderID}? This action is irreversible and triggers a refund process.`)) {
            currentOrder.status = 'Canceled';
            
            // Re-render
            filterAndSearchOrders();
            renderOrderDetails(currentOrderID);
            
            console.log(`[SERVER LOG] Order ${currentOrderID} -> Canceled`);
            alert(`Order #${currentOrderID} has been CANCELED and a refund process initiated.`);
        }
    });
    
    // ➡️ Action Button: PRINT RECIEPT/INVOICE
    printButton.addEventListener('click', function() {
        if (!ALL_ORDERS[currentOrderID]) return;
        
        alert(`Simulating printing receipt for Order #${currentOrderID}. A print dialog would open here.`);
        console.log(`Printing Order #${currentOrderID}`);
    });

});


// --- Inside checkout.js ---

function generateUniqueOrderId() {
    // Creates a random ID like #ba7c4e5
    const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(5, '0');
    return '#ba' + randomHex; 
}

// When the "Proceed" button is clicked:
// ...
const uniqueOrderId = generateUniqueOrderId();

const orderData = {
    // ... other data (cart, orderType) ...
    orderId: uniqueOrderId, // Store the generated ID
};

localStorage.setItem('finalOrderData', JSON.stringify(orderData));
// ... then redirect ...