import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import './Billing.css'
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';
import { Ticketbooking } from "./Ticketbooking";
import { API } from "./global";
export function Billing() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setevent] = useState({});
    const getevent = () => {
        fetch(
            `${API}/events/billing/${id}`,
            {
                method: "GET",
            })
            .then((data) => data.json())
            .then((mv) => setevent(mv));
    }
    useEffect(() => getevent(), []);
    const tax = event.ticketprice * 3 / 100;


    const Key = "pk_test_51LWlLFSEfh3ebicsal5VVxJjmLyX6faNVWN3IvbUKlIGHwSwAcAmWvoq0VylM4xZPk71zCxKg2xFUBurlQW2eP8E00X8Q5lokm";

    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token) => {

        setStripeToken(token);
        console.log(token);
        alert("Payment Successfully")
        navigate(`/confirmation/${id}`);
        // sendmail();

    };

    const makeRequest = async () => {
        try {
            const res = await axios.post(
                `${API}/payment`,

                {
                    tokenId: stripeToken.id,
                    amount: event.ticketprice + tax + 20,
                });
            if (res === 200) {
                navigate("/payment");
                console.log("200");
            } else {
                console.log("error");
            }
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const sendmail = (event) => {
        const bookingid = event._id;
        const Toemail = event.email;
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
        <div className="billing-bookcard">
            <div className="billing-top">
                <div className="billing-line1">
                    <h1 className="billing-name-evt">{event.name} </h1>
                    {/* <p className="billing-price"> Rs.1000</p> */}
                </div>
                <p className="billing-ticket">{event.ticketcount} x Ticket</p>

                <h1 className="billing-tkt-place">{event.place} , {event.city}</h1>
                <h1 className="billing-tkt-time"> {event.date}</h1>
                <hr billing-hr />
                <p className="billing-entry">TicketCount <span>  :  {event.ticketcount}</span></p>
            </div>
            <div className="billing-amount-ctr">
                <p className="billing-sub">Sub Total</p>
                {/* {add==0 ? <p className="billing-amt">{price}</p> : ""}
            {price==0 ? <p className="billing-amt">{add}</p> : ""} */}
                <p className="billing-amt">Rs.{event.ticketprice}</p>
            </div>
            <div className="billing-tax-ctr">
                <p className="billing-sub1">Booking Fee</p>
                <p className="billing-amt1">Rs.20</p>
            </div>

            <div className="billing-tax-ctr">
                <p className="billing-sub2">Taxes</p>
                <p className="billing-amt2">Rs.{tax}</p>
            </div>

            <hr billing-hr />


            <StripeCheckout
                name="Event Finder"
                description={`Your Total Amount is Rs.${event.ticketprice + tax + 20}`}
                amount={'Rs.${event.ticketprice+tax+20}'}
                token={onToken}
                stripeKey={Key}
            >
                <div className="billing-total-ctr">
                    <p className="billing-tot">Total Amount</p>
                    <p className="billing-amt" >Rs.{event.ticketprice + tax + 20}</p>
                </div>

                {/* <hr className="billing-hr" /> */}
                <button className="billing-tickets"  >Proceed</button>
            </StripeCheckout>

        </div>
    )
}


