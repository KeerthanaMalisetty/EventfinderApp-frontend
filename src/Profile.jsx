import { Navbar } from "./Navbar";
import './Profile.css'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { MusiceventCard } from './MusiceventCard'
import { EditProfile } from './Editprofile';



function Ticket({ booking }) {
  return (
    <div className="booktkt">
      <h1>{booking.name}</h1>
      <h2>{booking.ticketcount} x Tickets</h2>
      <hr />
      <h2>Date & Time : {booking.date}</h2>


      <h2> Place : {booking.place} | {booking.city}</h2>
      <hr />
      <h2>Status : Booked</h2>
    </div>
  )
}

function Bookingslist({ bookings }) {
  return (
    <>
      {bookings.map((booking) => <Ticket booking={booking} />)}
    </>
  )
}

function Myevents({ events }) {
  return (
    <div>
      {events.map((event) => <MusiceventCard name={event.name} img={event.poster} place={event.place} city={event.city} date={event.date} />)}
    </div>
  )
}











export function Profile() {

  const userid = localStorage.getItem('userid')
  const username = localStorage.getItem('username')
  const [bookings, setBookings] = useState([])
  const [events, setEvents] = useState([])
  const [tab, setTab] = useState("bookings")
  const navigate = useNavigate();
  const getbookings = () => {
    fetch(`https://mernapp-eventfinder.herokuapp.com/profile/bookings/${userid}`)
      .then((data) => data.json())
      .then((mvs) => setBookings(mvs));
  }
  useEffect(() => {
    getbookings()
  }, [])
  const getevents = () => {
    fetch(`https://mernapp-eventfinder.herokuapp.com/myevents/${username}`)
      .then((data) => data.json())
      .then((mvs) => setEvents(mvs));
  }
  useEffect(() => {
    getevents()
  }, [])




  const [user, setuser] = useState("");
  const getuser = () => {
    fetch(
      `https://mernapp-eventfinder.herokuapp.com/profile/user/${localStorage.userid}`
    )
      .then((data) => data.json())
      .then((mv) => setuser(mv));
  }

  useEffect(() => getuser(), [])


  const renderTab = () => {
    switch (tab) {
      case "bookings":
        return <Bookingslist bookings={bookings} />

      // case "myevents":
      //   return <Myevents events={events} />

      case "favourites":
        return <h1>Favourites</h1>

      case "profile":
        return <EditProfile user={user} setTab={setTab} />
      default:
        return ""
    }
  }

  function logout() {
    localStorage.clear()
    navigate("/")

  }

  return (
    <div>

      <div className="profilepage">
        <Navbar />
        <div className="userdetailsctr">
          <div className="usedetailsctr">
            <p className="username">{user.name}</p>
            <p className="useremail">{user.email}</p>
          </div>

          <button className="logoutbt" onClick={logout}>Logout</button>
        </div>
        <div className="buttonsctr">
          <div className="buttonscontainer">
            <button className={`profilebtns ${tab === 'bookings' ? 'highlightbtn' : ''}`} onClick={() => setTab("bookings")} >Bookings</button>
            {/* <button className={`profilebtns ${tab === 'myevents' ? 'highlightbtn' : ''}`} onClick={() => setTab("myevents")}>My Events</button> */}
            {/* <button className="profilebtns" onClick={() => setTab("favourites")}>Favourites</button> */}
            <button className={`profilebtns ${tab === 'profile' ? 'highlightbtn' : ''}`} onClick={() => setTab("profile")}>Profile</button>
          </div>

        </div>

      </div>

      <div className="maincomponent">
        {renderTab()}
      </div>
    </div >
  )
}


