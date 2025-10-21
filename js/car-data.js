// car-data.js - Shared vehicle data management
console.log('Loading car-data.js...');

const defaultCars = [
    {
        id: 1,
        name: "HILUX CHAMP",
        brand: "Toyota",
        price: 615000,
        displayPrice: "$615,000",
        type: "commercial",
        category: "commercial",
        image: "./assets/images/champ-removebg-preview.png",
        images: [
            "./assets/images/champ-removebg-preview.png",
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

// Car data management functions
class CarDataManager {
    constructor() {
        console.log('Initializing CarDataManager...');
        this.loadFromStorage();
    }

    // Load data from localStorage
    loadFromStorage() {
        try {
            const storedCars = localStorage.getItem('publishedCars');
            const storedHiddenCars = localStorage.getItem('hiddenCars');
            
            this.cars = storedCars ? JSON.parse(storedCars) : [...defaultCars];
            this.hiddenCars = storedHiddenCars ? JSON.parse(storedHiddenCars) : [];
            
            console.log(`Loaded ${this.cars.length} published cars and ${this.hiddenCars.length} hidden cars`);
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.cars = [...defaultCars];
            this.hiddenCars = [];
        }
    }

    // Save all data to localStorage
    saveToStorage() {
        try {
            localStorage.setItem('publishedCars', JSON.stringify(this.cars));
            localStorage.setItem('hiddenCars', JSON.stringify(this.hiddenCars));
            console.log('Data saved to storage');
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    // Generate new ID
    generateNewId() {
        const allIds = [...this.cars.map(c => c.id), ...this.hiddenCars.map(c => c.id)];
        return allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
    }

    // Add new car
    addCar(carData, isPublished = true) {
        const newCar = {
            id: this.generateNewId(),
            ...carData,
            isPublished,
            createdAt: new Date().toISOString()
        };

        if (isPublished) {
            this.cars.push(newCar);
            console.log(`Added new published car: ${newCar.name}`);
        } else {
            this.hiddenCars.push(newCar);
            console.log(`Added new hidden car: ${newCar.name}`);
        }

        this.saveToStorage();
        return newCar;
    }

    // Update existing car
    updateCar(carId, carData) {
        let car = this.cars.find(c => c.id === carId);
        let foundIn = 'published';
        
        if (!car) {
            car = this.hiddenCars.find(c => c.id === carId);
            foundIn = 'hidden';
        }

        if (car) {
            Object.assign(car, carData);
            this.saveToStorage();
            console.log(`Updated car ${carId} in ${foundIn} cars`);
            return true;
        }
        
        console.log(`Car ${carId} not found for update`);
        return false;
    }

    // Delete car
    deleteCar(carId) {
        const carIndex = this.cars.findIndex(c => c.id === carId);
        if (carIndex !== -1) {
            this.cars.splice(carIndex, 1);
            console.log(`Deleted published car ${carId}`);
        }

        const hiddenIndex = this.hiddenCars.findIndex(c => c.id === carId);
        if (hiddenIndex !== -1) {
            this.hiddenCars.splice(hiddenIndex, 1);
            console.log(`Deleted hidden car ${carId}`);
        }

        this.saveToStorage();
    }

    // Publish hidden car
    publishHiddenCar(carId) {
        const carIndex = this.hiddenCars.findIndex(c => c.id === carId);
        if (carIndex !== -1) {
            const car = this.hiddenCars[carIndex];
            car.isPublished = true;
            this.cars.push(car);
            this.hiddenCars.splice(carIndex, 1);
            this.saveToStorage();
            console.log(`Published hidden car ${carId}`);
            return true;
        }
        console.log(`Hidden car ${carId} not found for publishing`);
        return false;
    }

    // Get car by ID
    getCarById(carId) {
        return this.cars.find(c => c.id === carId) || this.hiddenCars.find(c => c.id === carId);
    }

    // Filter cars by category
    filterCarsByCategory(category, subcategory = null) {
        return this.cars.filter(car => {
            if (subcategory) {
                return car.category === category && car.subcategory === subcategory;
            } else {
                return car.category === category;
            }
        });
    }

    // Get all published cars
    getAllPublishedCars() {
        return this.cars;
    }

    // Get all hidden cars
    getAllHiddenCars() {
        return this.hiddenCars;
    }

    // Clear all data (for debugging)
    clearAllData() {
        this.cars = [...defaultCars];
        this.hiddenCars = [];
        this.saveToStorage();
        console.log('All data cleared and reset to defaults');
    }
}

// Create global instance
window.carDataManager = new CarDataManager();
console.log('CarDataManager initialized successfully');