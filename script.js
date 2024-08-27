document.addEventListener('DOMContentLoaded', () => {
    const sizeSelect = document.getElementById('size');
    const orientationSelect = document.getElementById('orientation');
    const gradientTypeSelect = document.getElementById('gradientType');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const gradientPreview = document.getElementById('gradientPreview');
    const saveBtn = document.getElementById('saveBtn');
    const body = document.body;

    // Define size mappings for the full-size download
    const sizes = {
        'small': { width: 960, height: 540 },
        'medium': { width: 1920, height: 1080 },
        'large': { width: 2880, height: 1620 },
        'extra-large': { width: 3840, height: 2160 }
    };

    function updateGradient() {
        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const gradientType = gradientTypeSelect.value;

        if (gradientType === 'linear') {
            gradientPreview.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
        } else if (gradientType === 'radial') {
            gradientPreview.style.background = `radial-gradient(circle, ${color1}, ${color2})`;
        }
    }

    function updateSizeAndOrientation() {
        const size = sizeSelect.value;
        const orientation = orientationSelect.value;
        const dimensions = sizes[size];

        // Update the body class for orientation
        body.className = `${size} ${orientation}`;
    }

    sizeSelect.addEventListener('change', updateSizeAndOrientation);
    orientationSelect.addEventListener('change', updateSizeAndOrientation);
    gradientTypeSelect.addEventListener('change', updateGradient);
    color1Input.addEventListener('input', updateGradient);
    color2Input.addEventListener('input', updateGradient);

    saveBtn.addEventListener('click', () => {
        const size = sizeSelect.value;
        const dimensions = sizes[size];

        // Create a canvas with the desired dimensions
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Apply the gradient to the canvas
        const gradient = (gradientTypeSelect.value === 'linear')
            ? ctx.createLinearGradient(0, 0, dimensions.width, 0)
            : ctx.createRadialGradient(dimensions.width / 2, dimensions.height / 2, 0, dimensions.width / 2, dimensions.height / 2, dimensions.width / 2);

        gradient.addColorStop(0, color1Input.value);
        gradient.addColorStop(1, color2Input.value);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Convert the canvas to a data URL and download it
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'gradient-background.png';
        link.click();
    });

    // Set initial values
    updateSizeAndOrientation();
    updateGradient(); // Set initial gradient
});
