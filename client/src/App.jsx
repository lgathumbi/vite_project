import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DestinationList from './components/DestinationList';
import AddDestinationForm from './Pages/AddDestinationForm';
import ItineraryList from './Pages/ItineraryList';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [itineraries, setItineraries] = useState([]);

  return (
    <>
      <Router>
        <NavBar />
       
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DestinationList
                  destinations={destinations}
                  setDestinations={setDestinations}
                  setError={setError}
                />
                <AddDestinationForm
                  destinations={destinations}
                  setDestinations={setDestinations}
                  setError={setError}
                />
              </>
            }
          />
          <Route
            path="/itinerary"
            element={
              <ItineraryList
                itineraries={itineraries}
                setItineraries={setItineraries}
                setError={setError}  
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
