let lastPosition = null;
let watchId = null;

function startTracking() {
    if ("geolocation" in navigator) {
        document.getElementById("status").innerText = "Tracking speed...";
        watchId = navigator.geolocation.watchPosition(updateSpeed, handleError, {
            enableHighAccuracy: true, 
            maximumAge: 0, 
            timeout: 5000
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function updateSpeed(position) {
    if (position.coords.speed !== null) {
        let speedKmh = (position.coords.speed * 3.6).toFixed(2); // Convert m/s to km/h
        document.getElementById("speed").innerText = speedKmh;
    } else if (lastPosition) {
        let distance = getDistance(lastPosition, position.coords);
        let time = (position.timestamp - lastPosition.timestamp) / 1000; // Convert ms to seconds
        let speedKmh = (distance / time * 3.6).toFixed(2); // Convert m/s to km/h
        document.getElementById("speed").innerText = speedKmh;
    }
    lastPosition = position;
}

function getDistance(pos1, pos2) {
    const R = 6371e3; // Earth radius in meters
    const lat1 = pos1.latitude * Math.PI / 180;
    const lat2 = pos2.latitude * Math.PI / 180;
    const deltaLat = (pos2.latitude - pos1.latitude) * Math.PI / 180;
    const deltaLon = (pos2.longitude - pos1.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function handleError(error) {
    document.getElementById("status").innerText = "Error: " + error.message;
}
