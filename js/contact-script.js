// Contact Page JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
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
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
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
    
    // Update admin navigation
    updateAdminNavigation();
    
    // Initialize contact form
    initContactForm();
    
    console.log('✅ Contact form JavaScript loaded successfully');
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

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log('📝 Contact form found, initializing...');
        console.log('🔗 Form action:', contactForm.action);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📨 Form submission started...');
            
            // Validate all fields before submission
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Please fix the errors in the form before submitting.', 'error');
                return;
            }
            
            // Set the reply-to email dynamically
            const emailInput = document.getElementById('email');
            const replyToInput = document.getElementById('replyTo');
            if (emailInput && replyToInput) {
                replyToInput.value = emailInput.value;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Send form data using Formspree
            const formData = new FormData(this);
            
            console.log('📤 Sending form data to Formspree...');
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                console.log('📥 Response status:', response.status);
                if (response.ok) {
                    // Success - reset form and show success message
                    contactForm.reset();
                    resetFormState(contactForm);
                    showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
                    console.log('✅ Form submitted successfully!');
                    
                    // Scroll to top to show the success message
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    // Server-side error (e.g., Formspree validation)
                    return response.json().then(data => {
                        let errorMessage = 'There was a problem submitting your form.';
                        if (data.errors) {
                            errorMessage = data.errors.map(error => error.message).join(', ');
                        } else if (data.error) {
                            errorMessage = data.error;
                        }
                        throw new Error(errorMessage);
                    });
                }
            })
            .catch(error => {
                // Network error or other thrown error
                console.error('❌ Form submission error:', error);
                
                let errorMessage = error.message || 'There was a problem sending your message. Please try again later.';
                
                // More specific error messages
                if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                }
                
                showNotification(errorMessage, 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                console.log('🔚 Form submission process completed');
            });
        });
    } else {
        console.error('❌ Contact form not found!');
    }
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const fieldType = field.type;
    const errorElement = document.getElementById(`${field.id}-error`);
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        setFieldError(field, `${field.labels[0].textContent} is required`);
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Name validation (minimum 2 characters)
    if (fieldName === 'name' && value && value.length < 2) {
        setFieldError(field, 'Name should be at least 2 characters long');
        return false;
    }
    
    // Message validation (minimum 10 characters)
    if (fieldName === 'message' && value && value.length < 10) {
        setFieldError(field, 'Message should be at least 10 characters long');
        return false;
    }
    
    // Subject validation (if it's a select field)
    if (fieldName === 'subject' && value === '') {
        setFieldError(field, 'Please select a subject');
        return false;
    }
    
    // If all validations pass
    setFieldSuccess(field);
    return true;
}

function setFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.className = 'form__message error';
    }
}

function setFieldSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.className = 'form__message';
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.className = 'form__message';
    }
}

// Utility function to handle form reset with better UX
function resetFormState(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('success', 'error');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.className = 'form__message';
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #27ae60;
            }
            
            .notification-error {
                border-left: 4px solid #e74c3c;
            }
            
            .notification-info {
                border-left: 4px solid #3498db;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }
            
            .notification-success .notification-content i {
                color: #27ae60;
            }
            
            .notification-error .notification-content i {
                color: #e74c3c;
            }
            
            .notification-info .notification-content i {
                color: #3498db;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.remove();
    });
    
    // Also remove notification when clicked anywhere on it (except close button)
    notification.addEventListener('click', (e) => {
        if (e.target === notification) {
            clearTimeout(autoRemove);
            notification.remove();
        }
    });
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateAdminNavigation();
    }
});