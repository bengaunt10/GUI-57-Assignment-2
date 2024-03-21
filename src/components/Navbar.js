// Importing necessary modules and resources
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import three_bars_icon from '../three-bars-icon.jpg'; // Importing three bars icon image
import "../styles/nav.css"; // Importing CSS styles

// Navbar component
function Navbar() {
    // State variable to manage navbar open/close state
    const [navOpen, setNavOpen] = useState(false);

    // Function to open navbar
    const openNav = () => {
        setNavOpen(true);
    }

    // Function to close navbar
    const closeNav = () => {
        setNavOpen(false);
    }

    // Rendering JSX
    return (
        <div className="Navbar">
            {/* Button to open navbar */}
            <button className="open_button" onClick={openNav}><img src={three_bars_icon} alt="menu icon" /></button>

            {/* Sidebar menu */}
            <div className={navOpen ? "sidebar open" : "sidebar"}>
                <ul>
                    {/* Close button */}
                    <a className='close_button' onClick={closeNav}>X</a>

                    {/* Navigation links */}
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to={"/info"}>Surf Information</Link></li>
                    <li><Link to="/Map"> Map </Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar; // Exporting Navbar component
