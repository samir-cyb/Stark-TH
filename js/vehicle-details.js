// Vehicle Details Page JavaScript

// DOM Elements
const vehicleDetailsContainer = document.getElementById('vehicle-details-container');
const vehicleNotFound = document.getElementById('vehicle-not-found');

// Initialize the vehicle details page
document.addEventListener('DOMContentLoaded', function() {
    loadVehicleDetails();
    initMobileOptimizations();
    initImageGallery();
});

// Load vehicle details based on URL parameter
function loadVehicleDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');
    
    if (!carId) {
        showVehicleNotFound();
        return;
    }
    
    // Get hidden cars from localStorage
    const hiddenCars = JSON.parse(localStorage.getItem('hiddenCars')) || [];
    const vehicle = hiddenCars.find(car => car.id === parseInt(carId));
    
    if (!vehicle) {
        showVehicleNotFound();
        return;
    }
    
    displayVehicleDetails(vehicle);
}

// Display vehicle details
function displayVehicleDetails(vehicle) {
    let featuresHTML = '';
    if (vehicle.features && vehicle.features.length > 0) {
        featuresHTML = vehicle.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('');
    }
    
    let specsHTML = '';
    if (vehicle.specs) {
        for (const [key, value] of Object.entries(vehicle.specs)) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            specsHTML += `<li><span>${formattedKey}:</span> <span>${value}</span></li>`;
        }
    }
    
    // Add identification details
    let identificationHTML = '';
    if (vehicle.vin) {
        identificationHTML += `<li><span>VIN:</span> <span>${vehicle.vin}</span></li>`;
    }
    if (vehicle.engineNumber) {
        identificationHTML += `<li><span>Engine Number:</span> <span>${vehicle.engineNumber}</span></li>`;
    }
    if (vehicle.registrationNo) {
        identificationHTML += `<li><span>Registration No.:</span> <span>${vehicle.registrationNo}</span></li>`;
    }
    if (vehicle.chassisNumber) {
        identificationHTML += `<li><span>Chassis Number:</span> <span>${vehicle.chassisNumber}</span></li>`;
    }
    
    vehicleDetailsContainer.innerHTML = `
        <div class="vehicle-details-container glass">
            <div class="vehicle-gallery">
                <div class="gallery-main">
                    <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-main-image" id="vehicle-main-image">
                    <button class="gallery-nav gallery-prev" aria-label="Previous image">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="gallery-nav gallery-next" aria-label="Next image">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="vehicle-thumbnails">
                    ${vehicle.images && vehicle.images.length > 0 ? 
                        vehicle.images.map((image, index) => `
                            <img src="${image}" alt="${vehicle.name} - View ${index + 1}" 
                                 class="vehicle-thumbnail ${index === 0 ? 'active' : ''}" 
                                 data-index="${index}"
                                 data-main="${image}">
                        `).join('') : 
                        `<img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-thumbnail active" data-index="0" data-main="${vehicle.image}">`
                    }
                </div>
            </div>
            <div class="vehicle-info">
                <h1>${vehicle.name}</h1>
                <p class="vehicle-price">${vehicle.displayPrice}</p>
                
                ${vehicle.description ? `<p class="vehicle-description">${vehicle.description}</p>` : ''}
                
                <div class="vehicle-specs">
                    <h3>Vehicle Identification</h3>
                    <ul>
                        ${identificationHTML}
                    </ul>
                </div>
                
                ${specsHTML ? `
                <div class="vehicle-specs">
                    <h3>Technical Specifications</h3>
                    <ul>
                        ${specsHTML}
                    </ul>
                </div>
                ` : ''}
                
                ${featuresHTML ? `
                <div class="vehicle-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${featuresHTML}
                    </ul>
                </div>
                ` : ''}
                
                <div class="vehicle-actions">
                    <a href="contact.html" class="btn btn--primary">
                        <i class="fas fa-envelope"></i> Contact Us
                    </a>
                    <a href="models.html" class="btn btn--secondary">
                        <i class="fas fa-car"></i> View Other Models
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Initialize gallery functionality
    initGalleryFunctionality(vehicle);
}

// Initialize gallery functionality
function initGalleryFunctionality(vehicle) {
    const mainImage = document.getElementById('vehicle-main-image');
    const thumbnails = document.querySelectorAll('.vehicle-thumbnail');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    let currentImageIndex = 0;
    const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.image];
    
    // Thumbnail click event
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showImage(index);
        });
        
        // Touch feedback for mobile
        thumb.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        thumb.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    mainImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mainImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            showNextImage();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            showPreviousImage();
        }
    }
    
    function showImage(index) {
        if (index >= 0 && index < images.length) {
            currentImageIndex = index;
            mainImage.src = images[index];
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[index].classList.add('active');
            
            // Scroll thumbnail into view on mobile
            if (window.innerWidth <= 768) {
                thumbnails[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }
    
    function showPreviousImage() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        showImage(newIndex);
    }
    
    function showNextImage() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        showImage(newIndex);
    }
    
    // Show first image
    showImage(0);
}

// Show vehicle not found message
function showVehicleNotFound() {
    vehicleDetailsContainer.style.display = 'none';
    vehicleNotFound.style.display = 'block';
}

// Initialize mobile optimizations
function initMobileOptimizations() {
    if (isMobileDevice()) {
        document.body.classList.add('touch-device');
        
        // Improve touch targets
        const interactiveElements = document.querySelectorAll(
            'button, .btn, .vehicle-thumbnail, .gallery-nav'
        );
        
        interactiveElements.forEach(element => {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
        });
        
        // Handle viewport height
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    }
}

// Initialize image gallery enhancements
function initImageGallery() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.add('error');
            this.alt = 'Failed to load image';
        });
    });
}

// Utility function to check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add CSS for gallery and mobile optimizations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .vehicle-details-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: start;
    }
    
    .vehicle-gallery {
        position: sticky;
        top: 100px;
    }
    
    .gallery-main {
        position: relative;
        margin-bottom: 1rem;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .vehicle-main-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        display: block;
        transition: opacity 0.3s ease;
    }
    
    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.9);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
        opacity: 0;
    }
    
    .gallery-prev {
        left: 1rem;
    }
    
    .gallery-next {
        right: 1rem;
    }
    
    .gallery-main:hover .gallery-nav {
        opacity: 1;
    }
    
    .vehicle-thumbnails {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding: 0.5rem 0;
    }
    
    .vehicle-thumbnail {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: var(--transition);
        flex-shrink: 0;
    }
    
    .vehicle-thumbnail.active,
    .vehicle-thumbnail:hover {
        border-color: var(--color-primary);
    }
    
    .vehicle-info h1 {
        color: var(--color-primary-dark);
        margin-bottom: 1rem;
        font-size: 2rem;
        line-height: 1.2;
    }
    
    .vehicle-price {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: 1.5rem;
    }
    
    .vehicle-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }
    
    .vehicle-specs,
    .vehicle-features {
        margin-bottom: 2rem;
    }
    
    .vehicle-specs h3,
    .vehicle-features h3 {
        color: var(--color-primary-dark);
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .vehicle-specs ul,
    .vehicle-features ul {
        list-style: none;
        padding: 0;
    }
    
    .vehicle-specs li {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .vehicle-specs li span:first-child {
        font-weight: 600;
        color: var(--color-text);
    }
    
    .vehicle-specs li span:last-child {
        color: #666;
    }
    
    .vehicle-features li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.3rem 0;
        color: #666;
    }
    
    .vehicle-features li i {
        color: var(--color-primary);
    }
    
    .vehicle-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 2rem;
    }
    
    .not-found-message {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;
    }
    
    .not-found-message i {
        font-size: 4rem;
        color: var(--color-primary);
        margin-bottom: 1.5rem;
    }
    
    .not-found-message h2 {
        color: var(--color-primary-dark);
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }
    
    .not-found-message p {
        font-size: 1.1rem;
        max-width: 500px;
        margin: 0 auto 2rem;
    }
    
    /* Mobile Styles */
    @media (max-width: 768px) {
        .vehicle-details-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .vehicle-gallery {
            position: static;
        }
        
        .vehicle-main-image {
            height: 300px;
        }
        
        .gallery-nav {
            opacity: 1;
            background: rgba(255, 255, 255, 0.8);
        }
        
        .vehicle-info h1 {
            font-size: 1.5rem;
        }
        
        .vehicle-price {
            font-size: 1.5rem;
        }
        
        .vehicle-actions {
            flex-direction: column;
        }
        
        .vehicle-actions .btn {
            width: 100%;
            text-align: center;
        }
        
        .vehicle-thumbnails {
            justify-content: center;
        }
    }
    
    @media (max-width: 480px) {
        .vehicle-main-image {
            height: 250px;
        }
        
        .vehicle-thumbnail {
            width: 70px;
            height: 50px;
        }
        
        .gallery-nav {
            width: 35px;
            height: 35px;
        }
        
        .not-found-message {
            padding: 3rem 1rem;
        }
        
        .not-found-message i {
            font-size: 3rem;
        }
        
        .not-found-message h2 {
            font-size: 1.5rem;
        }
    }
    
    /* Touch device improvements */
    .touch-device .gallery-nav {
        opacity: 1;
        background: rgba(255, 255, 255, 0.9);
    }
    
    .touch-device .vehicle-thumbnail:active {
        transform: scale(0.95);
    }
    
    /* Loading states */
    img:not(.loaded) {
        background: #f5f5f5;
        min-height: 200px;
    }
    
    img.error {
        background: #ffe6e6;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #e74c3c;
        font-style: italic;
    }
    
    /* Smooth transitions */
    .vehicle-details-container {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(additionalStyles);