// Main JavaScript for Stark TH Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(95, 158, 160, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                
                // Hide header on scroll down, show on scroll up
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.style.background = 'rgba(95, 158, 160, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    body.classList.remove('nav-open');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update admin navigation on all pages
    updateAdminNavigation();
    
    // Initialize services page if we're on services.html
    if (document.querySelector('.services-hero')) {
        updateComparisonCount();
        initServiceAnimations();
    }
    
    // Add loading state to buttons
    initButtonLoadingStates();
    
    // Initialize form validation
    initFormValidation();
});

// Update admin navigation on all pages
function updateAdminNavigation() {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const adminNavItem = document.getElementById('admin-nav-item');
    
    if (adminNavItem) {
        if (isAdminLoggedIn) {
            adminNavItem.style.display = 'block';
        } else {
            adminNavItem.style.display = 'none';
        }
    }
}

// Update comparison count from localStorage
function updateComparisonCount() {
    const compareCountElement = document.getElementById('compare-count');
    if (compareCountElement) {
        const comparedCars = JSON.parse(localStorage.getItem('comparedCars')) || [];
        compareCountElement.textContent = comparedCars.length;
    }
}

// Initialize service animations
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card, .partner-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize button loading states
function initButtonLoadingStates() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn && !submitBtn.classList.contains('no-loading')) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                submitBtn.disabled = true;
                
                // Re-enable button after 5 seconds (fallback)
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.innerHTML = 'Submit';
                        submitBtn.disabled = false;
                    }
                }, 5000);
            }
        });
    });
}

// Initialize form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form[novalidate]');
    
    forms.forEach(form => {
        form.setAttribute('novalidate', 'true');
        
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                showFormErrors(this);
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

// Show form errors
function showFormErrors(form) {
    const invalidFields = form.querySelectorAll(':invalid');
    
    invalidFields.forEach(field => {
        validateField(field);
    });
    
    // Focus on first invalid field
    if (invalidFields.length > 0) {
        invalidFields[0].focus();
    }
}

// Validate individual field
function validateField(field) {
    const errorElement = field.parentNode.querySelector('.error-message') || 
                        document.createElement('div');
    
    if (!errorElement.classList.contains('error-message')) {
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    if (field.validity.valid) {
        field.classList.remove('error');
        errorElement.textContent = '';
    } else {
        field.classList.add('error');
        
        if (field.validity.valueMissing) {
            errorElement.textContent = 'This field is required.';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                errorElement.textContent = 'Please enter a valid email address.';
            }
        } else if (field.validity.tooShort) {
            errorElement.textContent = `Please enter at least ${field.minLength} characters.`;
        } else {
            errorElement.textContent = 'Please check this field.';
        }
    }
}

// Utility function to check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Utility function for debouncing
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

// Handle window resize with debounce
window.addEventListener('resize', debounce(function() {
    // Update any layout-specific functionality on resize
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
        }
    }
}, 250));

// Add CSS for error messages
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error-message {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .error {
        border-color: #e74c3c !important;
    }
    
    body.nav-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        body.nav-open::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
        }
    }
`;
document.head.appendChild(errorStyles);