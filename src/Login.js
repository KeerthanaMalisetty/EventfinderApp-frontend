import './Login.css'
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';





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
  const [msg, setMsg] = useState(null);

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
        localStorage.setItem('username', data.name)
        localStorage.setItem('useremail', data.email)
        console.log('data', data);
        if (data.msg === "successfull login") {
          navigate("/");
        } else {
          setMsg(data.msg)
        }
      }
      )


    setName(user.name);
    console.log(user.name);
    console.log('user', user);
    // setTimeout(() => {
    //   if (user.name === "admin") {
    //     navigate("/Admin");
    //   } else {
    //     navigate("/");
    //   }
    //   window.location.reload();
    // }, 1000);



  }

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
    <div className="loginformctr">


      <p className="loginheading">Login</p>

      {msg ? <h4 className='invalidmsg'>{msg}</h4> : null}

      <form onSubmit={handleSubmit} autoComplete="off" className='loginform'>
        <label htmlFor="name" className='loginlabel'>name</label>
        <input
          value={values.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Enter your name"
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""} />
        {errors.name && touched.name && <p className="loginerror">{errors.name}</p>}

        <label htmlFor="password" className='loginlabel'>password</label>

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="loginerror">{errors.password}</p>
        )}
        <a className='forgottext' href='http://localhost:3000/forgotpassword'>Forgot Password</a>
        <button className="loginbutton"
          type="submit"  >Login </button>
      </form>
      <p className='act'>No account ? <button onClick={() => navigate("/signup")}>Create One</button></p>
    </div>
  );


}
