import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './conformation.css';
import { Navbar } from "./Navbar";
import { API } from "./global";
export function Conformation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setevent] = useState({});
    const getevent = () => {
        fetch(
            `${API}/billing/${id}`,
            {
                method: "GET",
            })
            .then((data) => data.json())
            .then((mv) => setevent(mv));
    }
    useEffect(() => getevent(), []);

    const sendmail = (event) => {
        const bookingid = event._id;
        const Toemail = event.useremail;
        const username = event.username;
        const eventname = event.name;
        const details = { bookingid, Toemail, username, eventname }
        fetch('${API}/sendmail', {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then(async (response) => {
                const resData = await response;
                console.log(resData);
                if (resData.status === "success") {
                    console.log("Message Sent");
                } else if (resData.status === "fail") {
                    console.log("Message failed to send");
                }
            })

    }



    return (
        <>
            <Navbar />
            <div className="confirmctr">

                <img src="https://preview.pixlr.com/images/800wm/1256/1/1256102704.jpg" className="confirmimg" />


                <p className="confirmtext">
                    {/* Tickets has been booked for the event {event.name}.
                    You can find your booking details on your mailid. */}
                    Your booking for the event <span className="confirmevent">{event.name}</span> has been confirmed .
                </p>

                <button className="confirmbtn" onClick={() => {
                    sendmail(event)
                    navigate("/user/profile")
                    console.log("navigated");
                }}>view tickets</button>
            </div>
        </>
    )
}