import './Ticketbooking.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { margin } from '@mui/system';

export function Ticketbooking() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [eventinfo, setEventinfo] = useState({});
  const geteventinfo = () => {
    fetch(
      `https://mernapp-eventfinder.herokuapp.com/events/${id}`,
      {
        method: "GET",
      })
      .then((data) => data.json())
      .then((mv) => setEventinfo(mv));
    console.log(eventinfo)
  }
  useEffect(() => geteventinfo(), []);

  const [add, setadd] = useState(1);
  const [price, setprice] = useState(0);
  const click = () => {
    if (add < 10) {
      setadd(add + 1)
    }
  };
  const click1 = () => {
    if (add > 0) {
      setadd(add - 1)
    }
  }

  const price1 = () => {
    if (price < 10) {
      setprice(price + 1)
    }
  };
  const rate = () => {
    if (price > 0) {
      setprice(price - 1)
    }
  }

  // useEffect(()=>{
  //   console.log(eventinfo);
  // },[])


  const Submit = (eventinfo, add) => {
    // event.preventDefault();
    const name = eventinfo.name;
    const city = eventinfo.city;
    const place = eventinfo.place;
    const id = eventinfo._id;
    const date = eventinfo.date;
    const ticketcount = add;
    const ticketprice = add * eventinfo.price;
    const userid = localStorage.userid;
    const username = localStorage.username;
    const useremail = localStorage.useremail;
    console.log(eventinfo);
    const bookings = { name, city, place, ticketcount, userid, id, ticketprice, date, username, useremail }
    fetch('https://mernapp-eventfinder.herokuapp.com/events/bookings', {
      method: "POST",
      body: JSON.stringify(bookings),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(result => result.json())
      .then((data) => {
        console.log(data)
        console.log(bookings)
      })
    navigate(`/musicevents/billing/${id}`)

  }



  //  const handlesubmit = (eventinfo)=>{
  //    Submit(eventinfo)

  // };

  function handlesubmit() {
    try {
      console.log(eventinfo)
      Submit(eventinfo, add)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="bookingcard">
      <div className="bookingtop">
        <p className="bookingeventname">{eventinfo.name}</p>
        <p className="edetails">{eventinfo.place} </p>
      </div>
      <p className="price">Ticket Types

      </p>
      <hr className="booking-hr" />
      <div className="qty1">
        <h1 className="bookingTname">Individual Ticket   </h1>
        <div className="bookingctr">
          <button className="qty2" onClick={click1}>-</button>
          <button className="qty3">{add}</button>
          <button className="qty4" onClick={click}>+</button>
        </div>
      </div>
      <div className='warningctr'>
        <p className="price">Rs.{add * eventinfo.price}</p>

        {add == 10 ? <p className='war'>Reached maximum limit 10</p> : ""}
      </div>


      {/* <hr className="hr" /> */}
      {/* <div className="qty1">
        <h1 className="bookingTname">Group Ticket<span>(5 tickets)</span>   </h1>
        <div className="bookingctr2">
          <button className="qty2" onClick={rate}>-</button>
          <button className="qty3">{price}</button>
          <button className="qty4" onClick={price1}>+</button>
        </div>
      </div>
      {/* <h1 className="caption">(group of 5) </h1> */}
      {/* <p className="price">Rs.{price * 3500}</p>
      <hr className="booking-hr" />  */}

      <button type="submit" className="button"
        onClick={handlesubmit}> Book Now</button>

    </div>

  )
}