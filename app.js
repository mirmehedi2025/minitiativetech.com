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
/*window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#000000';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});*/

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

// Initialize reviews slider if it exists
const track = document.getElementById('reviewsTrack');
const dots = document.querySelectorAll('.slider-dot');

if (track && dots.length > 0) {
    let currentIdx = 0;

    function currentSlide(index) {
        currentIdx = index;
        updateSlider();
    }

    function updateSlider() {
        track.style.transform = `translateX(-${currentIdx * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIdx);
        });
    }

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIdx = (currentIdx + 1) % dots.length;
        updateSlider();
    }, 5000);
}
document.addEventListener('DOMContentLoaded', () => {
    // Initialize blog search and filter only if elements exist
    const searchInput = document.getElementById('blogSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput && blogCards.length > 0) {
        // Search Functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
                const excerpt = card.querySelector('p')?.innerText.toLowerCase() || '';
                card.style.display = (title.includes(query) || excerpt.includes(query)) ? 'block' : 'none';
            });
        });
    }

    if (filterBtns.length > 0) {
        // Category Filter Functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');
                blogCards.forEach(card => {
                    card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? 'block' : 'none';
                });
            });
        });
    }

    // Scroll reveal animation
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[class*="reveal-"], .blog-card').forEach(el => observer.observe(el));
});
