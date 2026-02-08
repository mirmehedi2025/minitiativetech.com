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
 
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Logic
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[class*="reveal-"]').forEach(el => observer.observe(el));

    // 2. Simple Particle Background
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#CCF527' : '#27ADF5';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blogSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    // 1. Search Functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const excerpt = card.querySelector('p').innerText.toLowerCase();
            
            if (title.includes(query) || excerpt.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 2. Category Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active Button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Re-trigger animation
                    card.classList.add('active');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Simple Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    blogCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = '0.6s ease-out';
        observer.observe(card);
    });
});
