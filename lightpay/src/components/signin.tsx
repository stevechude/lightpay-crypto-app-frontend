import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "../components/css/main.css";
const eye = <FontAwesomeIcon icon={faEye} />;

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // const [submitted, setSubmitted] = useState(false);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //setSubmitted(true);
    // console.log(formData);
    Axios.post("http://localhost:3001/auth/login", formData)
      .then((response) => {
        setMessage(response.data.message);
        // console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("userToken", JSON.stringify(token));
        response.data.message === "Login successful." ? navigate("/auth/dashboard/", {
          state: {
            username: response.data.fullname
          }
      }) : console.log("Invalid credentials.");
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setMessage("Error" + error.message);
        }
      });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleForgetPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(formData);
    Axios.post("http://localhost:3001/auth/forgot-password", formData)
      .then((response) => {
        // console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          setMessage(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setMessage(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setMessage("Error" + error.message);
        }
      });
  };

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/signup/");
  };

  return (
    <div className="signin-form-container">
      <div className="container-signin">
        <div className="wrap-signin">
          <form
            action="#"
            onSubmit={handleSubmit}
            className="signin-form validate-form"
          >
            <span className="signin-form-title">Sign In</span>

            <div
              className="wrap-input-signin validate-email"
              data-validate="Please enter email-address"
            >
              <label className="email" htmlFor="email">
                Email Address
              </label>
              <input
                className="input-signin"
                type="text"
                name="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="Email Address"
                id="email-address"
              />
            </div>
            <div
              className="wrap-input-signin validate-password"
              data-validate="Please enter password"
            >
              <label className="password" htmlFor="password">
                Password
              </label>
              <input
                className="input-signin"
                name="password"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                id="password"
                type={passwordShown ? "text" : "password"}
              />
              <i className="eye" onClick={togglePasswordVisiblity}>
                {eye}
              </i>
            </div>

            <div className="text-right">
              <a href="forgot-password" onClick={handleForgetPassword}>
                Forgot Password?
              </a>
            </div>

            <button className="signin-btn" type="submit">
              Sign In
            </button>

            <button className="signup-btn" onClick={handleSignup}>
              Sign Up
            </button>

            {message.length > 0 ? (
              <div className="error-msg">
                {" "}
                <FontAwesomeIcon
                  className="email-error-icon"
                  icon={solid("triangle-exclamation")}
                />
                {message}{" "}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
