let watchId = null;

function startTracking() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(updateSpeed, showError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
        document.getElementById('status').innerText = 'Tracking...';
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById('status').innerText = 'Tracking stopped.';
    }
}

function updateSpeed(position) {
    const speed = position.coords.speed ?? 0;
    document.getElementById('speed').innerText = (speed * 3.6).toFixed(2); // Convert m/s to km/h
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

function openGeoWindow() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            window.open(`https://www.google.com/maps?q=${lat},${lon}`);
        }, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Compass functionality
const compass = document.getElementById('compass');
const compassCtx = compass.getContext('2d');
const centerX = compass.width / 2;
const centerY = compass.height / 2;
const radius = 40;

function updateCompass(direction) {
    compassCtx.clearRect(0, 0, compass.width, compass.height);

    // Draw outer circle
    compassCtx.beginPath();
    compassCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    compassCtx.strokeStyle = '#000';
    compassCtx.lineWidth = 2;
    compassCtx.stroke();

    // Draw direction needle
    const angle = direction * (Math.PI / 180); // Convert degrees to radians
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    compassCtx.beginPath();
    compassCtx.moveTo(centerX, centerY);
    compassCtx.lineTo(x, y);
    compassCtx.strokeStyle = '#f00';
    compassCtx.lineWidth = 2;
    compassCtx.stroke();
}

// Sample direction update (you need to implement actual direction update logic)
updateCompass(45); // Example: pointing northeast
