// Function to calculate speed from position data
function calculateSpeed(previousPosition, currentPosition) {
    const distance = calculateDistance(previousPosition.coords.latitude, previousPosition.coords.longitude, currentPosition.coords.latitude, currentPosition.coords.longitude);
    const time = (currentPosition.timestamp - previousPosition.timestamp) / 1000; // time in seconds
    const speed = (distance / time) * 3.6; // convert m/s to km/h
    return speed;
}

// Function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}

// Function to start tracking speed
let watchId;
function startTracking() {
    let previousPosition = null;
    watchId = navigator.geolocation.watchPosition((position) => {
        if (previousPosition) {
            const speed = calculateSpeed(previousPosition, position);
            document.getElementById('speed').innerText = Math.round(speed);
            updateSpeed();
        }
        previousPosition = position;
    }, (error) => {
        console.error("Error getting position: ", error);
    }, {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 27000
    });
}

// Stop tracking function
function stopTracking() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}
