const canvas = document.getElementById('speedometer');
const ctx = canvas.getContext('2d');

function drawSpeedometer() {
    if (!canvas || !ctx) {
        console.error('Canvas or context not found');
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 140;
    const maxSpeed = 120;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set white background
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    // Draw the* ▋
