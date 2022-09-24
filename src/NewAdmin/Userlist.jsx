import { AdminNavbar } from './AdminNavbar'
import { Sidebar } from './Sidebar'
import { useState, useNavigate } from 'react'
import { useEffect } from 'react'
import './Userlist.css'


export function Userlist() {
    return (
        <div >
            <AdminNavbar />
            <div className='bookingsbody'>
                <Sidebar />
                <Users />
            </div>


        </div>
    )
}


export function Users() {
    const [users, setUsers] = useState([])

    const getusers = () => {
        fetch(`${API}/admin/users`)
            .then((data) => data.json())
            .then((mvs) => setUsers(mvs))


    }
    useEffect(() => {
        getusers()
    }, [])


    return (
        <>

            <table className="usertable">
                <thead className="headrow">

                    <tr>
                        <th className='userid'>UserId</th>
                        <th className='usersname'>Username</th>
                        <th className='useremail'>Email</th>

                    </tr>

                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr >
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                {/* <td>{user.age}</td> */}

                            </tr>

                        );
                    })}
                </tbody>
            </table>

        </>
    )
}