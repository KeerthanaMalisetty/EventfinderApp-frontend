import { useState } from "react"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import './Eventscmpt.css'
import { API } from "../global";

export function Maincomponent() {
    const [events, setEvents] = useState([])
    const [skip, setSkip] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const getevents = (skip) => {
        fetch(`${API}/events?skip=${skip}`)
            .then((data) =>
                data.json()
                // console.log(data.length)
            )
            .then((mvs) => {
                setEvents([...events, ...mvs])

            })

    }
    useEffect(() => {
        getevents(skip)
    }, [skip])


    const deleteevent = (id) => {
        // after delete we refresh the data
        fetch(
            `${API}/admin/delete/${id}`,
            {
                method: "DELETE"
            }
        ).then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .then(() => getevents())
        navigate("/adminnew/dashboard")
    };
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState("");



    // const handleScroll = (e) => {
    //     console.log(e.target);
    //     const { offsetHeight, scrollTop, scrollHeight } = e.target;

    //     if (offsetHeight + scrollTop >= scrollHeight) {
    //         setSkip(events?.length);
    //         console.log(skip);
    //     }
    // };

    return (

        <div className="top">
            <input type="text" className="search" placeholder="search" onChange={(event) => {
                setSearchTerm(event.target.value)
            }} />
            < div className="mainctr"  >
                {events
                    .filter((event) => {
                        if (searchTerm == "") {
                            return event;
                        } else if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return event;
                        }
                    })
                    // .map((event) => <EventCard event={event} getevents={getevents} />)

                    .map((event) => {
                        return (

                            <div className='EventCard'>
                                <img src={event.poster} className="cardposter" />
                                {/* <div className='poster'> </div> */}
                                <h1 className='cardname'>{event.name}   <i class="fa-regular fa-pen-to-square editicon"
                                    onClick={() => {
                                        navigate(`/adminnew/editevent/${event._id}`)
                                        // window.location.reload(false);

                                    }}
                                ></i> <i className="fa-regular fa-trash-can dlticon"
                                    onClick={() => {
                                        deleteevent(event._id);
                                        window.location.reload(false);

                                    }}
                                ></i> </h1>
                                {/* <h2 className='carddate'>{event.date}</h2> */}
                                <h2 className='cardplc'>{event.place} | {event.city}</h2>
                                <div className="iconsctr">


                                </div>

                            </div >


                        )
                    })

                }

                {events.length !== 0 ? <button className="viewmorebtn" onClick={() =>
                    setSkip(skip + 12)
                }>View more</button> : "No more results"}

            </div >


        </div>


    )
}


// if (events?.length === 0) {
//     setIsEnd(true)
//     console.log(isEnd)
// }

// function EventCard({ event, getevents }) {


//     return (

//         <div className='EventCard'>
//             <img src={event.poster} className="cardposter" />
//             {/* <div className='poster'> </div> */}
//             <h1 className='cardname'>{event.name}   <i class="fa-regular fa-pen-to-square editicon"
//                 onClick={() => {
//                     navigate(`/adminnew/editevent/${event._id}`)
//                     window.location.reload(false);

//                 }}
//             ></i> <i className="fa-regular fa-trash-can dlticon"
//                 onClick={() => {
//                     deleteevent(event._id);
//                     // window.location.reload(false);

//                 }}
//             ></i> </h1>
//             {/* <h2 className='carddate'>{event.date}</h2> */}
//             <h2 className='cardplc'>{event.place} | {event.city}</h2>
//             <div className="iconsctr">


//             </div>
//         </div >


//     )
// }