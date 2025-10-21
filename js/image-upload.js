// image-upload.js - Handle image uploads from device
console.log('Loading image-upload.js...');

class ImageUploadManager {
    constructor() {
        this.uploadedImages = [];
        console.log('ImageUploadManager initialized');
    }

    // Initialize file input
    initFileInput(inputId, previewId) {
        console.log(`Initializing file input: ${inputId} with preview: ${previewId}`);
        const fileInput = document.getElementById(inputId);
        const previewContainer = document.getElementById(previewId);

        if (!fileInput) {
            console.error(`File input with ID '${inputId}' not found`);
            return;
        }

        if (!previewContainer) {
            console.error(`Preview container with ID '${previewId}' not found`);
            return;
        }

        fileInput.addEventListener('change', (e) => {
            console.log('File input changed, files selected:', e.target.files.length);
            this.handleFileSelect(e, previewContainer);
        });

        console.log(`File input ${inputId} initialized successfully`);
    }

    // Handle file selection
    handleFileSelect(event, previewContainer) {
        const files = event.target.files;
        this.uploadedImages = [];
        previewContainer.innerHTML = '';

        console.log(`Processing ${files.length} files`);

        if (files.length > 0) {
            if (!this.validateImages(files)) {
                event.target.value = ''; // Clear the input
                return;
            }

            Array.from(files).forEach((file, index) => {
                if (file.type.match('image.*')) {
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        const imageData = e.target.result;
                        this.uploadedImages.push(imageData);
                        this.createImagePreview(imageData, previewContainer, index);
                        console.log(`Image ${index + 1} loaded successfully`);
                    };
                    
                    reader.onerror = (error) => {
                        console.error('Error reading file:', error);
                        alert(`Error reading file: ${file.name}`);
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    alert(`File ${file.name} is not an image. Please select image files only.`);
                }
            });
        }
    }

    // Create image preview
    createImagePreview(imageData, container, index) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'image-preview-item';
        previewDiv.innerHTML = `
            <img src="${imageData}" alt="Preview ${index + 1}">
            <button type="button" class="remove-image" onclick="imageUploadManager.removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(previewDiv);
    }

    // Remove image from preview and array
    removeImage(index) {
        this.uploadedImages.splice(index, 1);
        this.refreshPreviews();
        console.log(`Removed image at index ${index}`);
    }

    // Refresh all previews
    refreshPreviews() {
        // This would need to be implemented based on your specific preview containers
        console.log('Refreshing image previews');
    }

    // Get uploaded images
    getUploadedImages() {
        console.log(`Returning ${this.uploadedImages.length} uploaded images`);
        return this.uploadedImages;
    }

    // Clear uploaded images
    clearUploadedImages() {
        this.uploadedImages = [];
        console.log('Cleared all uploaded images');
    }

    // Validate images (max 5 images, max 2MB each)
    validateImages(files) {
        if (files.length > 5) {
            alert('Maximum 5 images allowed');
            return false;
        }

        for (let file of files) {
            if (file.size > 2 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 2MB.`);
                return false;
            }
        }

        return true;
    }
}

// Create global instance
window.imageUploadManager = new ImageUploadManager();
console.log('ImageUploadManager ready');