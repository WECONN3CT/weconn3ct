// ============================================
// GAMMA.APP - MAIN JAVASCRIPT
// Navigation, Scroll-Animationen, Interaktionen
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navbarLinks = document.querySelectorAll('.navbar-link');

// ===== MOBILE NAVIGATION =====
navbarToggle?.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target)) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    }
});

// ===== NAVBAR SCROLL STATE (nur Schatten/Background, keine Bewegung) =====
let rafId;
const onScroll = () => {
    if (!navbar) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 4) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    rafId = undefined;
};

window.addEventListener('scroll', () => {
    if (rafId) return; // throttle über rAF
    rafId = requestAnimationFrame(onScroll);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll(`
    .animate-fade-in,
    .animate-fade-in-up,
    .animate-fade-in-down,
    .animate-slide-in-left,
    .animate-slide-in-right,
    .animate-scale-in
`);

animatedElements.forEach(el => {
    // Set initial state nur, wenn nicht bereits sichtbar
    if (!el.classList.contains('visible')) {
        el.style.opacity = '0';
    }
    animateOnScroll.observe(el);
});

// Add visible class styles (steuert Sichtbarkeits-Fade per CSS-Injektion)
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in.visible,
    .animate-fade-in-up.visible,
    .animate-fade-in-down.visible,
    .animate-slide-in-left.visible,
    .animate-slide-in-right.visible,
    .animate-scale-in.visible {
        opacity: 1 !important;
    }
`;
document.head.appendChild(style);

// ===== HERO TITLE SPOTLIGHT (Cursor) =====
(function(){
    const title = document.querySelector('.hero-title');
    if (!title) return;
    // Duplizierter Text für ::after Inhalt
    title.setAttribute('data-text', title.textContent || '');
    let spotX = 0.5, spotY = 0.5;
    let animId;
    function render(){
        title.style.setProperty('--spot-x', `${spotX*100}%`);
        title.style.setProperty('--spot-y', `${spotY*100}%`);
        animId = undefined;
    }
    function setPos(x, y){
        spotX = x; spotY = y;
        if (!animId) animId = requestAnimationFrame(render);
    }
    title.addEventListener('pointermove', (e)=>{
        const r = title.getBoundingClientRect();
        const x = (e.clientX - r.left) / Math.max(r.width,1);
        const y = (e.clientY - r.top) / Math.max(r.height,1);
        setPos(x, y);
    });
    title.addEventListener('pointerleave', ()=>{
        setPos(0.5, 0.5);
    });
})();

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// (Deaktiviert) Cursor-Tracking für Blue Ripple entfernt

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== FORM VALIDATION (wenn vorhanden) =====
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = this.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Remove error class on input
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (isValid) {
            // Form submission logic here
            console.log('Form is valid!');
        }
    });
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== PARALLAX EFFECT (Optional) =====
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll to top button styles
const scrollBtnStyle = document.createElement('style');
scrollBtnStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: var(--radius-full);
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
        z-index: var(--z-fixed);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        background: var(--color-primary-dark);
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
        }
    }
`;
document.head.appendChild(scrollBtnStyle);

// ===== CURSOR UTILITIES =====
console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   🎨 GAMMA DESIGN SYSTEM LOADED                 ║
║                                                  ║
║   Verfügbare Features:                          ║
║   ✓ Mobile Navigation                           ║
║   ✓ Smooth Scroll                               ║
║   ✓ Scroll Animations                           ║
║   ✓ Active Navigation Tracking                  ║
║   ✓ Card Hover Effects                          ║
║   ✓ Button Ripple                               ║
║   ✓ Lazy Loading                                ║
║   ✓ Scroll to Top                               ║
║                                                  ║
║   Ready to build! 🚀                            ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`);

// Header-Position Fix gegen Browser-UI Auto-Hide
const navbarWrapper = document.querySelector('.navbar-wrapper');
if (navbarWrapper) {
    let lastScrollTop = 0;
    let isScrollingDown = false;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        isScrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Verhindere, dass der Header über den Viewport-Top hinausrutscht
        const rect = navbarWrapper.getBoundingClientRect();
        if (rect.top < 0 && !isScrollingDown) {
            navbarWrapper.style.transform = `translateY(${Math.abs(rect.top)}px)`;
        } else if (rect.top >= 0) {
            navbarWrapper.style.transform = 'translateY(0)';
        }
    }, { passive: true });
}
