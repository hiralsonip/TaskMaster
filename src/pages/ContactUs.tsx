import React, { FormEvent, useState } from "react";
import axios from "axios";
import "./ContactUs.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the form data
    const { firstname, lastname, email, message } = formData;

    // Make the POST request
    axios
      .post("http://localhost:3000/contactUs/addContact", {
        firstName: firstname,
        lastName: lastname,
        email: email,
        message: message,
      })
      .then((response) => {
        // Handle the response here
        console.log(response.data);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <section id="contact">
      <h1 className="section-header">Contact</h1>

      <div className="contact-wrapper">
        {/* Left contact page */}
        <form
          id="contact-form"
          className="form-horizontal"
          role="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control type-text"
              id="firstname"
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control type-text"
              id="lastname"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control type-text"
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            className="form-control type-text"
            rows={10}
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            className="btn btn-primary send-button"
            id="submit"
            type="submit"
            value="SEND"
          >
            <div className="alt-send-button">
              <span className="send-text">Send</span>
            </div>
          </button>
        </form>
        {/* End of Left contact page */}

        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <span className="contact-text company">
                {/* <b>Logic Legends</b> */}
              </span>
            </li>
            <li className="list-item">
              <span className="contact-text company">
                <b>Logic Legends</b>
              </span>
            </li>

            <li className="list-item">
              <span className="contact-text phone">
                <a href="tel:1-212-555-5555" title="Give me a call">
                  (212) 555-2368
                </a>
              </span>
            </li>

            <li className="list-item">
              <span className="contact-text gmail">
                <a href="mailto:#" title="Send me an email">
                  logiclegends@gmail.com
                </a>
              </span>
            </li>
          </ul>
          <br /> <hr />
          <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
