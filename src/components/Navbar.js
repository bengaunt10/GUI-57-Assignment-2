import React, { useState } from 'react'
import{ Link } from "react-router-dom"
import three_bars_icon from '../three-bars-icon.jpg';
import "../styles/nav.css"
function Navbar() {

    const [navOpen,  setnavOpen] = useState(false);

    const openNav = () => {
        setnavOpen(true);
      }
    
      const closeNav = () => {
        setnavOpen(false);
      }

  return (
    <div className="Navbar">
      <button className="open_button" onClick={openNav}><img src={three_bars_icon}/></button>
      
      <div className={navOpen ? "sidebar open": "sidebar"}>
        <ul>
          <a className='close_button' onClick={closeNav}>X</a>
          <li><Link to="/"> Home </Link></li>
          <li><Link to={"/info"}>Surf Information</Link></li>
          <li><Link to="/Map"> Map </Link></li>
        </ul>
        </div>

        


    </div>
  )
}

export default Navbar
