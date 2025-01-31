import React, { useState } from "react";

function AddDestinationForm({ destinations, setDestinations, setError }) {
  const [destinationData, setDestinationData] = useState({
    name: "",
    location: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setDestinationData({
      ...destinationData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!destinationData.name || !destinationData.location) {
      setError("Both name and location are required.");
      return;
    }

    const newDestination = { ...destinationData, id: Date.now() };

    fetch('/api/destinations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDestination),
    })
      .then((res) => res.json())
      .then((data) => {
        setDestinations([...destinations, data]);
        setDestinationData({ name: "", location: "" });
        setError(null); 
      })
      .catch((error) => {
        console.error("Error adding destination:", error);
        setError("Failed to add destination.");
      });
  }

  return (
    <div>
      <h2>Add New Destination</h2>

      {/* Destination form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Destination Name"
          value={destinationData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={destinationData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
}

export default AddDestinationForm;
