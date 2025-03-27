const canvas = document.getElementById('speedometer');
const ctx = canvas.getContext('2d');

function drawSpeedometer() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    const maxSpeed = 120;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000'; // Set stroke color
    ctx.lineWidth = 5; // Set line width for outer circle
    ctx.stroke();

    // Draw background ratings
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000'; // Set text color
    for (let i = 0; i <= maxSpeed; i += 10) {
        const angle = (i / maxSpeed) * Math.PI;
        const x = centerX + (radius - 20) * Math.cos(angle - Math.PI / 2);
        const y = centerY + (radius - 20) * Math.sin(angle - Math.PI / 2);
        ctx.fillText(i, x, y);
    }

    // Draw the needle (example position for 60 km/h)
    drawNeedle(60);
}

function drawNeedle(speed) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    const maxSpeed = 120;

    const angle = (speed / maxSpeed) * Math.PI - Math.PI / 2;
    const x = centerX + (radius - 30) * Math.cos(angle);
    const y = centerY + (radius - 30) * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'red'; // Change the color to red
    ctx.lineWidth = 5; // Make the needle thicker
    ctx.stroke();
}

drawSpeedometer();
