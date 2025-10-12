// ============================================
// GAMMA.APP - ADVANCED ANIMATIONS
// Erweiterte Scroll-Animationen & Effects
// ============================================

// ===== SCROLL PROGRESS BAR =====
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            z-index: var(--z-fixed);
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== PARALLAX SCROLLING =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== REVEAL ON SCROLL (Advanced) =====
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                // Optional: Unobserve after reveal
                if (entry.target.dataset.once === 'true') {
                    revealObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        revealObserver.observe(element);
    });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        [data-reveal].revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const suffix = counter.dataset.suffix || '';
                const prefix = counter.dataset.prefix || '';

                let start = 0;
                const increment = target / (duration / 16);
                
                const updateCounter = () => {
                    start += increment;
                    if (start < target) {
                        counter.textContent = prefix + Math.floor(start) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = prefix + target + suffix;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== STAGGER ANIMATION =====
function initStaggerAnimation() {
    const staggerGroups = document.querySelectorAll('[data-stagger]');

    staggerGroups.forEach(group => {
        const children = group.children;
        const delay = parseInt(group.dataset.staggerDelay) || 100;

        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.6s ease ${index * delay}ms, transform 0.6s ease ${index * delay}ms`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach(child => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(group);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(group);
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.textContent;
        const speed = parseInt(element.dataset.typingSpeed) || 50;
        element.textContent = '';
        element.style.opacity = '1';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeWriter = () => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, speed);
                        }
                    };
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    });
}

// ===== FLOATING ANIMATION =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('[data-float]');

    floatingElements.forEach((element, index) => {
        const duration = element.dataset.floatDuration || 3;
        const delay = element.dataset.floatDelay || (index * 0.2);

        element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });

    // Add floating keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== SCROLL-TRIGGERED ANIMATIONS (Alternative zu Intersection Observer) =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');

    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // Styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scroll-animate.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ===== GRADIENT TEXT ANIMATION =====
function initGradientTextAnimation() {
    const gradientTexts = document.querySelectorAll('[data-gradient-animate]');

    gradientTexts.forEach(text => {
        text.style.background = 'linear-gradient(90deg, var(--gamma-ultramarine), var(--gamma-purple), var(--gamma-rocket-fire))';
        text.style.backgroundSize = '200% auto';
        text.style.webkitBackgroundClip = 'text';
        text.style.backgroundClip = 'text';
        text.style.webkitTextFillColor = 'transparent';
        text.style.animation = 'gradient-shift 3s ease infinite';
    });

    // Keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient-shift {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== MAGNETIC CURSOR EFFECT (für Cards/Buttons) =====
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const strength = element.dataset.magneticStrength || 0.3;

            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });

        element.style.transition = 'transform 0.3s ease';
    });
}

// ===== IMAGE REVEAL ON SCROLL =====
function initImageReveal() {
    const images = document.querySelectorAll('[data-image-reveal]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('image-revealed');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    images.forEach(img => {
        img.style.clipPath = 'inset(0 100% 0 0)';
        img.style.transition = 'clip-path 1s ease';
        imageObserver.observe(img);
    });

    const style = document.createElement('style');
    style.textContent = `
        [data-image-reveal].image-revealed {
            clip-path: inset(0 0 0 0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== INIT ALL ANIMATIONS =====
function initAdvancedAnimations() {
    // Uncomment die Animationen die du verwenden möchtest:
    
    createScrollProgressBar();
    // initParallax();
    initRevealOnScroll();
    animateCounters();
    initStaggerAnimation();
    // initTypingEffect();
    // initFloatingElements();
    // initScrollAnimations();
    // initGradientTextAnimation();
    // initMagneticEffect();
    initImageReveal();

    console.log('✨ Advanced Animations Initialized!');
}

// Auto-Init wenn DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedAnimations);
} else {
    initAdvancedAnimations();
}

// Export functions for manual use
window.GammaAnimations = {
    createScrollProgressBar,
    initParallax,
    initRevealOnScroll,
    animateCounters,
    initStaggerAnimation,
    initTypingEffect,
    initFloatingElements,
    initScrollAnimations,
    initGradientTextAnimation,
    initMagneticEffect,
    initImageReveal
};

/* 
USAGE EXAMPLES:

1. PARALLAX:
<div data-parallax="0.5">
    <img src="image.jpg" alt="Parallax Image">
</div>

2. REVEAL ON SCROLL:
<div data-reveal data-delay="200" data-once="true">
    Content to reveal
</div>

3. COUNTER:
<span data-counter="1000" data-suffix="+" data-duration="2000">0</span>

4. STAGGER:
<div data-stagger data-stagger-delay="100">
    <div class="card">1</div>
    <div class="card">2</div>
    <div class="card">3</div>
</div>

5. TYPING EFFECT:
<h1 data-typing data-typing-speed="100">Text to type</h1>

6. FLOATING:
<div data-float data-float-duration="3" data-float-delay="0">
    Floating element
</div>

7. GRADIENT TEXT:
<h1 data-gradient-animate>Animated Gradient Text</h1>

8. MAGNETIC:
<button class="btn btn-primary" data-magnetic data-magnetic-strength="0.3">
    Magnetic Button
</button>

9. IMAGE REVEAL:
<img src="image.jpg" data-image-reveal alt="Image">

*/
