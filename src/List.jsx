import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from './Navbar';
import AnchorLink from "react-anchor-link-smooth-scroll"
import './Eventlist.css'
import './Categories.css'
import './List.css'
import { MusiceventCard } from "./MusiceventCard";
export function List() {


  const [skip, setSkip] = useState(0);
  const [eventslist, setEventslist] = useState([]);
  const [showEventList, setShowEventList] = useState([]);
  const [location, setLocation] = useState("");
  const [isEnd, setIsEnd] = useState("");
  const [random, setRandom] = useState(true);

  const getevents = (skip) => { // Pass in a callback function!
    fetch(`https://mernapp-eventfinder.herokuapp.com/events?skip=${skip}`)
      .then((data) => data.json())
      .then((mvs) => {
        if (mvs.msg) {
          // alert(mvs.msg)
          console.log("I am getting executed");
          setRandom(false);
        } else {
          setShowEventList([...showEventList, ...mvs]);
        }
        setEventslist([...eventslist, ...mvs]);
      });


  }

  const handleScroll = () => {
    console.log("height:", document.documentElement.scrollHeight)
    console.log("top:", document.documentElement.scrollTop);
  }


  useEffect(() => {
    getevents(skip)
  }, [skip])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])

  const handleLocationChange = (loc) => {
    setLocation(loc)
    fetch(`https://mernapp-eventfinder.herokuapp.com/events/${loc}`)
      .then((data) => data.json())
      .then((mvs) => {
        setEventslist(mvs);
        setShowEventList(mvs);
      });
  }


  const filterevents = (catitem = "") => {
    if (catitem !== "") {
      const result = eventslist.filter((curdata) => {
        return curdata.type === catitem;
      })
      setShowEventList(result);
    }
    else {
      setShowEventList(eventslist)
    }
  }

  const [searchTerm, setSearchTerm] = useState("");


  return (
    <div>

      <Navbar handleLocationChange={handleLocationChange} />
      {/* <Slider /> */}
      <div className="searchctr">
        <input className="searchbarr" placeholder="search" onChange={(event) => {
          setSearchTerm(event.target.value)
        }} />
      </div>
      <div className="headctr">
        <h1 className="cathead"> Categories</h1>
        {!location ? <a href="#navbar" className="eventhead"><h1 className="eventhead" >Explore Events</h1></a> : <h1 className="eventlochead">Events in {location}</h1>}
      </div>
      <div className="listcmpt">
        <div className="categoriesctr">
          {/* <h1 className='cathead'>Categories</h1> */}
          <button className='catbutton'
            onClick={() => filterevents('Comedy')}>Comedy</button>
          <button className='catbutton' onClick={() => filterevents('Health')}>Health</button>
          <button className='catbutton' onClick={() => filterevents('Workshops')}>Workshops</button>
          <button className='catbutton' onClick={() => filterevents('Arts')}>Arts</button>
          <button className='catbutton' onClick={() => filterevents('Food')}>Food</button>
          <button className='catbutton' onClick={() => filterevents('Music')}>Music</button>
          <button className='catbutton' onClick={() => {
            filterevents();

          }}>All events</button>
        </div>
        {/* {location !== "" && <h1>Events in {location}</h1>} */}


        <div className='events-ctr'>

          {showEventList
            .filter((event) => {
              if (searchTerm == "") {
                return event;
              } else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return event;
              }
            })
            .map((event, index) => {
              return <MusiceventCard name={event.name} key={index}
                img={event.poster} price={event.price} type={event.type} city={event.city} id={event._id} />
            })}


        </div>


      </div>
      {random ? <button className="listview" onClick={() => { setSkip(skip + 12) }}>View more </button> : <p>No more items</p>}
      <Footer />

    </div >
  )
}

export function Footer() {
  return (
    <div className='footer'>
      <h1 className='foothead'> eventfinder</h1>
      <p className='footerctnt'>EventFinder is a platform that helps you discover and buy the best in events, travel and food in your city. We strive to curate experiences that are worth your time and money, possibly something you have never tried before</p>
    </div>
  )
}
