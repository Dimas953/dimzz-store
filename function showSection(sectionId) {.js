function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function navigateTo(sectionId) {
    window.location.hash = sectionId;
    showSection(sectionId);
}

function showSectionFromHash() {
    const sectionId = window.location.hash.substring(1) || 'home';
    showSection(sectionId);
}

function addToCart() {
    const productSelect = document.getElementById('productSelect');
    const cartList = document.getElementById('cartList');
    const selectedProduct = productSelect.options[productSelect.selectedIndex].text;
    const listItem = document.createElement('li');
    listItem.textContent = selectedProduct;
    listItem.onclick = () => removeFromCart(listItem);
    cartList.appendChild(listItem);
    saveCart();
}

function removeFromCart(item) {
    item.remove();
    saveCart();
}

function saveCart() {
    const cartList = document.getElementById('cartList');
    const items = [];
    cartList.querySelectorAll('li').forEach(item => {
        items.push(item.textContent);
    });
    localStorage.setItem('cart', JSON.stringify(items));
}

function loadCart() {
    const cartList = document.getElementById('cartList');
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    items.forEach(itemText => {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;
        listItem.onclick = () => removeFromCart(listItem);
        cartList.appendChild(listItem);
    });
}

function checkoutCart() {
    const cartList = document.getElementById('cartList');
    const checkoutList = document.getElementById('checkoutList');
    checkoutList.innerHTML = cartList.innerHTML;
    navigateTo('checkout');
}

window.onload = () => {
    showSectionFromHash();
    loadCart();
};
