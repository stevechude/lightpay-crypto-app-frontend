import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    handleVerification();
  }, []);

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/signin/");
  };

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/signup/");
  };

  const handleVerification = () => {
    Axios.post(
      `http://localhost:3001/auth/verify-email/${params.get("verifyToken")}`
    )
      .then((response) => {
        console.log(response.data);
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

  return (
    <section className="verify-screen-container">
      <div className="container-verify">
        <div className="wrap-signin">
          {message === "Account verified successfully." ? (
            <div>
              <div className="img-container-verify">
                <br></br>
                <img src="/images/verifyAnim.gif" alt="Account verified icon" />
              </div>
              <div className="verify-message">
                <p>{message}</p>
                <button
                  className="signin-btn"
                  type="submit"
                  onClick={handleSignin}
                >
                  Proceed to Sign In
                </button>
              </div>
            </div>
          ) : null}

          {message === "Invalid verification link." ? (
            <div>
              <div className="img-container-verify">
                <br></br>
                <img src="/images/errorAnim.gif" alt="Error occured icon" />
              </div>
              <div className="verify-message">
                <p>{message}</p>
                <button
                  className="signin-btn"
                  type="submit"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
