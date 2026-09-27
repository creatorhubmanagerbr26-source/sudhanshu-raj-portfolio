// ==================== MOBILE NAVIGATION ==================== //
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
    }
});

// ==================== SCROLL ANIMATIONS ==================== //
const revealElements = () => {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(reveal => {
        const revealItems = reveal.querySelectorAll('.education-card, .experience-card, .skill-card, .work-card, .about-text, .contact-item');
        
        revealItems.forEach(item => {
            if (item.parentElement === reveal || item.closest('section') === reveal) {
                const windowHeight = window.innerHeight;
                const elementTop = item.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    item.classList.add('active');
                }
            }
        });
    });
};

// Add initial animation class
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.education-card, .experience-card, .skill-card, .work-card');
    cards.forEach(card => {
        card.classList.add('reveal');
    });
    
    const texts = document.querySelectorAll('.about-text');
    texts.forEach(text => {
        text.classList.add('reveal');
    });
    
    const items = document.querySelectorAll('.contact-item');
    items.forEach(item => {
        item.classList.add('reveal');
    });
});

// Trigger animations on scroll
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ==================== CONTACT FORM HANDLING ==================== //
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showFormStatus('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return;
    }
    
    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    
    try {
        // Using formspree.io for form submission (free service)
        const response = await fetch('https://formspree.io/f/mblrqqzz', {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            showFormStatus('Message sent successfully! Thank you for reaching out.', 'success');
            contactForm.reset();
            
            // Reset success message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('success');
                formStatus.textContent = '';
            }, 5000);
        } else {
            showFormStatus('Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('Error sending message. Please check your connection.', 'error');
    }
});

// Show form status message
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SMOOTH SCROLL & NAVIGATION HIGHLIGHTING ==================== //
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ==================== //
window.addEventListener('load', () => {
    // Trigger reveal animations
    revealElements();
});

// ==================== UTILITY FUNCTIONS ==================== //

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== PERFORMANCE OPTIMIZATION ==================== //

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== LAZY LOADING FOR IMAGES ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== ACCESSIBILITY ENHANCEMENTS ==================== //

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ==================== CONSOLE MESSAGE ==================== //
console.log('%c Welcome to Sudhanshu Raj\'s Portfolio ', 'background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Building quality education through EdTech ', 'color: #06b6d4; font-size: 14px; font-style: italic;');

// ==================== PAGE LOAD TRACKING ==================== //
window.addEventListener('load', () => {
    console.log('Portfolio fully loaded');
});

// ==================== RESPONSIVE DESIGN HELPER ==================== //
function getViewportSize() {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

// Log viewport size on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const size = getViewportSize();
        console.log(`Viewport: ${size.width}x${size.height}`);
    }, 250);
});
