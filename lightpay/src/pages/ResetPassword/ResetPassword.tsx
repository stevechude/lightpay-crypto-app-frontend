import React, { ChangeEvent, useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./ResetPassword.css";
const eye = <FontAwesomeIcon icon={faEye} />;

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordVisiblities = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const [submitted, setSubmitted] = useState(false);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search);

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/signin/");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // console.log(formData);
    if (formData.password === formData.confirmPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      setSubmitted(true);

      Axios.post(
        `http://localhost:3001/auth/reset-password/${params.get("resetToken")}`,
        formData
      )
        .then((response) => {
          console.log(response.data);
          setMessage("Password updated successfully.");
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            setMessage(error.response.data);
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
    } else {
      console.log("Passwords do not match.");
      setMessage("Passwords do not match.");
    }
  };

  return (
    <section className="container-reset-main">
      <div className="container-reset">
        <div className="heading">
          <h2>Reset Password</h2>
          <br></br>

          <form
            action="#"
            onSubmit={handleSubmit}
            className="reset-form validate-form"
          >
            <div
              className="wrap-reset validate-password"
              data-validate="Please enter password"
            >
              <label className="password" htmlFor="password">
                New password:
              </label>
              <input
                className="input-reset"
                name="password"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter new password."
                id="password"
                type={passwordShown ? "text" : "password"}
              />
              <i className="eye" onClick={togglePasswordVisiblity}>
                {eye}
              </i>
            </div>

            <div
              className="wrap-input validate-password"
              data-validate="Please enter password"
            >
              <label className="password" htmlFor="confirmPassword">
                Confirm password:
              </label>
              <input
                className="input"
                name="confirmPasswords"
                value={formData.confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Re-enter password."
                id="passwords"
                type={confirmPasswordShown ? "text" : "password"}
              />
              <i className="eye" onClick={togglePasswordVisiblities}>
                {eye}
              </i>
            </div>

            <button className="reset-btn" type="submit">
              Reset Password
            </button>

            {message.length > 0 ? (
              <div>
                <br></br>
                <p style={{ textAlign: "center" }}>{message}</p>
              </div>
            ) : null}

            {message === "Password updated successfully." ? (
              <div>
                <button
                  className="signin-btn"
                  type="submit"
                  onClick={handleSignin}
                >
                  Proceed to Sign In
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
