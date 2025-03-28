const canvas = document.getElementById('speedometer');
const ctx = canvas.getContext('2d');
const speedElement = document.getElementById('speed');
const statusElement = document.getElementById('status');

let watchId;
let geoWindow = null;

function drawSpeedometer(speed = 0) {
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

    // Draw the needle
    drawNeedle(speed);
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

function startTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
            updateSpeed,
            handleError,
            { enableHighAccuracy: true }
        );
        statusElement.textContent = 'Tracking...';
    } else {
        statusElement.textContent = 'Geolocation is not supported by this browser.';
    }
}

function stopTracking() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        statusElement.textContent = 'Tracking stopped.';
    }
}

function updateSpeed(position) {
    const speed = position.coords.speed ? position.coords.speed * 3.6 : 0; // Convert from m/s to km/h
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    speedElement.textContent = `${speed.toFixed(2)} km/h`;
    drawSpeedometer(speed);
    
    if (geoWindow && !geoWindow.closed) {
        geoWindow.document.body.innerText = `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`;
    }
}

function handleError(error) {
    console.error(error);
    statusElement.textContent = 'Error getting geolocation: ' + error.message;
}

function openGeoWindow() {
    if (!geoWindow || geoWindow.closed) {
        geoWindow = window.open('', 'GeoWindow', 'width=300,height=200');
        geoWindow.document.write('<html><head><title>Geolocation</title></head><body></body></html>');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    drawSpeedometer();
});
