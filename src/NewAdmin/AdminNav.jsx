import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './AminNav.css'
export function AdminNav() {
    const navigate = useNavigate()
    const name = localStorage.getItem('adminusername')

    return (
        <div className="adminnav">
            <h1 className='header'>eventfinder</h1>
            {/* <h1>Admin Dashboard</h1> */}
            {/* {name ? <div><button className='adminname' onClick={() => navigate("/admin/profile")}>{name}</button>
                <button className='adminlogout' onClick={() => {
                    localStorage.clear();
                    window.location.reload(false)
           }}>Logout</button></div> : <button className='adminlogin' onClick={() => navigate("/login")}>Login</button>} */}
            <button className='adminlogin' > Admin Login</button>
        </div>
    )
}