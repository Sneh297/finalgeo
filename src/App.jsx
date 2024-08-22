// Import the required React libraries
import React, { useState } from 'react';

function App() {
  // State variable to save the user's location
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    };

    try {
      const response = await fetch('http://your-server-url/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to find the user's geolocation
  const getUserLocation = () => {
    // If geolocation is supported by the user's browser
    if (navigator.geolocation) {
      // Get the current user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // Update the value of userLocation state variable
          setUserLocation({ latitude, longitude });
        },
        // If there was an error getting the user's location
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      // If geolocation is not supported by the user's browser
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Return an HTML page for the user to check their location
  return (
    <div>
      <h1>Geolocation App</h1>
      {/* Create a button that is mapped to the function which retrieves the user's location */}
      <button onClick={getUserLocation}>Get User Location</button>
      {/* If the userLocation variable has a value, print the user's location */}
      {userLocation.latitude && userLocation.longitude && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
      {/* Add a button to submit the location data */}
      <button onClick={handleSubmit}>Submit Location</button>
    </div>
  );
}

export default App;
