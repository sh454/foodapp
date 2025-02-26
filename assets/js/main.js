// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("به سبد خرید اضافه شد!");
}

// Load cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Sepet ve Profil Yönetimi
document.addEventListener('DOMContentLoaded', () => {
    // Sepet sayacını güncelle
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;

    // Profil bilgilerini yükle
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(user) {
        document.querySelector('.profile-icon').textContent = user.email[0].toUpperCase();
    }
});

// Kullanıcı durumuna göre arayüzü güncelle
function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');
    
    if(user) {
        authButtons.style.display = 'none';
        userProfile.style.display = 'block';
        initProfile();
    } else {
        authButtons.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

// Kayıt fonksiyonu (register.html için)
function registerUser() {
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        password: document.getElementById('password').value
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '../home.html';
}

// Giriş fonksiyonu (login.html için)
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Burada gerçek bir auth kontrolü yapılmalı
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if(user && user.email === email && user.password === password) {
        window.location.href = './home.html';
    } else {
        alert('اطلاعات وارد شده صحیح نیست!');
    }
}

function updateProfile() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        alert('Kullanıcı bulunamadı! Lütfen tekrar giriş yapın.');
        return;
    }

    user.name = document.getElementById('name').value;
    user.phone = document.getElementById('phone').value;
    user.address = document.getElementById('address').value;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('پروفایل با موفقیت به روز شد!');
    window.location.href = '../home.html';
}

// Diğer fonksiyonlar HTML içinde tanımlı
// Initialize on page load
document.addEventListener('DOMContentLoaded', updateCartCount);