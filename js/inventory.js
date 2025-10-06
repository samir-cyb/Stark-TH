// Inventory Page JavaScript

// Sample car data - In a real application, this would come from a database
const cars = [
    {
        id: 1,
        name: "Audi A4 Premium",
        brand: "audi",
        price: 41000,
        displayPrice: "$41,000",
        type: "sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "2.0L Engine", "Leather Seats", "Sunroof"],
        specs: {
            engine: "2.0L Turbocharged 4-cylinder",
            horsepower: "201 HP",
            torque: "236 lb-ft",
            transmission: "7-speed automatic",
            drivetrain: "Front-wheel drive",
            fuelEconomy: "27 city / 34 highway",
            seating: "5",
            color: "Metallic Gray"
        },
        brochure: "assets/brochures/audi-a4.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 2,
        name: "BMW 3 Series",
        brand: "bmw",
        price: 43500,
        displayPrice: "$43,500",
        type: "sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "2.0L Turbo", "Sport Package", "Navigation"],
        specs: {
            engine: "2.0L TwinPower Turbo 4-cylinder",
            horsepower: "255 HP",
            torque: "295 lb-ft",
            transmission: "8-speed automatic",
            drivetrain: "Rear-wheel drive",
            fuelEconomy: "26 city / 36 highway",
            seating: "5",
            color: "Alpine White"
        },
        brochure: "assets/brochures/bmw-3-series.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 3,
        name: "Mercedes C-Class",
        brand: "mercedes",
        price: 44200,
        displayPrice: "$44,200",
        type: "sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "Hybrid", "Premium Sound", "Panoramic Roof"],
        specs: {
            engine: "2.0L Turbocharged Hybrid 4-cylinder",
            horsepower: "255 HP",
            torque: "273 lb-ft",
            transmission: "9-speed automatic",
            drivetrain: "Rear-wheel drive",
            fuelEconomy: "25 city / 35 highway",
            seating: "5",
            color: "Obsidian Black"
        },
        brochure: "assets/brochures/mercedes-c-class.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 4,
        name: "Tesla Model 3",
        brand: "tesla",
        price: 42900,
        displayPrice: "$42,900",
        type: "sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Electric", "Autopilot", "Glass Roof", "Supercharging"],
        specs: {
            engine: "Dual Motor All-Wheel Drive",
            horsepower: "346 HP",
            torque: "389 lb-ft",
            transmission: "Single-speed automatic",
            drivetrain: "All-wheel drive",
            range: "315 miles",
            seating: "5",
            color: "Pearl White"
        },
        brochure: "assets/brochures/tesla-model-3.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 5,
        name: "Porsche 911 Carrera",
        brand: "porsche",
        price: 105000,
        displayPrice: "$105,000",
        type: "sports",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "3.0L Twin-Turbo", "Sport Chrono", "Premium Package"],
        specs: {
            engine: "3.0L Twin-Turbo Flat-6",
            horsepower: "379 HP",
            torque: "331 lb-ft",
            transmission: "8-speed PDK automatic",
            drivetrain: "Rear-wheel drive",
            fuelEconomy: "20 city / 24 highway",
            seating: "4",
            color: "Guards Red"
        },
        brochure: "assets/brochures/porsche-911.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 6,
        name: "Audi Q7",
        brand: "audi",
        price: 58000,
        displayPrice: "$58,000",
        type: "suv",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "3.0L V6", "Quattro AWD", "Third Row"],
        specs: {
            engine: "3.0L Turbocharged V6",
            horsepower: "335 HP",
            torque: "369 lb-ft",
            transmission: "8-speed automatic",
            drivetrain: "All-wheel drive",
            fuelEconomy: "19 city / 23 highway",
            seating: "7",
            color: "Navarra Blue"
        },
        brochure: "assets/brochures/audi-q7.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 7,
        name: "BMW X5",
        brand: "bmw",
        price: 63500,
        displayPrice: "$63,500",
        type: "suv",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "3.0L I6", "xDrive AWD", "Luxury Package"],
        specs: {
            engine: "3.0L TwinPower Turbo I6",
            horsepower: "335 HP",
            torque: "331 lb-ft",
            transmission: "8-speed automatic",
            drivetrain: "All-wheel drive",
            fuelEconomy: "21 city / 26 highway",
            seating: "5",
            color: "Phytonic Blue"
        },
        brochure: "assets/brochures/bmw-x5.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 8,
        name: "Mercedes GLE",
        brand: "mercedes",
        price: 58700,
        displayPrice: "$58,700",
        type: "suv",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "2.0L Turbo", "4MATIC AWD", "MBUX System"],
        specs: {
            engine: "2.0L Turbocharged 4-cylinder",
            horsepower: "255 HP",
            torque: "273 lb-ft",
            transmission: "9-speed automatic",
            drivetrain: "All-wheel drive",
            fuelEconomy: "22 city / 29 highway",
            seating: "5",
            color: "Polar White"
        },
        brochure: "assets/brochures/mercedes-gle.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 9,
        name: "Tesla Model Y",
        brand: "tesla",
        price: 54990,
        displayPrice: "$54,990",
        type: "suv",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Electric", "Dual Motor", "Autopilot", "Glass Roof"],
        specs: {
            engine: "Dual Motor All-Wheel Drive",
            horsepower: "384 HP",
            torque: "375 lb-ft",
            transmission: "Single-speed automatic",
            drivetrain: "All-wheel drive",
            range: "330 miles",
            seating: "7",
            color: "Midnight Silver"
        },
        brochure: "assets/brochures/tesla-model-y.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 10,
        name: "Porsche Cayenne",
        brand: "porsche",
        price: 72000,
        displayPrice: "$72,000",
        type: "suv",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "3.0L V6", "Sport Chrono", "Premium Package"],
        specs: {
            engine: "3.0L Turbocharged V6",
            horsepower: "335 HP",
            torque: "332 lb-ft",
            transmission: "8-speed automatic",
            drivetrain: "All-wheel drive",
            fuelEconomy: "19 city / 23 highway",
            seating: "5",
            color: "Jet Black"
        },
        brochure: "assets/brochures/porsche-cayenne.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 11,
        name: "BMW 4 Series Coupe",
        brand: "bmw",
        price: 48200,
        displayPrice: "$48,200",
        type: "coupe",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "2.0L Turbo", "M Sport Package", "Harman Kardon"],
        specs: {
            engine: "2.0L TwinPower Turbo 4-cylinder",
            horsepower: "255 HP",
            torque: "295 lb-ft",
            transmission: "8-speed automatic",
            drivetrain: "Rear-wheel drive",
            fuelEconomy: "25 city / 33 highway",
            seating: "4",
            color: "Portimao Blue"
        },
        brochure: "assets/brochures/bmw-4-series.pdf",
        isFavorite: false,
        isCompared: false
    },
    {
        id: 12,
        name: "Audi TT RS",
        brand: "audi",
        price: 72800,
        displayPrice: "$72,800",
        type: "sports",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ],
        features: ["2023 Model", "Automatic", "2.5L 5-Cylinder", "Quattro AWD", "Sport Exhaust"],
        specs: {
            engine: "2.5L Turbocharged 5-cylinder",
            horsepower: "394 HP",
            torque: "354 lb-ft",
            transmission: "7-speed automatic",
            drivetrain: "All-wheel drive",
            fuelEconomy: "19 city / 27 highway",
            seating: "4",
            color: "Tango Red"
        },
        brochure: "assets/brochures/audi-tt-rs.pdf",
        isFavorite: false,
        isCompared: false
    }
];

// State management
let state = {
    favoriteCars: JSON.parse(localStorage.getItem('favoriteCars')) || [],
    comparedCars: JSON.parse(localStorage.getItem('comparedCars')) || [],
    filteredCars: [...cars]
};

// DOM Elements
const showcaseContainer = document.getElementById('showcase-container');
const comparisonContainer = document.getElementById('comparison-container');
const compareCountElement = document.getElementById('compare-count');
const applyFiltersBtn = document.getElementById('apply-filters');
const orderModal = document.getElementById('order-modal');
const detailsModal = document.getElementById('details-modal');
const orderForm = document.getElementById('order-form');

// Initialize the inventory page
document.addEventListener('DOMContentLoaded', function() {
    renderProductCards();
    updateComparisonUI();
    initModals();
    initFilters();
});

// Render all product cards
function renderProductCards() {
    showcaseContainer.innerHTML = '';

    state.filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'product-card glass';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="product-card__image">
            <button class="product-card__favorite ${state.favoriteCars.includes(car.id) ? 'active' : ''}" data-id="${car.id}">
                <i class="fas fa-heart"></i>
            </button>
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
                <div class="product-card__compare">
                    <input type="checkbox" id="compare-${car.id}" ${state.comparedCars.includes(car.id) ? 'checked' : ''}>
                    <label for="compare-${car.id}">Add to Compare</label>
                </div>
            </div>
        `;
        showcaseContainer.appendChild(card);
    });

    attachCardEventListeners();
}

// Attach event listeners to product cards
function attachCardEventListeners() {
    // Favorite buttons
    document.querySelectorAll('.product-card__favorite').forEach(button => {
        button.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            toggleFavorite(carId, this);
        });
    });

    // Compare checkboxes
    document.querySelectorAll('.product-card__compare input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const carId = parseInt(this.getAttribute('id').split('-')[1]);
            toggleComparison(carId, this.checked);
        });
    });

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
}

// Toggle favorite status
function toggleFavorite(carId, buttonElement) {
    const index = state.favoriteCars.indexOf(carId);
    
    if (index > -1) {
        state.favoriteCars.splice(index, 1);
        buttonElement.classList.remove('active');
    } else {
        state.favoriteCars.push(carId);
        buttonElement.classList.add('active');
    }
    
    localStorage.setItem('favoriteCars', JSON.stringify(state.favoriteCars));
}

// Toggle comparison status
function toggleComparison(carId, isChecked) {
    if (isChecked) {
        if (!state.comparedCars.includes(carId) && state.comparedCars.length < 3) {
            state.comparedCars.push(carId);
        } else if (state.comparedCars.length >= 3) {
            alert('You can compare up to 3 vehicles at a time.');
            document.getElementById(`compare-${carId}`).checked = false;
            return;
        }
    } else {
        const index = state.comparedCars.indexOf(carId);
        if (index > -1) {
            state.comparedCars.splice(index, 1);
        }
    }
    
    localStorage.setItem('comparedCars', JSON.stringify(state.comparedCars));
    updateComparisonUI();
}

// Update comparison UI
function updateComparisonUI() {
    // Update count in navigation
    if (compareCountElement) {
        compareCountElement.textContent = state.comparedCars.length;
    }
    
    // Update comparison section
    if (state.comparedCars.length === 0) {
        comparisonContainer.innerHTML = '<p class="no-comparison">Select vehicles to compare by checking the "Compare" box on car cards</p>';
        return;
    }
    
    const comparedCars = cars.filter(car => state.comparedCars.includes(car.id));
    
    let comparisonHTML = `
        <div class="comparison-table-container">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        ${comparedCars.map(car => `<th>${car.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Image</td>
                        ${comparedCars.map(car => `<td><img src="${car.image}" alt="${car.name}" class="car-image"></td>`).join('')}
                    </tr>
                    <tr>
                        <td>Price</td>
                        ${comparedCars.map(car => `<td>${car.displayPrice}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Brand</td>
                        ${comparedCars.map(car => `<td>${car.brand.toUpperCase()}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Type</td>
                        ${comparedCars.map(car => `<td>${car.type}</td>`).join('')}
                    </tr>
    `;
    
    // Add features
    const allFeatures = [...new Set(comparedCars.flatMap(car => car.features))];
    allFeatures.forEach(feature => {
        comparisonHTML += `
            <tr>
                <td>${feature}</td>
                ${comparedCars.map(car => `<td>${car.features.includes(feature) ? '<i class="fas fa-check" style="color: green;"></i>' : '<i class="fas fa-times" style="color: red;"></i>'}</td>`).join('')}
            </tr>
        `;
    });
    
    comparisonHTML += `
                    <tr>
                        <td>Actions</td>
                        ${comparedCars.map(car => `
                            <td>
                                <button class="remove-compare" data-id="${car.id}">Remove</button>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    comparisonContainer.innerHTML = comparisonHTML;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-compare').forEach(button => {
        button.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            document.getElementById(`compare-${carId}`).checked = false;
            toggleComparison(carId, false);
        });
    });
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
            
            // Here you would typically send the data to your backend
            /*
            const formData = new FormData(orderForm);
            formData.append('car', car.name);
            
            fetch('/send-inquiry', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Inquiry sent successfully!');
                orderForm.reset();
                orderModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your inquiry. Please try again.');
            });
            */
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
        for (const [key, value] of Object.entries(car.specs)) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            specsHTML += `<li><span>${formattedKey}:</span> <span>${value}</span></li>`;
        }
        
        detailsContent.innerHTML = `
            <div class="details-gallery">
                <img src="${car.images[0]}" alt="${car.name}" class="details-main-image" id="details-main-image">
                <div class="details-thumbnails">
                    ${imagesHTML}
                </div>
            </div>
            <div class="details-info">
                <h2>${car.name}</h2>
                <p class="details-price">${car.displayPrice}</p>
                
                <div class="details-specs">
                    <h3>Key Features</h3>
                    <ul class="product-card__features">
                        ${car.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="details-specs">
                    <h3>Technical Specifications</h3>
                    <ul>
                        ${specsHTML}
                    </ul>
                </div>
                
                <a href="${car.brochure}" class="download-brochure" download>
                    <i class="fas fa-download"></i> Download E-Brochure
                </a>
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

// Initialize filters
function initFilters() {
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const brandFilter = document.getElementById('brand-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    
    state.filteredCars = cars.filter(car => {
        // Brand filter
        if (brandFilter !== 'all' && car.brand !== brandFilter) {
            return false;
        }
        
        // Price filter
        if (priceFilter !== 'all' && car.price > parseInt(priceFilter)) {
            return false;
        }
        
        // Type filter
        if (typeFilter !== 'all' && car.type !== typeFilter) {
            return false;
        }
        
        return true;
    });
    
    renderProductCards();
}