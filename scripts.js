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
        alert(`${name} agregado al carrito. Cantidad total: ${item ? item.quantity : quantity}`);
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

    let total = 0; // Inicializa la variable total

    cartItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>${item.name}</h4>
            <p>Precio: $${item.price} x ${item.quantity}</p>
            <input type="number" min="0" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(div);

        // Suma el total de productos
        total += item.price * item.quantity;
    });

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
    }

    // Muestra el total en el carrito
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartContainer.appendChild(totalDiv);
}

function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);

    if (newQuantity >= 0) {
        if (newQuantity === 0) {
            removeFromCart(index); // Si la cantidad es 0, eliminamos el producto.
        } else {
            cart[index].quantity = newQuantity; // Actualiza la cantidad sin complicaciones.
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }

    loadCartItems(); // Carga de nuevo los productos del carrito para reflejar los cambios.
}

function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto del carrito.
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Actualiza el carrito después de eliminar el producto.
}

function registerUser() {
    // Verifica si el carrito está vacío antes de proceder al registro
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Debes agregar productos antes de registrarte.');
    } else {
        window.location.href = 'register.html'; // Redirige a la página de registro si hay productos
    }
}

function Payment() {
    // Verifica si el carrito está vacío antes de proceder al pago
    if (cart.length === 0) {
        alert('Tu carrito está vacío. No puedes continuar con el pago.');
    } else {
        window.location.href = 'payment.html'; // Redirige a la página de pago si hay productos
    }
}

window.onload = loadCartItems; // Carga los productos del carrito al cargar la página.
