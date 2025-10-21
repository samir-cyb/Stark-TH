// Services Page JavaScript

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    initServiceAnimations();
    initFlagInteractions();
    
    // Handle mobile-specific initializations
    if (isMobileDevice()) {
        initMobileOptimizations();
    }
    
    // Initialize scroll optimizations
    initScrollOptimizations();
});

// Initialize service animations
function initServiceAnimations() {
    // Add intersection observer for service cards
    const serviceCards = document.querySelectorAll('.simple-service');
    
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

// Initialize flag interactions
function initFlagInteractions() {
    const flagItems = document.querySelectorAll('.flag-item');
    const companiesContainer = document.getElementById('companies-container');
    
    // Define company data for each country
    const companiesData = {
        australia: [
            "Australian Automotive Group",
            "Down Under Motors",
            "Kangaroo Car Company",
            "Outback Vehicles Ltd",
            "Sydney Auto Works",
            "Melbourne Motors"
        ],
        japan: [
            "Tokyo Motors Corporation",
            "Samurai Auto Works",
            "Fuji Automotive",
            "Kyoto Car Manufacturers",
            "Osaka Vehicle Solutions",
            "Nippon Auto Tech"
        ],
        uk: [
            "British Motor Works",
            "London Automotive Ltd",
            "Manchester Motors",
            "Scottish Car Company",
            "Birmingham Auto Group",
            "Liverpool Vehicle Solutions"
        ],
        bangladesh: [
            "Dhaka Automotive",
            "Bengal Motors",
            "Chittagong Car Company",
            "Bangladesh Vehicle Works",
            "Khulna Auto Tech",
            "Sylhet Motors Ltd"
        ],
        kenya: [
            "Kenya Motors Ltd",
            "East African Automotive",
            "Savannah Car Company",
            "Kenya Vehicle Works",
            "Nairobi Auto Group",
            "Mombasa Motors"
        ]
    };
    
    flagItems.forEach(flag => {
        flag.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            const companies = companiesData[country];
            
            // Remove active class from all flags
            flagItems.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked flag
            this.classList.add('active');
            
            // Show loading state
            companiesContainer.classList.add('loading');
            
            // Update companies container with slight delay for better UX
            setTimeout(() => {
                if (companies && companies.length > 0) {
                    companiesContainer.innerHTML = `
                        <h3>Our Partners in ${this.querySelector('.flag-name').textContent}</h3>
                        <div class="companies-list">
                            ${companies.map(company => `<div class="company-item">${company}</div>`).join('')}
                        </div>
                    `;
                } else {
                    companiesContainer.innerHTML = `<p>No partners found for ${this.querySelector('.flag-name').textContent}</p>`;
                }
                
                // Remove loading state
                companiesContainer.classList.remove('loading');
            }, 300);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Touch feedback for mobile
        flag.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        flag.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialize mobile-specific optimizations
function initMobileOptimizations() {
    // Add touch-friendly class to body
    document.body.classList.add('touch-device');
    
    // Improve touch targets for better mobile experience
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .simple-service, .flag-item'
    );
    
    interactiveElements.forEach(element => {
        // Ensure minimum touch target size
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
            element.style.display = 'flex';
            element.style.alignItems = 'center';
            element.style.justifyContent = 'center';
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
    initFlagInteractions,
    initMobileOptimizations,
    isMobileDevice
};