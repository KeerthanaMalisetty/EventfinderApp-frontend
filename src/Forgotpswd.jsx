import './Forgotpswd.css'
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';





export function Forgotpassword() {
    const navigate = useNavigate();
    // const {logIn}=UserContext();

    // const onSubmit = (values) => {
    // console.log(values);
    // console.log(actions);
    // logIn(values.name)
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // actions.resetForm();
    // };

    // const onSubmit= (data)=>{
    //
    // }
    const [name, setName] = useState("");
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

    const basicSchema = yup.object().shape({

        email: yup.string().required("Please enter your email")
        // .min(8, "Password should length should be 8")

    })


    // const handleSubmit =(event)=>{
    //   event.preventDefault();
    //   const name=event.target.name.value;
    //   const age=event.target.age.value;
    //   const city=event.target.city.value;
    //   const password=event.target.password.value;
    //   const user ={name,city,age,password}
    //   fetch('https://mernapp-eventfinder.herokuapp.com/login',{
    //     method: "POST",
    //     body : JSON.stringify(user),
    //     headers:{
    //       "Content-type":"application/json"
    //     }
    //   })
    //   .then(result => result.json())
    //   .then((data)=>console.log(data))
    //   event.target.reset();
    // }

    const [info, setInfo] = useState({})

    const register = (user) => {
        fetch("https://mernapp-eventfinder.herokuapp.com/forgotpassword",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(result => result.json())
            .then((data) => {

                console.log('data', data);
                alert(data.msg)
                if (data.msg === "Email verified") {
                    localStorage.setItem('useremail', user.email)
                    navigate("/changepassword");
                }
            }
            );

        setName(user.name);
        console.log(user.name);
        console.log('user', user);



    }


    // const handleSubmit = event =>{
    //   event.preventDefault();
    // }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                email: "",
                Newpassword: "",
                Confirmpassword: "",
            },
            validationSchema: basicSchema,
            onSubmit: (user) => {
                console.log("onSubmit", user);
                register(user);
            },
        }
        );

    // console.log(errors);
    const email = (e) => {
        localStorage.setItem(e.target.value);
    }

    return (





        <form onSubmit={handleSubmit} autoComplete="off" className='pswdform'>

            <p className="pswdheading">Forgot Password</p>

            <label htmlFor="name" className='pswdlbl'>email</label>
            <input
                value={values.email}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Enter your email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""} />
            {errors.email && touched.email && <p className="loginerror">{errors.email}</p>}




            <button className="pswdbutton"
                type="submit"  > Confirm </button>
        </form>


    );


}
