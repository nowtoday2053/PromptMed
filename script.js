// ===== VERCEL ANALYTICS =====
import { inject } from '@vercel/analytics';

// Initialize analytics
inject();

// ===== MODERN JAVASCRIPT WITH APPLE-INSPIRED ANIMATIONS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.parentElement.classList.contains('features-grid') ||
                    entry.target.parentElement.classList.contains('benefits-grid') ||
                    entry.target.parentElement.classList.contains('pricing-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .benefit-item, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // ===== CHAT ANIMATION =====
    const chatMessages = document.querySelectorAll('.message');
    if (chatMessages.length > 0) {
        // Initially hide all messages
        chatMessages.forEach(message => {
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px) scale(0.95)';
        });
        
        // Animate messages with delay
        const animateMessages = () => {
            chatMessages.forEach((message, index) => {
                setTimeout(() => {
                    message.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0) scale(1)';
                }, index * 800);
            });
        };
        
        // Start animation when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateMessages, 1000);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const hero = document.querySelector('.hero');
        if (hero) heroObserver.observe(hero);
    }
    
    // ===== BUTTON INTERACTIONS =====
    document.querySelectorAll('.btn').forEach(btn => {
        // Ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover effects
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== CARD HOVER EFFECTS =====
    document.querySelectorAll('.feature-card, .benefit-item, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // ===== PLATFORM ICONS ANIMATION =====
    document.querySelectorAll('.platform').forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    });
    
    // ===== FEATURE NUMBERS PULSE =====
    document.querySelectorAll('.feature-number').forEach(number => {
        const pulseAnimation = () => {
            number.style.transform = 'scale(1.1)';
            setTimeout(() => {
                number.style.transform = 'scale(1)';
            }, 200);
        };
        
        // Pulse every 3 seconds
        setInterval(pulseAnimation, 3000);
        
        // Pulse on hover
        number.addEventListener('mouseenter', pulseAnimation);
    });
    
    // ===== STATS COUNTER ANIMATION =====
    const animateCounter = (element, target, duration = 2000, isPercentage = false, isDecimal = false, hasPlus = false) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue;
            if (isDecimal) {
                displayValue = current.toFixed(1);
            } else {
                displayValue = Math.floor(current);
            }
            
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (hasPlus) {
                if (current >= 1000000) {
                    element.textContent = (displayValue / 1000000).toFixed(1) + 'M+';
                } else if (current >= 1000) {
                    element.textContent = Math.floor(displayValue / 1000) + 'K+';
                } else {
                    element.textContent = displayValue + '+';
                }
            } else {
                element.textContent = displayValue;
            }
        }, 16);
    };
    
    // Animate stats when visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.number');
                if (number) {
                    const text = number.textContent;
                    const value = parseInt(text.replace(/\D/g, ''));
                    animateCounter(number, value);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ===== PARALLAX EFFECT FOR HERO =====
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // ===== PHONE MOCKUP TILT EFFECT =====
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.addEventListener('mousemove', (e) => {
            const rect = phoneMockup.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        phoneMockup.addEventListener('mouseleave', () => {
            phoneMockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
    
    // ===== PRICING CARD SPECIAL EFFECTS =====
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            if (this.classList.contains('featured')) {
                this.style.boxShadow = '0 25px 50px rgba(0, 122, 255, 0.3)';
            } else {
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            }
        });
    });
    
    // ===== FORM VALIDATION (if forms exist) =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations go here
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Focus management for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
    
    // Reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.animationIterationCount = '1';
            el.style.transitionDuration = '0.01ms';
        });
    }
    
    // ===== EASTER EGGS =====
    
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated!
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            konamiCode = [];
        }
    });
    
    console.log('🚀 MedPrompt website loaded with Apple-inspired animations!');

    // ===== TESTIMONIALS ANIMATIONS =====
    // Animate testimonial stats when visible
    const testimonialStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(statNumber => {
                    const text = statNumber.textContent;
                    const isPercentage = text.includes('%');
                    const isDecimal = text.includes('.');
                    const hasPlus = text.includes('+');
                    const cleanNumber = parseFloat(text.replace(/[^\d.]/g, ''));
                    
                    if (!isNaN(cleanNumber)) {
                        animateCounter(statNumber, cleanNumber, 2000, isPercentage, isDecimal, hasPlus);
                    }
                });
                testimonialStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const testimonialStats = document.querySelector('.testimonials-stats');
    if (testimonialStats) {
        testimonialStatsObserver.observe(testimonialStats);
    }
});

// ===== CSS ANIMATIONS (injected via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .animate-pulse {
        animation: pulse 2s infinite;
    }
    
    .animate-fade-in-scale {
        animation: fadeInScale 0.5s ease-out;
    }
`;
document.head.appendChild(style); 