# speedtest
**********************************************************************************This s application for testing the spped onthe deicces **************************************************************
The idea is to test the speed of any device we are traveling in at movement provided the devices that the application is operating on have gps enabled. 
Variables: last position and watchId are used to store the last known position and the geolocation watcher ID.
start tracking():
Check if the browser supports geolocation.
Changes the status message to "Tracking speed...".
Starts watching the position using navigator.geolocation.watchPosition().
updateSpeed(position):
If the position's speed is available, it converts it from meters/second to km/h and updates the speed display.
If the speed is not directly available but the last position is stored, it calculates the speed based on the distance traveled and time elapsed.
getDistance(pos1, pos2): Calculates the distance between two geographical positions using the Haversine formula.
handleError(error): Displays an error message if there is an issue retrieving the position.
