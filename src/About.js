import './About.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

export function About() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setevent] = useState({});

    const getevent = () => {
        fetch(
            `https://mernapp-eventfinder.herokuapp.com/events/${id}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    x_auth_token: localStorage.getItem("token"),

                }

            })
            .then((data) => data.json())
            .then((mv) => setevent(mv));
    }
    useEffect(() => getevent(), []);
    console.log(event);
    // useEffect(()=> getevent(),[]);
    console.log({ id });
    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <Poster img={event.poster} />
                <Eventguide age={event.Age} language={event.language} />
                <Details name={event.name} id={event._id} date={event.date} place={event.place} city={event.city} />
                <Description desc={event.about} />
            </div>
        </div>
    )
}


export function Poster({ img, name }) {
    return (
        <div className="one">
            <img src={img} className="about-img" />
            <p>{name}</p>

        </div>
    )
}

export function Eventguide({ Age, language }) {
    return (
        <div className="four">
            <h1 className="eventguide">Event Guide</h1>
            <hr />
            <p className="eg1">For Age Group</p>
            <p className="eg2">{Age}</p>
            <p className="eg3">Language</p>
            <p className="eg4">{language}</p>
            <p className="eg5">Live Performance</p>
            <p className="eg6"> Enjoy the Evening</p>

        </div>
    )
}

export function Details({ name, id, date, place, city }) {


    const navigate = useNavigate();
    return (
        <div className="two">
            <h1 className='evt-name'>{name}</h1>
            <div className="time1">
                <div className="placecity "> <i className="fa-solid fa-location-dot locationicon"></i> {place} | {city} </div>
                <h2><br /></h2>
            </div>
            <div className="time">
                <div className="clock"><i className="fa-solid fa-clock dateicon"> </i> {date}</div>
                <h3> </h3>
            </div>

            <div className="foot">
                <div className="steps"><i className="fa-solid fa-shoe-prints"></i></div>
                <h4>Step out for this event</h4>
            </div>
            <button className="tickets" onClick={() => navigate(`/musicevents/booking/${id}`)}> Book Tickets</button>

        </div>
    )
}


export function Description({ desc }) {
    return (
        <div className="three">
            <h1 className="about">About</h1>
            <p className="p1">{desc}</p>



            <h1 className="terms">Terms and Conditions</h1>
            <ul>
                <li>Audiences above the age of 18 years only can attend the event by purchasing
                    a ticket provided they are fully vaccinated at least 2 weeks prior to the show. </li>
                <li>We will seal your phone in an envelope and give it to you to avoid any recording. </li>
                <li>All ticket holders must be fully vaccinated in order to attend the event.
                    It is compulsory to show a certificate of full vaccination on entry.
                    (Make sure your second dose is taken at least 14 days before the show)</li>
                <li>Rights of admission are reserved, even to valid ticket holders.</li>
                <li>It is compulsory to wear masks at all times. No entry without a mask.</li>
                <li>Children below 18years of age are strictly not allowed inside the venue.
                    This includes infants, toddlers and kids of any specific age below 18 years.</li>
                <li>Limited seats only.</li>

            </ul>

            <h1 className="terms">Covid Guidelines</h1>
            <ul>
                <li>Owing to the recent conditions surrounding the COVID – 19 pandemic, as a pre-condition to
                    gaining access to the venue (events and theatres) you are required to be fully vaccinated and may be required to display your COVID – 19 certificate at the venue as per the various norms /regulations prevailing in the said State.
                    The venue provider and governing authorities reserve the right to exclude any user from the venue if there are sufficient grounds to believe so for failure to abide by the protocols. You agree to exit without protest or refund. Users are required to check the restrictions as applicable in their State</li>
                <li>Use of masks is mandatory at all times and the visitors are required to maintain social distancing norms. The venue and Bigtree reserve the right to change/modify the terms and conditions.</li>
                <li>Bigtree does not assume any responsibility with regards to any injury or complications due to COVID – 19 accrued as a result of your participation.</li>
                <li>The above guidelines are currently mandatory for Delhi/NCR, Maharashtra and Karnataka. These terms and conditions may vary depending on the state where the event is held and are subject to changes.</li>
            </ul>


        </div>
    )
}