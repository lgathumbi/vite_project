import React, { useState, useEffect } from "react";

function DestinationList({ destinations, setDestinations, setError }) {
  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations.");
      });
  }, [setDestinations, setError]);

  const deleteDestination = (id) => {
    fetch(`/api/destinations/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setDestinations((prevDestinations) =>
            prevDestinations.filter((destination) => destination.id !== id)
          );
        } else {
          throw new Error('Failed to delete destination');
        }
      })
      .catch((error) => {
        console.error("Error deleting destination:", error);
        setError("Failed to delete destination.");
      });
  };

  const updateDestination = (id, updatedData) => {
    fetch(`/api/destinations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setDestinations((prevDestinations) =>
          prevDestinations.map((destination) =>
            destination.id === id ? data : destination
          )
        );
      })
      .catch((error) => {
        console.error("Error updating destination:", error);
        setError("Failed to update destination.");
      });
  };

  return (
    <div className="destination-container">
      <h2>Destinations</h2>

      {/* Display destinations list in styled boxes */}
      {Array.isArray(destinations) && destinations.length > 0 ? (
        destinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            <h3>{destination.name}</h3>
            <p>{destination.location}</p>

            <div className="destination-buttons">
              <button onClick={() => deleteDestination(destination.id)}>
                Delete
              </button>

              <button
                onClick={() => {
                  const newName = prompt("Enter new name:", destination.name);
                  const newLocation = prompt("Enter new location:", destination.location);
                  if (newName && newLocation) {
                    updateDestination(destination.id, {
                      name: newName,
                      location: newLocation,
                    });
                  }
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No destinations available</p>
      )}
    </div>
  );
}

export default DestinationList;
