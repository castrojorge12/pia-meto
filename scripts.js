let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += quantity; // Aumenta la cantidad si el producto ya existe.
        } else {
            cart.push({ name, price, quantity }); // Agrega el nuevo producto al carrito.
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} agregado al carrito.`);
    } else {
        alert("Por favor, elige una cantidad mayor a 0.");
    }
}

function viewCart() {
    window.location.href = 'cart.html';
}

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    
    cartItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Precio: $${item.price} x ${item.quantity}</p>
            <input type="number" min="0" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(div);
    });

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
}

function updateQuantity(index, newQuantity) {
    const currentQuantity = cart[index].quantity;
    newQuantity = parseInt(newQuantity);

    if (newQuantity >= 0) {
        if (newQuantity < currentQuantity) {
            // Si la nueva cantidad es menor, simplemente actualizamos
            const difference = currentQuantity - newQuantity;
            cart[index].quantity -= difference; // Restamos la diferencia.
        } else {
            // Si la nueva cantidad es mayor o igual, simplemente la actualizamos
            cart[index].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    loadCartItems(); // Carga de nuevo los productos del carrito para reflejar los cambios.
}

function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto del carrito.
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Actualiza el carrito después de eliminar el producto.
}

function registerUser() {
    window.location.href = 'register.html';
}

window.onload = loadCartItems; // Carga los productos del carrito al cargar la página.
