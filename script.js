const compassCtx = compass.getContext('2d');

if (!compass || !compassCtx) {
    console.error('Compass canvas or context not found');
    return;
}

const centerX = compass.width / 2;
const centerY = compass.height / 2;
const radius = 40;

compassCtx.clearRect(0, 0, compass.width, compass.height);

// Draw outer circle
compassCtx.beginPath();
compassCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
compassCtx.strokeStyle = '#000';
compassCtx.lineWidth = 2;
compassCtx.stroke();

// Draw direction needle
const angle = direction * (Math.PI / 180); // Convert
const x = centerX + radius * Math.cos(angle - Math.PI);
const y =
