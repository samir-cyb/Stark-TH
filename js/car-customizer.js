// 3D Car Customizer JavaScript

let scene, camera, renderer, car, controls;
let currentColor = '#2c3e50';

// Initialize 3D car customization
function initCarCustomizer() {
    const container = document.getElementById('car-3d-container');
    
    // Clear existing container
    container.innerHTML = '';
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add hemisphere light for more natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);
    
    // Create car
    createCar();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create 3D car model
function createCar() {
    // Clear existing car
    if (car) {
        scene.remove(car);
    }
    
    car = new THREE.Group();
    
    // Car body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({ 
        color: currentColor,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 0.5;
    car.add(body);
    
    // Car top
    const topGeometry = new THREE.BoxGeometry(1.8, 0.5, 2);
    const topMaterial = new THREE.MeshPhysicalMaterial({ 
        color: currentColor,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.castShadow = true;
    top.receiveShadow = true;
    top.position.y = 1;
    top.position.z = -0.5;
    car.add(top);
    
    // Windows
    const windowGeometry = new THREE.BoxGeometry(1.6, 0.4, 1.8);
    const windowMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x87ceeb,
        transmission: 0.9,
        opacity: 0.3,
        transparent: true,
        roughness: 0.1,
        metalness: 0
    });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.y = 1;
    window.position.z = -0.5;
    car.add(window);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    
    // Front left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.position.set(-1.1, 0.3, 1.2);
    wheelFL.castShadow = true;
    car.add(wheelFL);
    
    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(1.1, 0.3, 1.2);
    wheelFR.castShadow = true;
    car.add(wheelFR);
    
    // Rear left wheel
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRL.rotation.z = Math.PI / 2;
    wheelRL.position.set(-1.1, 0.3, -1.2);
    wheelRL.castShadow = true;
    car.add(wheelRL);
    
    // Rear right wheel
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRR.rotation.z = Math.PI / 2;
    wheelRR.position.set(1.1, 0.3, -1.2);
    wheelRR.castShadow = true;
    car.add(wheelRR);
    
    // Headlights
    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });
    
    // Left headlight
    const headlightL = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightL.position.set(-0.7, 0.6, 1.8);
    car.add(headlightL);
    
    // Right headlight
    const headlightR = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlightR.position.set(0.7, 0.6, 1.8);
    car.add(headlightR);
    
    // Taillights
    const taillightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const taillightMaterial = new THREE.MeshBasicMaterial({ color: 0xff3333 });
    
    // Left taillight
    const taillightL = new THREE.Mesh(taillightGeometry, taillightMaterial);
    taillightL.position.set(-0.7, 0.6, -1.8);
    car.add(taillightL);
    
    // Right taillight
    const taillightR = new THREE.Mesh(taillightGeometry, taillightMaterial);
    taillightR.position.set(0.7, 0.6, -1.8);
    car.add(taillightR);
    
    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    scene.add(car);
}

// Change car color
function changeCarColor(color) {
    currentColor = color;
    
    // Update all car body parts with the new color
    car.children.forEach(child => {
        if (child.material && child.material.color) {
            // Only change materials that are part of the car body (not windows, wheels, lights)
            if (child.material.transmission === undefined) {
                child.material.color.setStyle(color);
            }
        }
    });
}

// Handle window resize
function onWindowResize() {
    const container = document.getElementById('car-3d-container');
    if (container && container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (controls) {
        controls.update();
    }
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Clean up Three.js resources
function cleanupThreeJS() {
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
    }
    if (scene) {
        scene.traverse(object => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for color options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get color and name
            const color = this.getAttribute('data-color');
            const colorName = this.getAttribute('data-name');
            
            // Update selected color display
            document.getElementById('selected-color-name').textContent = colorName;
            
            // Change car color
            changeCarColor(color);
        });
    });
    
    // Reset camera button
    document.getElementById('reset-camera').addEventListener('click', function() {
        if (controls) {
            controls.reset();
        }
    });
    
    // Save customization button
    document.getElementById('save-customization').addEventListener('click', function() {
        const carName = document.getElementById('customize-car-name').textContent;
        const colorName = document.getElementById('selected-color-name').textContent;
        
        alert(`Your ${carName} has been customized with ${colorName} color!`);
        
        // Close modal
        document.getElementById('customize-modal').style.display = 'none';
        
        // Clean up Three.js resources
        cleanupThreeJS();
    });
    
    // Initialize 3D viewer when customize modal is opened
    const customizeModal = document.getElementById('customize-modal');
    const modalClose = customizeModal.querySelector('.modal__close');
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            cleanupThreeJS();
        });
    }
    
    customizeModal.addEventListener('click', function(e) {
        if (e.target === this) {
            cleanupThreeJS();
        }
    });
});