/**
 * Catering Event & Birthday Party Planner
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initRTL();
    initScrollObserver();
    initNavbar();
    generateGlitter();
    initScrollToTop();

    // Load GSAP and SplitType dynamically for all pages
    try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await loadScript('https://unpkg.com/split-type');
        initHeadingAnimations();
    } catch(e) {
        console.error("Failed to load GSAP/SplitType", e);
    }
});

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function initHeadingAnimations() {
    if (typeof gsap === 'undefined' || typeof SplitType === 'undefined') return;

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chars = entry.target.querySelectorAll('.char');
                if (chars.length > 0) {
                    gsap.to(chars, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.03,
                        ease: "back.out(1.5)",
                        overwrite: "auto"
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    headings.forEach((heading) => {
        const split = new SplitType(heading, { types: 'chars, words' });
        
        gsap.set(split.chars, { opacity: 0, y: 30 });
        gsap.set(split.words, { overflow: 'hidden', verticalAlign: 'bottom' });
        
        observer.observe(heading);
    });
}
// --- Theme Management (Dark / Light) ---
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const sidebarThemeBtn = document.getElementById('sidebarThemeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default is dark
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const toggleTheme = () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (sidebarThemeBtn) sidebarThemeBtn.addEventListener('click', toggleTheme);
}

// --- RTL Management ---
function initRTL() {
    const rtlToggleBtn = document.getElementById('rtlToggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';
    const bsLink = document.querySelector('link[href*="bootstrap"]');
    
    const setRTL = (isRtl) => {
        if (isRtl) {
            document.documentElement.setAttribute('dir', 'rtl');
            localStorage.setItem('dir', 'rtl');
            if (bsLink) bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            localStorage.setItem('dir', 'ltr');
            if (bsLink) bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
        }
    };

    // Initialize on load
    if (currentDir === 'rtl') {
        setRTL(true);
    }

    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            let dir = document.documentElement.getAttribute('dir');
            setRTL(dir !== 'rtl');
        });
    }
}

// --- Scroll Animations (Intersection Observer) ---
function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => observer.observe(el));
}

// --- Navbar Scroll Effect & Mobile Menu ---
function initNavbar() {
    const navbar = document.querySelector('.navbar-glass');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            // If it's a dropdown item, also highlight the parent dropdown
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const toggle = parentDropdown.querySelector('.dropdown-toggle');
                    if(toggle) toggle.classList.add('active');
                }
            }
        }
    });
}

// --- Glitter / Particle Generator ---
function generateGlitter() {
    const glitterContainers = document.querySelectorAll('.glitter-bg');
    
    glitterContainers.forEach(container => {
        const particleCount = container.getAttribute('data-particles') || 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration and delay
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            container.appendChild(particle);
        }
    });
}

// --- Scroll to Top Button ---
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
