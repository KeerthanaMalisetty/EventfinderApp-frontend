import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import { AdminNavbar } from './AdminNavbar'
import { Sidebar } from './Sidebar'
import './Addnew.css';
import { API } from "../global";

export function Editevent() {
    const { id } = useParams();
    const [event, setevent] = useState(null);
    const getevent = () => {
        fetch(
            `${API}/events/${id}`
        )
            .then((data) => data.json())
            .then((mv) => setevent(mv));
    }

    useEffect(() => getevent(), [])

    return (

        <div className='dashmain'>
            <AdminNavbar />
            <div className='bookingsbody'>
                <Sidebar />
                {event ? <Editform event={event} /> : "Loading.."}
            </div>


        </div>

    );
}


function Editform({ event }) {


    const navigate = useNavigate();

    const [name, setname] = useState(event.name);
    const [poster, setposter] = useState(event.poster);
    const [place, setplace] = useState(event.place);
    const [about, setabout] = useState(event.about);
    const [price, setprice] = useState(event.price);
    const [date, setdate] = useState(event.date);
    const [city, setcity] = useState(event.city);
    const [language, setlanguage] = useState(event.language);
    const [type, settype] = useState(event.type);
    const [age, setage] = useState(event.age);
    const [img, setImg] = useState("");
    const [base64code, setbase64code] = useState("");

    // // image handle function
    const imghandleSubmit = (e) => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file);
    };

    // // image to string converted function
    const onLoad = (fileString) => {
        setImg(fileString);
        setbase64code = fileString;
    };

    // // Image file reader function
    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onLoad(reader.result);
        };
    };



    const editevent = () => {
        const updateevent = {
            name: name,
            // poster: img,
            poster: poster,
            place: place,
            about: about,
            language: language,
            city: city,
            type: type,

        };


        const formValues = {

            name: updateevent.name,
            about: updateevent.about,
            place: updateevent.place,
            city: updateevent.city,
            language: updateevent.language,
            poster: updateevent.poster,
        }

        console.log(formValues);

        // console.log("check me first", event);
        // console.log(newevent);
        // seteventlist([...eventlist, newevent]);
        //put method
        //1.method-put & id
        //2. body-- we should pass new data  in body and in json format
        //3.in headres we should mention we r passing json data 


        fetch(`${API}/admin/editevent/${event._id}`,
            {
                method: "PUT",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(() => navigate("/adminnew/dashboard"));
    }


    return (
        <form className="addeventform">
            <TextField id="outlined-basic" variant="outlined" label="name" value={name} className="inputtext" onChange={(event) => setname(event.target.value)} />
            {/* <TextField id="outlined-basic" variant="outlined" className="inputtext" label="poster" value={event.poster} onChange={(event) => setposter(event.target.value)} /> */}
            <TextField id="outlined-basic" variant="outlined" label="place" value={place} className="inputtext" onChange={(event) => setplace(event.target.value)} />
            <input type="file" onChange={imghandleSubmit} className="inputtext inputtextfield" />
            <TextField id="outlined-basic" variant="outlined" label="about" value={about} className="inputtext" onChange={(event) => setabout(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" className="inputtext" label="date" value={date} onChange={(event) => setdate(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" label="city" value={city} className="inputtext" onChange={(event) => setcity(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" label="language" value={language} className="inputtext" onChange={(event) => setlanguage(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" label="price" value={price} className="inputtext" onChange={(event) => setprice(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" label="category" value={type} className="inputtext" onChange={(event) => settype(event.target.value)} />
            <TextField id="outlined-basic" variant="outlined" label="age" value={age} className="inputtext" onChange={(event) => setage(event.target.value)} />
            <Button variant="contained" className="inputtext" onClick={editevent} color="secondary"> Edit </Button>
        </form>
    );

}