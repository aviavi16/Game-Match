import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png"
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export function LoginPage() {
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    function loginComplete(){
        // if(isLoggedIn){
        //     navigate('/');
        //  }
        navigate('/homepage');
    }
    return (
        <section className="login-page-container">
            <div className="login-page-bg-container">
                <div className="login-page-title-container">
                    <div className="login-title-logo"><img src={logo} className='menu-logo' alt='menu'/></div>
                    <div className="login-title-text">Game Match</div>
                </div>
            </div>
            <div className="login-page-bg-container2">
                
            </div>
            <div className="login-page-bg-container3">
                <Formik  initialValues={{ fullname: "", email: "", password: "" }}
         validate={(values) => {
           const errors = {};
           if (!values.fullname) {
             errors.fullname = "Required";
           }

           if (!values.email) {
             errors.email = "Required";
           } else if (
             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
           ) {
             errors.email = "Invalid email address";
           }
           if (!values.password) {
             errors.password = "Required";
           }
           return errors;
         }}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              loginComplete()
            }, 400);
          }}
        >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            type="text"
                            name="fullname"
                            placeholder="Enter your fullname"
                        />
                        <ErrorMessage name="fullname" component="div" />

                        <Field
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                        <ErrorMessage name="email" component="div" />

                        <Field
                            type="fullname"
                            name="bggUser"
                            placeholder="Enter BGG username"
                        />
                        <ErrorMessage name="bggUser" component="div" />

                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                    )}
                </Formik>
            </div>
            
        </section>
    )
}