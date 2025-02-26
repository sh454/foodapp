// Kayıt İşlemleri
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value
    };

    if(validateRegistration(user)) {
        localStorage.setItem(user.email, JSON.stringify(user));
        alert('ثبت نام با موفقیت انجام شد!');
        window.location.href = 'index.html';
    }
});

// Giriş İşlemleri
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem(email));

    if(user && user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        showError('اطلاعات وارد شده صحیح نیست');
    }
});

// Validasyon Fonksiyonu
function validateRegistration(user) {
    if(!user.name || !user.email || !user.password) {
        showError('لطفا تمام فیلدها را پر کنید');
        return false;
    }
    
    if(localStorage.getItem(user.email)) {
        showError('این ایمیل قبلا ثبت شده است');
        return false;
    }
    
    if(user.password.length < 6) {
        showError('رمز عبور باید حداقل 6 کاراکتر باشد');
        return false;
    }
    
    return true;
}

// Hata Gösterimi
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;
    
    const card = document.querySelector('.auth-card');
    card.insertBefore(errorDiv, card.lastElementChild);
    
    setTimeout(() => errorDiv.remove(), 3000);
}