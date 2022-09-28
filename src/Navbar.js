import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navbar({ handleLocationChange }) {

  const navigate = useNavigate();

  const click = () => {

    const username = localStorage.getItem('username');

    if (username !== "admin") {
      console.log('true')
      navigate("/createevent")
    } else {
      navigate("/login")
    }
  }

  const name = localStorage.getItem('username');




  return (
    <div className="Navbar" id='navbar'>


      <h1 className='navheading'>eventfinder</h1>



      <select className='Dropdown' onChange={(e) => {
        handleLocationChange(e.target.value);
      }}>
        <option className="Options" value="Location">Location</option>
        <option className="Options" value="Bangalore">Banglore</option>
        <option className="Options" value="Hyderabad">Hyderabad</option>
        <option className="Options" value="Mumbai">Mumbai</option>
        <option className="Options" value="Delhi">Delhi</option>
        <option className="Options" value="Online">Online</option>
      </select>



      {/* const user = JSON.parse(localStorage.getItem("currentUser")); */}
      <ul className='buttons'>
        <li> <button className='createevent' onClick={click}> Createevent </button></li>

        <li>
          {name ? <button className='login' onClick={() => navigate("/user/profile")}><i className="fa-regular fa-user  navuser"></i>{localStorage.username}</button> : <button className='login' onClick={() => navigate("/login")}>Login</button>}
        </li>
      </ul>


    </div>

  );
}




