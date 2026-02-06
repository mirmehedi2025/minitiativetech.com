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

// Smooth Scrolling for Anchor Links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic HTML Injection
/**
 * Generic function to inject HTML into a target element
 * @param {string} filePath - Path to the HTML file (e.g., 'price.html')
 * @param {string} elementId - ID of the div where it should go
 */
async function loadComponent(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Could not find ${filePath}`);
        
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (err) {
        console.warn(`Something went wrong: ${err}`);
    }
}

// Now you can call it for as many files as you want!
loadComponent('section.html', 'section-placeholder');
loadComponent('stats.html', 'stats-placeholder');
loadComponent('websolution.html', 'websolution-placeholder');
loadComponent('yt.html', 'yt-placeholder');
loadComponent('seo.html', 'seo-placeholder');
loadComponent('contactform.html', 'contactform-placeholder');

const welcomeMessage = document.getElementById("welcomeMessage");
const hour = new Date().getHours();

let message = "";

if (hour >= 5 && hour < 12) {
  message = "Good Morning 🌅";
} else if (hour >= 12 && hour < 17) {
  message = "Good Afternoon ☀️";
} else if (hour >= 17 && hour < 21) {
  message = "Good Evening 🌇";
} else {
  message = "Good Night 🌙";
}

welcomeMessage.textContent = message;

// Fade out after 10 seconds
setTimeout(() => {
  welcomeMessage.classList.add("fade-out");
}, 10000);


function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [key, value] = c.split("=");
    if (key === name) return value;
  }
  return null;
}

function acceptCookies() {
  setCookie("cookieConsent", "accepted", 365);
  document.getElementById("cookieBanner").style.display = "none";
}

window.onload = function () {
  if (!getCookie("cookieConsent")) {
    document.getElementById("cookieBanner").style.display = "flex";
  }
};
let currentIdx = 0;
const track = document.getElementById('reviewsTrack');
const dots = document.querySelectorAll('.slider-dot');

function currentSlide(index) {
    currentIdx = index;
    updateSlider();
}

function updateSlider() {
    track.style.transform = `translateX(-${currentIdx * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentIdx = (currentIdx + 1) % dots.length;
    updateSlider();
}, 2000);
 

