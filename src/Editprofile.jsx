import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import './Editprofile.css'
// export function Edituser() {


//     return (

//         <div className='dashmain'>
//             <AdminNavbar />
//             <div className='bookingsbody'>
//                 <Sidebar />
//                 {event ? <Editform event={event} /> : "Loading.."}
//             </div>


//         </div>

//     );
// }


export function EditProfile({ user, setTab }) {

    // const { id } = useParams();

    const navigate = useNavigate();
    const [name, setname] = useState(user.name);
    const [email, setemail] = useState(user.email);



    const edituser = () => {
        const updateuser = {
            name: name,
            email: email,

        };
        // console.log(newuser);
        // setuserlist([...userlist, newuser]);
        //put method
        //1.method-put & id
        //2. body-- we should pass new data  in body and in json format
        //3.in headres we should mention we r passing json data 


        fetch(`https://mernapp-eventfinder.herokuapp.com/profile/edituser/${localStorage.userid}`,
            {
                method: "PUT",
                body: JSON.stringify(updateuser),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(() => window.location.reload());
    }


    return (
        <form className="editprofileform">
            <TextField id="outlined-basic" variant="outlined" label="name" value={name} onChange={(event) => setname(event.target.value)} />

            <TextField id="outlined-basic" variant="outlined" label="email" value={email} onChange={(event) => setemail(event.target.value)} />


            <Button variant="contained" onClick={edituser} color="secondary"> Save </Button>


        </form>
    );

}