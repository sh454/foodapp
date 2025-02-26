// Load cart items
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartItems(cart);
    updateCartSummary(cart);
});

function renderCartItems(cart) {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="cart-item mb-3 p-3 border-bottom">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.price.toLocaleString()} افغانی</small>
                    </div>
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${index}, -1)" class="btn btn-sm btn-outline-secondary quantity-btn">−</button>
                        <span class="px-2">${item.quantity || 1}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="btn btn-sm btn-outline-secondary quantity-btn">+</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateCartSummary(cart) {
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    document.getElementById('total-amount').textContent = `${total.toLocaleString()} افغانی`;
    document.getElementById('final-amount').textContent = `${(total + 30000).toLocaleString()} افغانی`;
}

function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart[index]) {
        // Miktarı güncelle
        cart[index].quantity = (cart[index].quantity || 1) + change;
        
        // Miktar 1'den az olamaz
        if(cart[index].quantity < 1) cart[index].quantity = 1;
        
        // Yeni değerleri kaydet
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Sepeti yeniden render et
        renderCartItems(cart);
        updateCartSummary(cart);
    }
}