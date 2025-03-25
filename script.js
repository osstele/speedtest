// Function to draw the speedometer
function drawSpeedometer(speed) {
    const canvas = document.getElementById('speedometer');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(150, 150, 140, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(150, 150, 120, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the colored zones
    drawZone(ctx, 20, 40, 'green');
    drawZone(ctx, 40, 80, 'orange');
    drawZone(ctx, 80, 180, 'red');

    // Draw the speed index
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    for (let i = 0; i <= 180; i += 20) {
        const angle = (i - 90) * (Math.PI / 180);
        const x = 150 + Math.cos(angle) * 100;
        const y = 150 + Math.sin(angle) * 100;
        ctx.fillText(i, x - 10, y + 5);
    }

    // Draw the needle
    const needleAngle = (speed - 90) * (Math.PI / 180);
    const needleX = 150 + Math.cos(needleAngle) * 100;
    const needleY = 150 + Math.sin(needleAngle) * 100;

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = '#00008B'; // Darker needle color
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw digital display
    ctx.font = '30px Arial';
    ctx.fillStyle = '#FF0000';
    ctx.fillText(`${speed} km/h`, 100, 200);
}

// Function to draw colored zones
function drawZone(ctx, start, end, color) {
    const startAngle = (start - 90) * (Math.PI / 180);
    const endAngle = (end - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.arc(150, 150, 130, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
}

// Function to update speed
function updateSpeed() {
    const speedElement = document.getElementById('speed');
    const speed = parseInt(speedElement.innerText);
    drawSpeedometer(speed);
}

// Mock function to start tracking speed
function startTracking() {
    let speed = 0;
    setInterval(() => {
        speed = (speed + 10) % 180;
        document.getElementById('speed').innerText = speed;
        updateSpeed();
    }, 1000);
}

// Initial draw
drawSpeedometer(0);
