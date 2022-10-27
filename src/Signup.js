import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API } from "./global";

import './Signup.css'


export function Signup() {
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

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const basicSchema = yup.object().shape({
    name: yup.string().required("Please enter your Username").min(5, "enter valid name"),
    password: yup.string()
      .required()
      .min(8, "Password should length should be 8")
      .matches(passwordRules, { message: "Please must contain Upper,Lower,numbers,special carecters" }),
    email: yup.string().required("Pease enter your email")
  })


  // const handleSubmit =(event)=>{
  //   event.preventDefault();
  //   const name=event.target.name.value;
  //   const age=event.target.age.value;
  //   const email=event.target.email.value;
  //   const password=event.target.password.value;
  //   const user ={name,email,age,password}
  //   fetch('${API}',{
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


  const register = (user) => {

    fetch(`${API}/signup`,
      {
        method: "POST",
        // body: JSON.stringify({ ...user, email: localStorage.getItem('useremail') }),
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(result => result.json())
      .then(data => {
        console.log('data', data)

      });
    console.log('user', user);

    navigate("/login");
  }


  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange, } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        email: ""
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
    <div className="formcontainer">

      <p className="signup-heading">SignUp</p>
      <form className="signup" onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name" className="signuplabel">name</label>
        <input
          value={values.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Enter your name"
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""}

        />
        {errors.name && touched.name && <p className="signuperror">{errors.name}</p>}



        <label htmlFor="email" className="signuplabel">email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="signuperror">{errors.email}</p>)}
        <label htmlFor="password" className="signuplabel">password</label>

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
          <p className="signuperror">{errors.password}</p>
        )}

        <button disabled={isSubmitting} className="submitbutton"

          type="submit" >
          Submit
        </button>

      </form>
    </div>
  );


}
