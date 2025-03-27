let watchId = null;
let lastPosition = null;
let speed = 0;
const speedDisplay = document.getElementById('speed');
const statusDisplay = document.getElementById('status');
const speedometer = document.getElementById('speedometer');
const ctx = speedometer.getContext('2d');

function startTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(updateSpeed, showError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
        statusDisplay.innerText = "Tracking GPS...";
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        statusDisplay.innerText = "Tracking stopped.";
        speed = 0;
        speedDisplay.innerText = speed;
        drawSpeedometer(speed);
    }
}

// Function to update speed based on geolocation data
function updateSpeed(position) {
    if (lastPosition) {
        const distance = calculateDistance(lastPosition.coords, position.coords);
        const time = (position.timestamp - lastPosition.timestamp) / 1000; // in seconds
        speed = (distance / time) * 3.6; // m/s to km/h
    }
    lastPosition = position;
    speedDisplay.innerText = speed.toFixed(2);
    drawSpeedometer(speed);
}

// Function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(coords1, coords2) {
    const R = 6371e3; // metres
    const φ1 = coords1.latitude * Math.PI/180; // φ, λ in radians
    const φ2 = coords2.latitude * Math.PI/180;
    const Δφ = (coords2.latitude - coords1.latitude) * Math.PI/180;
    const Δλ = (coords2.longitude - coords1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // in metres
    return distance;
}

// Function to handle geolocation errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            statusDisplay.innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            statusDisplay.innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            statusDisplay.innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            statusDisplay.innerText = "An unknown error occurred.";
            break;
    }
}

// Function to draw the speedometer
function drawSpeedometer(speed) {
    const maxSpeed = 200; // max speed for the speedometer
    const angle = (speed / maxSpeed) * 2 * Math.PI;

    ctx.clearRect(0, 0, speedometer.width, speedometer.height);

    // Draw speedometer background
    ctx.beginPath();
    ctx.arc(150, 150, 140, 0, 2 * Math.PI);
    ctx.fillStyle = 'lightgrey';
    ctx.fill();

    // Draw speedometer needle
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(150 + 140 * Math.cos(angle - Math.PI / 2), 150 + 140 * Math.sin(angle - Math.PI / 2));
    ctx.strokeStyle = getSpeedColor(speed);
    ctx.lineWidth = 5;
    ctx.stroke();

    // Draw speedometer border
    ctx.beginPath();
    ctx.arc(150, 150, 140, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to get color based on speed
function getSpeedColor(speed) {
    if (speed < 50) return 'green';
    if (speed < 100) return 'yellow';
    if (speed < 150) return 'orange';
    return 'red';
}
