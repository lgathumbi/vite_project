import React, { useState, useEffect } from "react";

function ItineraryList({ itineraries, setItineraries, setError }) {
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItinerary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItinerary.title || !newItinerary.start_date || !newItinerary.end_date) {
      setError("All fields are required.");
      return;
    }

    fetch("/api/itineraries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newItinerary.title,
        start_date: newItinerary.start_date,
        end_date: newItinerary.end_date,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message || 'Failed to add itinerary');
          });
        }
        return res.json();
      })
      .then((data) => {
        setItineraries((prevItineraries) => [...prevItineraries, data]);
        setNewItinerary({ title: "", start_date: "", end_date: "" });
      })
      .catch((error) => {
        console.error("Error adding itinerary:", error);
        setError("Failed to add itinerary.");
      });
  };

  useEffect(() => {
    fetch("/api/itineraries")
      .then((res) => res.json())
      .then((data) => {
        setItineraries(data);
      })
      .catch((error) => {
        console.error("Error fetching itineraries:", error);
        setError("Failed to load itineraries.");
      });
  }, [setItineraries, setError]);

  return (
    <div className="itinerary-list-container">
      <h2>Itineraries</h2>
      {Array.isArray(itineraries) && itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary.id} className="itinerary-card">
            <h3>{itinerary.title}</h3>
            <p>Start: {itinerary.start_date}</p>
            <p>End: {itinerary.end_date}</p>
          </div>
        ))
      ) : (
        <p>No itineraries available</p>
      )}

      {/* Add Itinerary Form */}
      <h3>Add a New Itinerary</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newItinerary.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={newItinerary.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={newItinerary.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Itinerary</button>
      </form>
    </div>
  );
}

export default ItineraryList;
