// Services Page JavaScript

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    updateComparisonCount();
    initServiceAnimations();
    initServiceInteractions();
    
    // Handle mobile-specific initializations
    if (isMobileDevice()) {
        initMobileOptimizations();
    }
});

// Update comparison count from localStorage
function updateComparisonCount() {
    const compareCountElement = document.getElementById('compare-count');
    if (compareCountElement) {
        const comparedCars = JSON.parse(localStorage.getItem('comparedCars')) || [];
        compareCountElement.textContent = comparedCars.length;
        
        // Hide compare badge if count is 0
        if (comparedCars.length === 0) {
            compareCountElement.style.display = 'none';
        } else {
            compareCountElement.style.display = 'flex';
        }
    }
}

// Initialize service animations
function initServiceAnimations() {
    // Add intersection observer for service cards
    const serviceCards = document.querySelectorAll('.service-card, .partner-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize service interactions
function initServiceInteractions() {
    // Add click handlers for service cards (for mobile touch)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Initialize partner brand tags interaction
    const brandTags = document.querySelectorAll('.brand-tag');
    brandTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Smooth scrolling for anchor links within the page
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
}

// Initialize mobile-specific optimizations
function initMobileOptimizations() {
    // Add touch-friendly class to body
    document.body.classList.add('touch-device');
    
    // Improve touch targets for better mobile experience
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .service-card, .partner-card, .brand-tag'
    );
    
    interactiveElements.forEach(element => {
        // Ensure minimum touch target size
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
            element.style.padding = '12px 16px';
        }
    });
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add lazy loading if not already present
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        // Ensure images don't overflow on mobile
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
    
    // Handle viewport height issues on mobile
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// Utility function to check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Handle service card expansions (if needed for future features)
function expandServiceCard(card) {
    card.classList.toggle('expanded');
    
    // Add smooth height transition
    if (card.classList.contains('expanded')) {
        card.style.maxHeight = card.scrollHeight + 'px';
    } else {
        card.style.maxHeight = '';
    }
}

// Initialize any accordion functionality for service details
function initServiceAccordions() {
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceDetails.forEach(detail => {
        const trigger = detail.querySelector('.service-detail-trigger');
        if (trigger) {
            trigger.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                this.setAttribute('aria-expanded', !isExpanded);
                content.style.maxHeight = isExpanded ? '0' : content.scrollHeight + 'px';
                
                // Rotate icon if present
                const icon = this.querySelector('.accordion-icon');
                if (icon) {
                    icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        }
    });
}

// Add loading states for any interactive elements
function initLoadingStates() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Revert after 5 seconds (fallback)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });
}

// Initialize any tooltips for partner brands
function initBrandTooltips() {
    const brandTags = document.querySelectorAll('.brand-tag');
    
    brandTags.forEach(tag => {
        // Simple tooltip on hover/touch
        tag.addEventListener('mouseenter', showBrandTooltip);
        tag.addEventListener('mouseleave', hideBrandTooltip);
        tag.addEventListener('touchstart', showBrandTooltip);
        tag.addEventListener('touchend', hideBrandTooltip);
    });
    
    function showBrandTooltip(e) {
        const brandName = this.textContent;
        let tooltip = document.getElementById('brand-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'brand-tooltip';
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 10000;
                pointer-events: none;
                transform: translateY(-100%);
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = `Learn more about ${brandName}`;
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = (e.pageY - 10) + 'px';
        tooltip.style.display = 'block';
    }
    
    function hideBrandTooltip() {
        const tooltip = document.getElementById('brand-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
}

// Performance optimization: Debounce scroll events
function initScrollOptimizations() {
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // Clear the timeout if it's already set
        clearTimeout(scrollTimeout);
        
        // Set a new timeout
        scrollTimeout = setTimeout(function() {
            // Handle any scroll-based animations or effects
            updateScrollEffects();
        }, 100);
    });
}

function updateScrollEffects() {
    // Add any scroll-based effects here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateComparisonCount();
    initServiceAnimations();
    initServiceInteractions();
    initServiceAccordions();
    initLoadingStates();
    initBrandTooltips();
    initScrollOptimizations();
    
    if (isMobileDevice()) {
        initMobileOptimizations();
    }
});

// Handle page visibility for better resource management
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or videos
        pauseAnimations();
    } else {
        // Page is visible, resume animations
        resumeAnimations();
    }
});

function pauseAnimations() {
    // Pause any running animations or videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
}

function resumeAnimations() {
    // Resume animations if needed
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.dataset.autoplay === 'true') {
            video.play().catch(e => console.log('Video autoplay prevented:', e));
        }
    });
}

// Export functions for global access if needed
window.ServicesPage = {
    initServiceAnimations,
    initMobileOptimizations,
    isMobileDevice
};