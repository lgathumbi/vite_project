import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Home</Link>
        <ul className="flex space">
          <li className="nav-item">
            <Link to="/itinerary" className="nav-link active" aria-current="page">Itinerary</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
