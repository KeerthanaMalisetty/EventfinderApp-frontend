import { useNavigate } from 'react-router-dom';

import './Dashboard.css'





export function AdminNavbar() {
    const navigate = useNavigate();
    const adminname = localStorage.getItem('adminusername');

    return (
        <div className="dashnav">
            <h1 className='header'>eventfinder</h1>
            {/* <h1 className='dashhead'>Admin Dashboard</h1> */}
            {adminname ? <div><button className='adminname' onClick={() => navigate("/admin/profile")}>{adminname}</button>
                <button className='adminlogout' onClick={() => {
                    localStorage.clear();
                    window.location.reload(false);
                }}>Logout</button></div> : <button className='adminlogin' onClick={() => navigate("/adminnew")}>Login</button>}
        </div>
    );
}
