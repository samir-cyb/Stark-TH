// Models Page JavaScript

// Car data management
let cars = JSON.parse(localStorage.getItem('publishedCars')) || [
    {
        id: 1,
        name: "Ford Transit Commercial",
        brand: "ford",
        price: 35000,
        displayPrice: "$35,000",
        type: "commercial",
        category: "commercial",
        image: "https://images.unsplash.com/photo-1558618666-fcd25856cd23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25856cd23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25856cd23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Manual Transmission", "2.0L Diesel Engine", "Spacious Cargo", "GPS Navigation"],
        specs: {
            engine: "2.0L Turbo Diesel",
            horsepower: "130 HP",
            torque: "300 lb-ft",
            transmission: "6-speed manual",
            drivetrain: "Front-wheel drive",
            fuelEconomy: "25 city / 30 highway",
            cargoCapacity: "400 cubic feet",
            color: "White"
        },
        vin: "1HGCM82633A123456",
        engineNumber: "ENG123456789",
        registrationNo: "ABC123",
        chassisNumber: "CHS123456789",
        isPublished: true,
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Caterham Seven Kit Car",
        brand: "caterham",
        price: 45000,
        displayPrice: "$45,000",
        type: "sports",
        category: "kit",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["Build-It-Yourself Kit", "Lightweight Design", "Sport Suspension", "Racing Seats", "Carbon Fiber Parts"],
        specs: {
            engine: "2.0L 4-cylinder",
            horsepower: "237 HP",
            torque: "180 lb-ft",
            transmission: "5-speed manual",
            drivetrain: "Rear-wheel drive",
            fuelEconomy: "28 city / 36 highway",
            weight: "1190 lbs",
            color: "British Racing Green"
        },
        vin: "2HGCM82633A654321",
        engineNumber: "ENG987654321",
        registrationNo: "DEF456",
        chassisNumber: "CHS987654321",
        isPublished: true,
        createdAt: new Date().toISOString()
    }
];

// Hidden cars data (only visible to admin)
let hiddenCars = JSON.parse(localStorage.getItem('hiddenCars')) || [];

// State management
let state = {
    filteredCars: [],
    currentCategory: 'commercial',
    currentSubcategory: null,
    isAdminLoggedIn: localStorage.getItem('isAdminLoggedIn') === 'true'
};

// DOM Elements
const showcaseContainer = document.getElementById('showcase-container');
const categoryTitle = document.getElementById('category-title');
const noCategoryMessage = document.getElementById('no-category-selected');
const orderModal = document.getElementById('order-modal');
const detailsModal = document.getElementById('details-modal');
const adminLoginModal = document.getElementById('admin-login-modal');
const vehicleFormModal = document.getElementById('vehicle-form-modal');
const hiddenVehiclesModal = document.getElementById('hidden-vehicles-modal');
const qrModal = document.getElementById('qr-modal');
const orderForm = document.getElementById('order-form');
const adminLoginForm = document.getElementById('admin-login-form');
const vehicleForm = document.getElementById('vehicle-form');
const adminLoginBtn = document.getElementById('admin-login-btn');
const addVehicleBtn = document.getElementById('add-vehicle-btn');
const manageHiddenBtn = document.getElementById('manage-hidden-btn');
const categoryCards = document.querySelectorAll('.category-card');
const subcategoriesContainer = document.getElementById('special-vans-subcategories');
const subcategoryCards = document.querySelectorAll('.subcategory-card');
const adminNavItem = document.getElementById('admin-nav-item');
const adminControls = document.getElementById('admin-controls');
const vehicleCategorySelect = document.getElementById('vehicle-category');
const vehicleSubcategoryGroup = document.getElementById('vehicle-subcategory-group');

// Check if user was redirected after logout
const urlParams = new URLSearchParams(window.location.search);
const logoutParam = urlParams.get('logout');
if (logoutParam === 'true') {
    alert('You have been logged out successfully!');
    // Remove the logout parameter from URL
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
}

// Initialize the models page
document.addEventListener('DOMContentLoaded', function() {
    loadCarsFromStorage();
    initModals();
    initCategoryFilters();
    initAdminFeatures();
    updateAdminUI();
    
    // Update admin button if already logged in
    updateAdminButton();
    
    // Show commercial cars by default
    filterCarsByCategory('commercial');
});

// Load cars from localStorage
function loadCarsFromStorage() {
    const storedCars = JSON.parse(localStorage.getItem('publishedCars'));
    if (storedCars && storedCars.length > 0) {
        cars = storedCars;
    }
    
    const storedHiddenCars = JSON.parse(localStorage.getItem('hiddenCars'));
    if (storedHiddenCars) {
        hiddenCars = storedHiddenCars;
    }
}

// Save cars to localStorage
function saveCarsToStorage() {
    localStorage.setItem('publishedCars', JSON.stringify(cars));
    localStorage.setItem('hiddenCars', JSON.stringify(hiddenCars));
}

// Initialize modals
function initModals() {
    // Close modals when clicking the X
    document.querySelectorAll('.modal__close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Order form submission
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const carId = document.getElementById('order-car-id').value;
            const car = cars.find(c => c.id === parseInt(carId));
            
            // In a real application, you would send this data to your backend
            alert(`Thank you for your interest in the ${car.name}! We will contact you shortly.`);
            
            // Reset form and close modal
            orderForm.reset();
            orderModal.style.display = 'none';
        });
    }
    
    // Vehicle category change for subcategory visibility
    vehicleCategorySelect.addEventListener('change', function() {
        if (this.value === 'special-vans') {
            vehicleSubcategoryGroup.style.display = 'block';
        } else {
            vehicleSubcategoryGroup.style.display = 'none';
        }
    });
    
    // Vehicle form submission
    vehicleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const action = document.getElementById('vehicle-action').value;
        
        if (action === 'add') {
            addNewCar(true); // true for published
        } else if (action === 'edit') {
            updateCar();
        }
    });
    
    // Vehicle publish button
    document.getElementById('vehicle-publish-btn').addEventListener('click', function() {
        const action = document.getElementById('vehicle-action').value;
        
        if (action === 'add') {
            addNewCar(true); // true for published
        } else if (action === 'edit') {
            updateCar();
        }
    });
    
    // Vehicle hidden button
    document.getElementById('vehicle-hidden-btn').addEventListener('click', function() {
        addNewCar(false); // false for hidden
    });
    
    // Vehicle delete button
    document.getElementById('vehicle-delete-btn').addEventListener('click', function() {
        const carId = parseInt(document.getElementById('vehicle-id').value);
        deleteCar(carId);
    });
    
    // Initialize QR code modal
    initQRCodeModal();
}

// Initialize category filters
function initCategoryFilters() {
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show/hide subcategories for special vans
            if (category === 'special-vans') {
                subcategoriesContainer.style.display = 'block';
                state.currentSubcategory = null;
                
                // Remove active class from subcategory cards
                subcategoryCards.forEach(c => c.classList.remove('active'));
            } else {
                subcategoriesContainer.style.display = 'none';
                state.currentSubcategory = null;
            }
            
            // Filter cars by category
            filterCarsByCategory(category);
        });
    });
    
    // Subcategory cards
    subcategoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const subcategory = this.getAttribute('data-subcategory');
            
            // Remove active class from all subcategory cards
            subcategoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked subcategory card
            this.classList.add('active');
            
            // Filter cars by category and subcategory
            filterCarsByCategory('special-vans', subcategory);
        });
    });
}

// Filter cars by category
function filterCarsByCategory(category, subcategory = null) {
    state.currentCategory = category;
    state.currentSubcategory = subcategory;
    
    if (category === 'all') {
        state.filteredCars = [...cars];
        categoryTitle.textContent = 'All Vehicles';
    } else {
        state.filteredCars = cars.filter(car => {
            if (subcategory) {
                return car.category === category && car.subcategory === subcategory;
            } else {
                return car.category === category;
            }
        });
        
        // Update category title
        const categoryName = document.querySelector(`[data-category="${category}"] h3`).textContent;
        if (subcategory) {
            const subcategoryText = subcategory === 'ambulance' ? 'Ambulance' : 'Freezer Vans';
            categoryTitle.textContent = `${categoryName} - ${subcategoryText}`;
        } else {
            categoryTitle.textContent = categoryName;
        }
    }
    
    // Show/hide containers based on whether we have cars to show
    if (state.filteredCars.length > 0) {
        noCategoryMessage.style.display = 'none';
        showcaseContainer.style.display = 'grid';
        renderProductCards();
    } else {
        noCategoryMessage.style.display = 'block';
        showcaseContainer.style.display = 'none';
        showcaseContainer.innerHTML = '';
    }
}

// Render all product cards
function renderProductCards() {
    showcaseContainer.innerHTML = '';

    state.filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'product-card glass';
        card.innerHTML = `
            ${state.isAdminLoggedIn ? `
                <div class="product-card__admin-actions">
                    <button class="admin-action-btn edit-btn" data-id="${car.id}" title="Edit Vehicle">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="admin-action-btn delete-btn" data-id="${car.id}" title="Delete Vehicle">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            ` : ''}
            <img src="${car.image}" alt="${car.name}" class="product-card__image">
            <div class="product-card__content">
                <h3 class="product-card__title">${car.name}</h3>
                <p class="product-card__price">${car.displayPrice}</p>
                <ul class="product-card__features">
                    ${car.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <div class="product-card__actions">
                    <button class="product-card__btn btn--primary order-options" data-id="${car.id}">Order Options</button>
                    <button class="product-card__btn btn--secondary view-details" data-id="${car.id}">View Details</button>
                </div>
            </div>
        `;
        showcaseContainer.appendChild(card);
    });

    attachCardEventListeners();
}

// Attach event listeners to product cards
function attachCardEventListeners() {
    // Order Options buttons
    document.querySelectorAll('.order-options').forEach(button => {
        button.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            openOrderModal(carId);
        });
    });

    // View Details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            openDetailsModal(carId);
        });
    });
    
    // Admin edit buttons
    if (state.isAdminLoggedIn) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const carId = parseInt(this.getAttribute('data-id'));
                openEditModal(carId);
            });
        });
        
        // Admin delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const carId = parseInt(this.getAttribute('data-id'));
                if (confirm('Are you sure you want to delete this vehicle?')) {
                    deleteCar(carId);
                }
            });
        });
    }
}

// Open order modal
function openOrderModal(carId) {
    const car = cars.find(c => c.id === carId);
    
    if (car) {
        document.getElementById('order-car-id').value = carId;
        orderModal.style.display = 'block';
    }
}

// Open details modal
function openDetailsModal(carId) {
    const car = cars.find(c => c.id === carId);
    
    if (car) {
        const detailsContent = document.getElementById('details-content');
        
        let imagesHTML = '';
        car.images.forEach((image, index) => {
            imagesHTML += `
                <img src="${image}" alt="${car.name} - View ${index + 1}" 
                     class="details-thumbnail ${index === 0 ? 'active' : ''}" 
                     data-main="${image}">
            `;
        });
        
        let specsHTML = '';
        if (car.specs) {
            for (const [key, value] of Object.entries(car.specs)) {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                specsHTML += `<li><span>${formattedKey}:</span> <span>${value}</span></li>`;
            }
        }
        
        // Add identification details
        let identificationHTML = '';
        if (car.vin) {
            identificationHTML += `<li><span>VIN:</span> <span>${car.vin}</span></li>`;
        }
        if (car.engineNumber) {
            identificationHTML += `<li><span>Engine Number:</span> <span>${car.engineNumber}</span></li>`;
        }
        if (car.registrationNo) {
            identificationHTML += `<li><span>Registration No.:</span> <span>${car.registrationNo}</span></li>`;
        }
        if (car.chassisNumber) {
            identificationHTML += `<li><span>Chassis Number:</span> <span>${car.chassisNumber}</span></li>`;
        }
        
        detailsContent.innerHTML = `
            <div class="details-gallery">
                <img src="${car.images[0] || car.image}" alt="${car.name}" class="details-main-image" id="details-main-image">
                <div class="details-thumbnails">
                    ${imagesHTML || `<img src="${car.image}" alt="${car.name}" class="details-thumbnail active" data-main="${car.image}">`}
                </div>
            </div>
            <div class="details-info">
                <h2>${car.name}</h2>
                <p class="details-price">${car.displayPrice}</p>
                
                ${car.description ? `<p class="vehicle-description">${car.description}</p>` : ''}
                
                <div class="details-specs">
                    <h3>Vehicle Identification</h3>
                    <ul>
                        ${identificationHTML}
                    </ul>
                </div>
                
                <div class="details-specs">
                    <h3>Key Features</h3>
                    <ul class="product-card__features">
                        ${car.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                ${specsHTML ? `
                <div class="details-specs">
                    <h3>Technical Specifications</h3>
                    <ul>
                        ${specsHTML}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
        
        // Add event listeners to thumbnails
        document.querySelectorAll('.details-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const mainImage = document.getElementById('details-main-image');
                mainImage.src = this.getAttribute('data-main');
                
                // Update active thumbnail
                document.querySelectorAll('.details-thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        detailsModal.style.display = 'block';
    }
}

// Open edit modal
function openEditModal(carId) {
    const car = cars.find(c => c.id === carId);
    
    if (car) {
        document.getElementById('vehicle-form-title').textContent = 'Edit Vehicle';
        document.getElementById('vehicle-action').value = 'edit';
        document.getElementById('vehicle-id').value = car.id;
        
        // Fill form with car data
        document.getElementById('vehicle-name').value = car.name;
        document.getElementById('vehicle-brand').value = car.brand;
        document.getElementById('vehicle-price').value = car.price;
        document.getElementById('vehicle-category').value = car.category;
        
        if (car.category === 'special-vans' && car.subcategory) {
            vehicleSubcategoryGroup.style.display = 'block';
            document.getElementById('vehicle-subcategory').value = car.subcategory;
        } else {
            vehicleSubcategoryGroup.style.display = 'none';
        }
        
        document.getElementById('vehicle-vin').value = car.vin || '';
        document.getElementById('vehicle-engine').value = car.engineNumber || '';
        document.getElementById('vehicle-registration').value = car.registrationNo || '';
        document.getElementById('vehicle-chassis').value = car.chassisNumber || '';
        document.getElementById('vehicle-features').value = car.features ? car.features.join(', ') : '';
        document.getElementById('vehicle-description').value = car.description || '';
        document.getElementById('vehicle-images').value = car.images ? car.images.join(', ') : '';
        
        // Show delete button for existing vehicles
        document.getElementById('vehicle-delete-btn').style.display = 'block';
        
        vehicleFormModal.style.display = 'block';
    }
}

// Add new car
function addNewCar(isPublished) {
    const name = document.getElementById('vehicle-name').value;
    const brand = document.getElementById('vehicle-brand').value;
    const price = parseFloat(document.getElementById('vehicle-price').value);
    const category = document.getElementById('vehicle-category').value;
    const subcategory = category === 'special-vans' ? document.getElementById('vehicle-subcategory').value : null;
    const vin = document.getElementById('vehicle-vin').value;
    const engineNumber = document.getElementById('vehicle-engine').value;
    const registrationNo = document.getElementById('vehicle-registration').value;
    const chassisNumber = document.getElementById('vehicle-chassis').value;
    const features = document.getElementById('vehicle-features').value.split(',').map(f => f.trim()).filter(f => f);
    const description = document.getElementById('vehicle-description').value;
    const images = document.getElementById('vehicle-images').value.split(',').map(img => img.trim()).filter(img => img);
    
    // Generate a new ID
    const newId = Math.max(...cars.map(c => c.id), ...hiddenCars.map(c => c.id), 0) + 1;
    
    const newCar = {
        id: newId,
        name,
        brand,
        price,
        displayPrice: `$${price.toLocaleString()}`,
        type: category,
        category,
        subcategory,
        image: images[0] || 'https://images.unsplash.com/photo-1558618666-fcd25856cd23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1558618666-fcd25856cd23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'],
        features: features.length > 0 ? features : ['Standard Features Included'],
        description,
        vin,
        engineNumber,
        registrationNo,
        chassisNumber,
        isPublished,
        createdAt: new Date().toISOString()
    };
    
    if (isPublished) {
        cars.push(newCar);
        alert('Vehicle published successfully!');
    } else {
        hiddenCars.push(newCar);
        alert('Vehicle saved as hidden successfully!');
    }
    
    saveCarsToStorage();
    
    // Close modal and reset form
    vehicleFormModal.style.display = 'none';
    vehicleForm.reset();
    
    // Refresh the current view if published
    if (isPublished) {
        filterCarsByCategory(state.currentCategory, state.currentSubcategory);
    }
}

// Update existing car
function updateCar() {
    const carId = parseInt(document.getElementById('vehicle-id').value);
    const name = document.getElementById('vehicle-name').value;
    const brand = document.getElementById('vehicle-brand').value;
    const price = parseFloat(document.getElementById('vehicle-price').value);
    const category = document.getElementById('vehicle-category').value;
    const subcategory = category === 'special-vans' ? document.getElementById('vehicle-subcategory').value : null;
    const vin = document.getElementById('vehicle-vin').value;
    const engineNumber = document.getElementById('vehicle-engine').value;
    const registrationNo = document.getElementById('vehicle-registration').value;
    const chassisNumber = document.getElementById('vehicle-chassis').value;
    const features = document.getElementById('vehicle-features').value.split(',').map(f => f.trim()).filter(f => f);
    const description = document.getElementById('vehicle-description').value;
    const images = document.getElementById('vehicle-images').value.split(',').map(img => img.trim()).filter(img => img);
    
    // Find and update the car
    const carIndex = cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        cars[carIndex] = {
            ...cars[carIndex],
            name,
            brand,
            price,
            displayPrice: `$${price.toLocaleString()}`,
            type: category,
            category,
            subcategory,
            image: images[0] || cars[carIndex].image,
            images: images.length > 0 ? images : cars[carIndex].images,
            features: features.length > 0 ? features : cars[carIndex].features,
            description,
            vin,
            engineNumber,
            registrationNo,
            chassisNumber
        };
        
        saveCarsToStorage();
        alert('Vehicle updated successfully!');
        
        // Close modal and reset form
        vehicleFormModal.style.display = 'none';
        vehicleForm.reset();
        
        // Refresh the current view
        filterCarsByCategory(state.currentCategory, state.currentSubcategory);
    }
}

// Delete car
function deleteCar(carId) {
    // Remove from published cars
    const carIndex = cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        cars.splice(carIndex, 1);
    }
    
    // Remove from hidden cars
    const hiddenCarIndex = hiddenCars.findIndex(c => c.id === carId);
    if (hiddenCarIndex !== -1) {
        hiddenCars.splice(hiddenCarIndex, 1);
    }
    
    saveCarsToStorage();
    
    // Refresh the current view
    filterCarsByCategory(state.currentCategory, state.currentSubcategory);
    
    // If in hidden vehicles modal, refresh that too
    if (hiddenVehiclesModal.style.display === 'block') {
        loadHiddenVehicles();
    }
}

// Initialize admin features
function initAdminFeatures() {
    // Admin login button
    adminLoginBtn.addEventListener('click', function() {
        if (state.isAdminLoggedIn) {
            // Logout
            state.isAdminLoggedIn = false;
            localStorage.setItem('isAdminLoggedIn', 'false');
            updateAdminUI();
            updateAdminButton();
            alert('You have been logged out successfully!');
        } else {
            // Show login modal
            adminLoginModal.style.display = 'block';
        }
    });
    
    // Admin login form
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        
        // Simple authentication (in a real app, this would be server-side)
        if (username === 'admin' && password === 'admin123') {
            state.isAdminLoggedIn = true;
            localStorage.setItem('isAdminLoggedIn', 'true');
            updateAdminUI();
            updateAdminButton();
            adminLoginModal.style.display = 'none';
            adminLoginForm.reset();
            alert('Admin login successful!');
        } else {
            alert('Invalid username or password!');
        }
    });
    
    // Add vehicle button
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', function() {
            document.getElementById('vehicle-form-title').textContent = 'Add New Vehicle';
            document.getElementById('vehicle-action').value = 'add';
            document.getElementById('vehicle-id').value = '';
            vehicleForm.reset();
            vehicleSubcategoryGroup.style.display = 'none';
            document.getElementById('vehicle-delete-btn').style.display = 'none';
            vehicleFormModal.style.display = 'block';
        });
    }
    
    // Manage hidden vehicles button
    if (manageHiddenBtn) {
        manageHiddenBtn.addEventListener('click', function() {
            loadHiddenVehicles();
            hiddenVehiclesModal.style.display = 'block';
        });
    }
}

// Update admin UI based on login status
function updateAdminUI() {
    if (state.isAdminLoggedIn) {
        adminNavItem.style.display = 'block';
        adminControls.style.display = 'block';
    } else {
        adminNavItem.style.display = 'none';
        adminControls.style.display = 'none';
    }
    
    // Re-render product cards to show/hide admin actions
    if (state.filteredCars.length > 0) {
        renderProductCards();
    }
}

// Update admin button text and icon
function updateAdminButton() {
    if (state.isAdminLoggedIn) {
        adminLoginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        adminLoginBtn.title = 'Admin Logout';
    } else {
        adminLoginBtn.innerHTML = '<i class="fas fa-user-cog"></i>';
        adminLoginBtn.title = 'Admin Login';
    }
}

// Load hidden vehicles for admin
function loadHiddenVehicles() {
    const container = document.getElementById('hidden-vehicles-container');
    
    if (hiddenCars.length === 0) {
        container.innerHTML = '<p class="no-hidden-vehicles">No hidden vehicles found.</p>';
        return;
    }
    
    container.innerHTML = hiddenCars.map(car => `
        <div class="hidden-vehicle-card">
            <div class="hidden-vehicle-info">
                <img src="${car.image}" alt="${car.name}">
                <div>
                    <h4>${car.name}</h4>
                    <p>${car.displayPrice} • ${car.category}</p>
                    <small>Created: ${new Date(car.createdAt).toLocaleDateString()}</small>
                </div>
            </div>
            <div class="hidden-vehicle-actions">
                <button class="btn btn--primary publish-hidden-btn" data-id="${car.id}">Publish</button>
                <button class="btn btn--secondary edit-hidden-btn" data-id="${car.id}">Edit</button>
                <button class="btn btn--danger delete-hidden-btn" data-id="${car.id}">Delete</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to hidden vehicle buttons
    document.querySelectorAll('.publish-hidden-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            publishHiddenCar(carId);
        });
    });
    
    document.querySelectorAll('.edit-hidden-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            editHiddenCar(carId);
        });
    });
    
    document.querySelectorAll('.delete-hidden-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this hidden vehicle?')) {
                deleteHiddenCar(carId);
            }
        });
    });
}

// Publish hidden car
function publishHiddenCar(carId) {
    const carIndex = hiddenCars.findIndex(c => c.id === carId);
    
    if (carIndex !== -1) {
        const car = hiddenCars[carIndex];
        car.isPublished = true;
        
        // Move to published cars
        cars.push(car);
        hiddenCars.splice(carIndex, 1);
        
        saveCarsToStorage();
        loadHiddenVehicles();
        alert('Vehicle published successfully!');
    }
}

// Edit hidden car
function editHiddenCar(carId) {
    const car = hiddenCars.find(c => c.id === carId);
    
    if (car) {
        document.getElementById('vehicle-form-title').textContent = 'Edit Hidden Vehicle';
        document.getElementById('vehicle-action').value = 'edit';
        document.getElementById('vehicle-id').value = car.id;
        
        // Fill form with car data
        document.getElementById('vehicle-name').value = car.name;
        document.getElementById('vehicle-brand').value = car.brand;
        document.getElementById('vehicle-price').value = car.price;
        document.getElementById('vehicle-category').value = car.category;
        
        if (car.category === 'special-vans' && car.subcategory) {
            vehicleSubcategoryGroup.style.display = 'block';
            document.getElementById('vehicle-subcategory').value = car.subcategory;
        } else {
            vehicleSubcategoryGroup.style.display = 'none';
        }
        
        document.getElementById('vehicle-vin').value = car.vin || '';
        document.getElementById('vehicle-engine').value = car.engineNumber || '';
        document.getElementById('vehicle-registration').value = car.registrationNo || '';
        document.getElementById('vehicle-chassis').value = car.chassisNumber || '';
        document.getElementById('vehicle-features').value = car.features ? car.features.join(', ') : '';
        document.getElementById('vehicle-description').value = car.description || '';
        document.getElementById('vehicle-images').value = car.images ? car.images.join(', ') : '';
        
        // Show delete button
        document.getElementById('vehicle-delete-btn').style.display = 'block';
        
        // Close hidden vehicles modal and open edit modal
        hiddenVehiclesModal.style.display = 'none';
        vehicleFormModal.style.display = 'block';
    }
}

// Delete hidden car
function deleteHiddenCar(carId) {
    const carIndex = hiddenCars.findIndex(c => c.id === carId);
    
    if (carIndex !== -1) {
        hiddenCars.splice(carIndex, 1);
        saveCarsToStorage();
        loadHiddenVehicles();
        alert('Hidden vehicle deleted successfully!');
    }
}

// QR Code Modal Functions
function initQRCodeModal() {
    // Download QR Code button
    document.getElementById('download-qr').addEventListener('click', function() {
        downloadQRCode();
    });
    
    // Close QR Code button
    document.getElementById('close-qr').addEventListener('click', function() {
        qrModal.style.display = 'none';
    });
}

// Generate QR Code for a car
function generateQRCode(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) {
        alert('Car not found!');
        return;
    }
    
    const qrCodeDiv = document.getElementById('qr-code');
    const debugInfo = document.getElementById('debug-info');
    const debugContent = document.getElementById('debug-content');
    
    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Create car data for QR code
    const carData = {
        id: car.id,
        name: car.name,
        brand: car.brand,
        price: car.price,
        category: car.category,
        vin: car.vin,
        engineNumber: car.engineNumber,
        registrationNo: car.registrationNo,
        chassisNumber: car.chassisNumber,
        timestamp: new Date().toISOString()
    };
    
    // Convert to JSON string
    const qrData = JSON.stringify(carData);
    
    // Debug info
    debugContent.innerHTML = `
        <div>Data: ${qrData}</div>
        <div>Length: ${qrData.length} characters</div>
    `;
    debugInfo.style.display = 'block';
    
    try {
        // Generate QR code using the library
        const qr = qrcode(0, 'M');
        qr.addData(qrData);
        qr.make();
        
        // Create QR code image
        const qrImage = qr.createImgTag(4);
        qrCodeDiv.innerHTML = qrImage;
        
        // Show the modal
        qrModal.style.display = 'block';
    } catch (error) {
        console.error('QR Code generation error:', error);
        qrCodeDiv.innerHTML = '<p class="error">Error generating QR code. Please try again.</p>';
        debugContent.innerHTML += `<div class="error">Error: ${error.message}</div>`;
        qrModal.style.display = 'block';
    }
}

// Download QR Code as PNG
function downloadQRCode() {
    const qrImage = document.querySelector('#qr-code img');
    if (qrImage) {
        const link = document.createElement('a');
        link.download = 'vehicle-qr-code.png';
        link.href = qrImage.src;
        link.click();
    } else {
        alert('No QR code available to download.');
    }
}