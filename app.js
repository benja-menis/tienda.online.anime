// ==========================
// DATOS DE PRODUCTOS
// ==========================
const products = [
  {id: 1, name: "Figura Naruto", price: 25, image: "https://i.imgur.com/Fig1.png"},
  {id: 2, name: "Figura Luffy", price: 30, image: "https://i.imgur.com/Fig2.png"},
  {id: 3, name: "Manga Attack on Titan", price: 15, image: "https://i.imgur.com/Manga1.png"},
  {id: 4, name: "Camiseta Goku", price: 20, image: "https://i.imgur.com/Shirt1.png"},
  {id: 5, name: "Figura Sailor Moon", price: 35, image: "https://i.imgur.com/Fig3.png"},
  {id: 6, name: "Manga One Piece", price: 18, image: "https://i.imgur.com/Manga2.png"},
  {id: 7, name: "Sudadera Naruto", price: 40, image: "https://i.imgur.com/Shirt2.png"},
  {id: 8, name: "Figura Deku", price: 28, image: "https://i.imgur.com/Fig4.png"},
  {id: 9, name: "Manga Demon Slayer", price: 17, image: "https://i.imgur.com/Manga3.png"},
  {id: 10, name: "Camiseta Luffy", price: 22, image: "https://i.imgur.com/Shirt3.png"},
];

// ==========================
// ESTADO DEL CARRITO
// ==========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ==========================
// ELEMENTOS DEL DOM
// ==========================
const productsContainer = document.getElementById('products-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.getElementById('close-modal');
const checkoutSummary = document.getElementById('checkout-summary');
const checkoutTotal = document.getElementById('checkout-total');
const confirmOrderBtn = document.getElementById('confirm-order-btn');

// ==========================
// RENDERIZAR PRODUCTOS
// ==========================
function renderProducts(){
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    productsContainer.appendChild(card);
  });
}

// ==========================
// FUNCIONES DEL CARRITO
// ==========================
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart(){
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.quantity} = $${subtotal}</p>
      </div>
      <div>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.innerText = total;
  cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function addToCart(id){
  const product = products.find(p => p.id === id);
  const exist = cart.find(item => item.id === id);
  if(exist){
    exist.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  saveCart();
  renderCart();
  openCart();
}

function increaseQuantity(id){
  const item = cart.find(p => p.id === id);
  item.quantity++;
  saveCart();
  renderCart();
}

function decreaseQuantity(id){
  const item = cart.find(p => p.id === id);
  item.quantity--;
  if(item.quantity === 0){
    cart = cart.filter(p => p.id !== id);
  }
  saveCart();
  renderCart();
}

function removeItem(id){
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCart();
}

// ==========================
// CHECKOUT SIMULADO
// ==========================
function openCart(){
  cartSidebar.classList.add('active');
}

checkoutBtn.addEventListener('click', () => {
  checkoutSummary.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} x ${item.quantity} = $${item.price * item.quantity}</p>`;
    checkoutSummary.appendChild(div);
  });
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  checkoutTotal.innerText = total;
  checkoutModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  checkoutModal.style.display = 'none';
});

confirmOrderBtn.addEventListener('click', () => {
  alert('Pedido enviado! Gracias por comprar.');
  cart = [];
  saveCart();
  renderCart();
  checkoutModal.style.display = 'none';
});

// ==========================
// VACIAR CARRITO
// ==========================
clearCartBtn.addEventListener('click', () => {
  cart = [];
  saveCart();
  renderCart();
});

// ==========================
// INICIALIZACIÓN
// ==========================
renderProducts();
renderCart();

// ==========================
// CERRAR MODAL CLICK FUERA
// ==========================
window.onclick = function(event){
  if(event.target == checkoutModal){
    checkoutModal.style.display = "none";
  }
}
