import './Passwordchange.css'
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
export function PasswordChange() {
    const navigate = useNavigate();

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const pswdschema = yup.object().shape({
        Newpassword: yup.string()
            // .required()
            .min(8, "Password should length should be 8")
            .matches(passwordRules, { message: "Please must contain Upper,Lower,numbers,special carecters" }),
        Confirmpassword: yup.string()
            // .required()
            .min(8, "Password should length should be 8")
            .matches(passwordRules, { message: "Please must contain Upper,Lower,numbers,special carecters" }),
    })
    const { values, handleSubmit, errors, touched, handleChange, handleBlur } = useFormik({
        initialValues: {
            Newpassword: "",
            Confirmpassword: ""
        },
        validationSchema: pswdschema,
        onSubmit: (pswd) => {
            console.log(pswd)
            pswdchange(pswd)
        }

    })


    const pswdchange = (pswd) => {
        fetch("https://mernapp-eventfinder.herokuapp.com/changepassword",
            {
                method: "POST",
                body: JSON.stringify({ ...pswd, email: localStorage.getItem('useremail') }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(result => result.json())
            .then((data) => {
                console.log('data', data)
                alert(data.msg)
                if (data.msg === "Password had been Changed") {
                    navigate("/login");
                }

                console.log('pswd', pswd);


            }
            )
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className='pswdchangeform'>
            <p className='pswdchangee'>Change password</p>
            <label htmlFor="Newpassword" className='passwordchangelabel'> Newpassword</label>
            <input type="password"
                name="Newpassword"
                value={values.Newpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.Newpassword && touched.Newpassword ? "input-error" : ""}
                placeholder="Enter NewPassword"
            />
            {errors.Newpassword && touched.Newpassword && <p className="loginerror">{errors.Newpassword}</p>}
            <label htmlFor="Newpassword" className='passwordchangelabel'> Confirmpassword</label>
            <input type="password"
                name="Confirmpassword"
                value={values.Confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.Confirmpassword && touched.Confirmpassword ? "input-error" : ""}
                placeholder=" Confirm  NewPassword"
            />
            {errors.Confirmpassword && touched.Confirmpassword && <p className="loginerror">{errors.Confirmpassword}</p>}


            <button className="pswdbutton"
                type="submit"  > Update </button>
        </form>
    )
}