import { AdminNav } from "./AdminNav"
import './AdminHome.css'
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TextField } from "@mui/material";
export function Adminpage() {
    return (
        <>
            <AdminNav />
            <Login />
        </>
    )
}







export function Login() {
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
        name: yup.string().required("Please enter your Username").min(5, "enter valid name"),
        password: yup.string()
            .required()
            .min(8, "Password should length should be 8")
            .matches(passwordRules, { message: "Please must contain Upper,Lower,numbers,special carecters" }),
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
        fetch("https://mernapp-eventfinder.herokuapp.com/login",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(result => result.json())
            .then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userid', data.userid)
                localStorage.setItem('adminusername', data.name)
                console.log('data', data);

                console.log('info', info)
            }
            );

        setName(user.name);
        console.log(user.name);
        console.log('user', user);
        setTimeout(() => {
            if (user.name === "admin") {
                navigate("/adminnew/dashboard");
            } else {
                navigate("/");
            }
            window.location.reload();
        }, 1000);



    }


    // const handleSubmit = event =>{
    //   event.preventDefault();
    // }

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                name: "",
                password: "",
            },
            validationSchema: basicSchema,
            onSubmit: (user) => {
                console.log("onSubmit", user);
                register(user);
            },
        }
        );

    // console.log(errors);

    return (
        <div className="adminformctr">

            <p className="loginhd">Login</p>
            <form onSubmit={handleSubmit} autoComplete="off" className='adminloginform'>

                <TextField id="outlined-basic"
                    label="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.name && errors.name}
                    name="name"
                    helperText={touched.name && errors.name ? errors.name : ""} />



                <TextField id="outlined-basic"
                    className="passwordfield"
                    name="password"
                    type="password"
                    label="password"
                    error={errors.password && touched.password}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password ? errors.password : ""}

                />






                <p className="frgtpwd">Forgot Password</p>

                <button className="adminlgnbtn"
                    type="submit"  >Login</button>
            </form>
            <p className='noaccount'>No account ? <button onClick={() => navigate("/adminsignup")} className="createbtn">Create One</button></p>
        </div>
    );


}
