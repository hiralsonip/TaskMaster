import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import "../CSS/ruta.css";

type Props = {};

type State = {
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  email: string,
  profile_picture: string,
  phone_number: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      profile_picture: "",
      phone_number: "",
      successful: false,
      message: ""
    };
  }

  validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .min(3, "The username must be at least 3 characters.")
        .max(20, "The username must not exceed 20 characters.")
        .required("Username is required."),
      password: Yup.string()
        .min(6, "The password must be at least 6 characters.")
        .max(40, "The password must not exceed 40 characters.")
        .required("Password is required."),
      first_name: Yup.string()
        .min(3, "The first name must be at least 3 characters.")
        .max(20, "The first name must not exceed 20 characters.")
        .required("First name is required."),
      last_name: Yup.string()
        .min(3, "The last name must be at least 3 characters.")
        .max(20, "The last namename must not exceed 20 characters.")
        .required("Last name is required."),
      email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
      profile_picture: Yup.string()
        .min(3, "Profile picture must be at least 3 characters.")
        .max(20, "Profile picture must not exceed 20 characters.")
        .required("Profile picture is required."),
      phone_number: Yup.string()
        .min(3, "Phone number must be at least 3 characters.")
        .max(20, "Phone number must not exceed 20 characters.")
        .required("Phone number is required."),
    });
  };

  handleRegister(formValue: {
    username: string, password: string, first_name: string,
    last_name: string, email: string, profile_picture: string, phone_number: string
  }) {
    const { username, password, first_name, last_name, email, profile_picture, phone_number } = formValue;
    console.log("register", "registerrrrrrrrrr")
    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      username,
      password,
      first_name,
      last_name,
      email,
      profile_picture,
      phone_number
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        console.log("register", "erorrrrrr")
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }

    );
  }

  render() {
    //for logout 
    // AuthService.logout();


    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      profile_picture: "",
      phone_number: ""
    };

    return (
      <div id="maindiv">
        <div className="col-md-12" >
          <div className="card card-container">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />

            <Formik
              initialValues={initialValues}
              validationSchema={this.validationSchema}
              onSubmit={this.handleRegister}
            >
              <Form>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username"> Username </label>
                      <Field name="username" type="text" className="form-control" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password"> Password </label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="first_name"> First Name </label>
                      <Field
                        name="first_name"
                        type="first_name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="last_name"> Last Name </label>
                      <Field
                        name="last_name"
                        type="last_name"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email"> Email ID </label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="profile_picture"> Profile </label>
                      <Field
                        name="profile_picture"
                        type="profile_picture"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="profile_picture"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone_number"> Phone Number </label>
                      <Field
                        name="phone_number"
                        type="phone_number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
                )}

                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}
