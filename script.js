// Apple-style JavaScript for Alpha 影控 Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot-item, .camera-series');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Screenshot hover effects
    const screenshots = document.querySelectorAll('.screenshot');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        screenshot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = 'none';
                
                // Create hamburger menu button
                const hamburger = document.createElement('button');
                hamburger.innerHTML = '☰';
                hamburger.className = 'mobile-menu-toggle';
                hamburger.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: block;
                `;
                
                const navContainer = document.querySelector('.nav-container');
                navContainer.appendChild(hamburger);
                
                hamburger.addEventListener('click', () => {
                    const isVisible = navLinks.style.display === 'flex';
                    navLinks.style.display = isVisible ? 'none' : 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '70px';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.background = 'var(--background-primary)';
                    navLinks.style.padding = 'var(--spacing-lg)';
                    navLinks.style.boxShadow = '0 4px 20px var(--shadow-light)';
                });
            }
        }
    };
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.mobile-menu-toggle');
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.background = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.boxShadow = 'none';
            }
            if (hamburger) {
                hamburger.remove();
            }
        } else {
            createMobileMenu();
        }
    });
    
    // Initialize mobile menu on load
    createMobileMenu();
    
    // Preload images for better performance
    const preloadImages = () => {
        const images = [
            'screenshots/IMG_5946-portrait.png',
            'screenshots/IMG_5947-portrait.png',
            'screenshots/IMG_5948-portrait.png',
            'screenshots/IMG_5949-portrait.png',
            'screenshots/IMG_5950-portrait.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    preloadImages();
    
    // Dark mode detection and handling
    const handleDarkMode = () => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        const updateNavbarForDarkMode = () => {
            const navbar = document.querySelector('.navbar');
            if (prefersDark.matches) {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        };
        
        prefersDark.addEventListener('change', updateNavbarForDarkMode);
        updateNavbarForDarkMode();
    };
    
    handleDarkMode();
    
    // Add loading state for download button
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state or analytics tracking here
            console.log('Download button clicked');
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-screenshot');
        
        if (heroImage) {
            const rate = scrolled * -0.3;
            heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
        }
    });
});

// Utility function for smooth animations
const animateOnScroll = (element, animationClass, threshold = 0.1) => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                }
            });
        },
        { threshold }
    );
    
    observer.observe(element);
};

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Add smooth scroll behavior for better UX
const smoothScrollTo = (element, duration = 1000) => {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    requestAnimationFrame(animation);
};