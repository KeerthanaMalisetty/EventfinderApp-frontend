import { Navigate, useParams } from 'react-router-dom'
import { AdminNavbar } from './AdminNavbar'
import './Dashboard.css'
import { Maincomponent } from './Eventscmpt'
import { Sidebar } from './Sidebar'
export function Dashboard() {
    return (
        <div className='dashmain'>
            <AdminNavbar />
            <div className='dashbody'>
                <Sidebar />
                <Maincomponent />
            </div>

        </div>
    )
}







