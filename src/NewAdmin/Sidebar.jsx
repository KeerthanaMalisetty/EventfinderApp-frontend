import './Sidebar.css'
import { useNavigate } from 'react-router-dom';
export function Sidebar() {
    const navigate = useNavigate()
    return (
        <div className='sidebar'>
            <button className='sidebarbtn1' onClick={() => navigate("/adminnew/dashboard")}><i className="fa-regular fa-calendar calenderbtn"></i>Events</button>
            <button className='sidebarbtn' onClick={() => navigate("/adminnew/bookings")}><i className="fa-solid fa-ticket tkt"></i> Bookings</button>
            <button className='sidebarbtn' onClick={() => navigate("/adminnew/users")}><i className="fa-solid fa-users  users"></i>Users</button>
            <button className='sidebarbtn' onClick={() => navigate("/adminnew/addevent")}><i className="fa-regular fa-square-plus plus"></i>AddEvent</button>
        </div>
    );
}
