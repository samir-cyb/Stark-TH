// Services Page JavaScript

// Initialize services page
document.addEventListener('DOMContentLoaded', function() {
    updateComparisonCount();
    initServiceAnimations();
});

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
    // Add intersection observer for service cards
    const serviceCards = document.querySelectorAll('.service-card, .partner-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}