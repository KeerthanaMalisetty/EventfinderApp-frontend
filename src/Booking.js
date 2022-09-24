import './Login.css'
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { API } from './global';


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


  const basicSchema = yup.object().shape({
    name: yup.string().required("Please enter your Username"),
    password: yup.string()
      .required(),
  })




  const register = (user) => {
    fetch(`${API}/login`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(result => result.json())
      .then(data => {
        localStorage.setItem('token', data.token)
        console.log(data);
      }
      );
    console.log(user);

    navigate("/");
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


  return (
    <div className="form-container">

      <p className="login-heading">Login</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name">name</label>
        <input
          value={values.name}
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Enter your name"
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""} />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}
        <label htmlFor="password">password</label>

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
          <p className="error">{errors.password}</p>
        )}

        <button className="submitbutton"
          type="submit"  >Submit </button>
      </form>
      <p>No account ? <button onClick={() => navigate("/signup")}>Create One</button></p>
    </div>
  );


}
