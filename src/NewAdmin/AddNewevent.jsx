import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AdminNavbar } from './AdminNavbar'
import { Sidebar } from './Sidebar'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Addnew.css';
import { useState } from "react";
import { API } from "../global";
// import FileBase from 'react-file-base64';
// import ChipInput 
export function Newevent() {
    // const { id } = useParams();
    // const [event, setevent] = useState(null);
    return (

        <div className='addeventbody'>
            <AdminNavbar />
            <div className='bookingsbody'>
                <Sidebar />
                <AddNewevent />
            </div>


        </div>

    );
}


export function AddNewevent() {
    const navigate = useNavigate();
    const [base64code, setbase64code] = useState("");
    const [img, setImg] = useState("");

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




    // const [event, setEvent] = useState({
    //     image: img,
    //     name: "",
    // });


    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

    const basicSchema = yup.object().shape({
        name: yup.string().required("Please enter your Username").min(5, "enter valid name"),
        // poster: yup.string().required("please enter poster value"),
        price: yup.number().required("Please enter  price").min(3, "enter valid price "),
        place: yup.string().required("Please enter place").min(5, "enter valid place"),
        city: yup.string().required("Please enter place").min(3, "enter valid city "),
        type: yup.string().required("Please enter type").min(5, "enter valid type"),
        date: yup.string().required("Please enter date").min(5, "enter valid date"),
        about: yup.string().required("Please enterabout").min(5, "enter validaboutription"),
        age: yup.string().required("Please enter this field"),
        language: yup.string().required("Please enterlanguage")
    })







    const register = (formValues) => {
        fetch(`${API}/admin/addevent`,
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(result => result.json())
            .then(data => {
                console.log('data', data)

            });
        console.log('formValues', formValues);

        navigate("/adminnew/dashboard");
    }





    const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange, } =
        useFormik({
            initialValues: {
                name: "",
                // poster: img,
                // poster: ""

                place: "",
                date: "",
                about: "",
                type: "",
                price: "",
                age: "",
                language: ""

            },
            validationSchema: basicSchema,
            onSubmit: (user) => {
                const formValues = {
                    name: user.name,
                    place: user.place,
                    poster: img,
                    date: user.date,
                    about: user.about,
                    type: user.type,
                    price: user.price,
                    age: user.age,
                    language: user.language,

                }
                // console.log("onSubmit", user);
                console.log('formvalues', formValues);
                register(formValues);
            },
        }
        );





    // console.log(errors);

    return (

        <form className="addeventform" onSubmit={handleSubmit} autoComplete="off">

            <TextField id="outlined-basic"
                value={values.name}
                onChange={handleChange}
                name="name"
                label="name"
                className="inputtext"
                type="text"
                placeholder="Enter your name"
                onBlur={handleBlur}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ""}
            />
            <TextField id="outlined-basic"
                name="date"
                type="text"
                label="date"
                className="inputtext"
                placeholder="Enter event date and time"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.date && touched.date}
                helperText={errors.date && touched.date ? errors.date : ""}
            />


            {/* <TextField id="outlined-basic"
                name="poster"
                type="text"
                label="poster"
                className="inputtext"
                placeholder="Enter your poster"
                value={img}
                // value={values.poster}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.poster && touched.poster}
                helperText={errors.poster && touched.poster ? errors.poster : ""}
            /> */}


            <input type="file" onChange={imghandleSubmit} className="inputtext inputtextfield" />

            <TextField id="outlined-basic"
                name="place"
                type="text"
                label="place"
                className="inputtext"
                placeholder="Enter your place"
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.place && touched.place}
                helperText={errors.place && touched.place ? errors.place : ""}
            />

            <TextField id="outlined-basic"
                name="city"
                type="text"
                label="city"
                className="inputtext"
                placeholder="Enter your city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.city && touched.city}
                helperText={errors.city && touched.city ? errors.city : ""}
            />

            <TextField id="outlined-basic"
                name="about"
                type="text"
                label="description"
                className="inputtext"
                placeholder="Enter event description"
                value={values.about}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.about && touched.about}
                helperText={errors.about && touched.about ? errors.about : ""}
            />



            <TextField id="outlined-basic"
                name="type"
                type="text"
                label="Category"
                className="inputtext"
                placeholder="Enter event category music,comedy,food,workshop.. "
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.type && touched.type}
                helperText={errors.type && touched.type ? errors.type : ""}
            />




            <TextField id="outlined-basic"
                name="price"
                type="text"
                label="price"
                className="inputtext"
                placeholder="Enter event price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.price && touched.price}
                helperText={errors.price && touched.price ? errors.price : ""}
            />


            <TextField id="outlined-basic"
                name="language"
                type="text"
                label="language"
                className="inputtext"
                placeholder="Enter event language English,Telugu,Hindi...."
                value={values.language}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.language && touched.language}
                helperText={errors.language && touched.language ? errors.language : ""}
            />


            <TextField id="outlined-basic"
                name="age"
                type="text"
                label="Age"
                className="inputtext"
                placeholder="Enter allowed age group to attend event"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.age && touched.age}
                helperText={errors.age && touched.age ? errors.age : ""}
            />

            {/* <input
                type="text"
                style={{ fontSize: 14 }}
                name="poster"
                onChange={handleChange}
                value={img}
                placeholder="poster"
                className="inputfield"
                required
            />
 */}

            <button disabled={isSubmitting} className="addeventbutton"

                type="submit" >
                Submit
            </button>

        </form>

    );


}
