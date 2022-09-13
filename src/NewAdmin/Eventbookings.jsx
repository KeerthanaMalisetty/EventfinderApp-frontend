import { AdminNavbar } from './AdminNavbar'
import { Sidebar } from './Sidebar'
import { useState, useNavigate } from 'react'
import { useEffect } from 'react'
import './Eventbookings.css'
export function Eventbookings() {
    return (
        <div className='dashmain'>
            <AdminNavbar />
            <div className='bookingsbody'>
                <Sidebar />
                <Bookings />
            </div>


        </div>
    )
}


export function Bookings() {
    const [bookings, setBookings] = useState([])
    const getbookings = () => {
        fetch(`https://mernapp-eventfinder.herokuapp.com/admin/eventbookings`)
            .then((data) => data.json())
            .then((mvs) => setBookings(mvs));
    }
    useEffect(() => {
        getbookings()
    }, [])

    return (
        <>

            <table className="eventstable">
                <thead className="headrow">

                    <tr>
                        <th className='bookingid'>BookingId</th>
                        <th className='bookinguser'>User Name</th>
                        <th className='bookingname'>EventName</th>
                        <th className='bookingcount'>TicketCount</th>
                        {/* <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Status</th> */}
                    </tr>

                </thead>
                <tbody>
                    {bookings.map((booking) => {
                        return (
                            <tr >
                                <td>{booking._id}</td>
                                <td>{booking.username}</td>
                                <td>{booking.name}</td>
                                <td className='count'>{booking.ticketcount}</td>
                                {/* <td>{data.product[0].quantity}</td>
                                <td>{data.product[0].price}</td>
                                <td>{data.total}</td>
                                <td>Delivered</td> */}
                            </tr>

                        );
                    })}
                </tbody>
            </table>

        </>
    )
}