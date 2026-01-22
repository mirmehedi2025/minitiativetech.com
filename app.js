// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close menu on link click
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#000000';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});
// 1. Product Data (Matching your Pricing Cards)
const products = [
    { id: 1, name: "Digital Presence", price: 299 },
    { id: 2, name: "Business MGMT", price: 799 },
    { id: 3, name: "Automation", price: 2499 },
    { id: 4, name: "Enterprise", price: 6000 }
];

let cart = [];

// 2. Function to Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateUI();
    alert(`${product.name} added to cart!`);
}

// 3. Update the Badge and Cart List
function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total');
    
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name}</span>
                <span>$${item.price} <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">&times;</button></span>
            </div>`;
    });

    totalEl.innerText = `$${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

// 4. Toggle Cart Visibility
function toggleCart() {
    const cartSection = document.getElementById('cart');
    cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    window.location.href = "#cart";
}

// 5. Checkout / Billing Logic (WhatsApp Integration)
function processOrder() {
    if (cart.length === 0) return alert("Your cart is empty!");

    let billSummary = "--- Order Bill ---\n";
    let total = 0;
    
    cart.forEach(item => {
        billSummary += `${item.name}: $${item.price}\n`;
        total += item.price;
    });
    
    billSummary += `\nTotal Amount: $${total}\n\nI would like to proceed with this order.`;

    // Encode for WhatsApp URL
    const encodedMsg = encodeURIComponent(billSummary);
    const whatsappUrl = `https://wa.me/8801842741932?text=${encodedMsg}`;
    
    window.open(whatsappUrl, '_blank');
}
