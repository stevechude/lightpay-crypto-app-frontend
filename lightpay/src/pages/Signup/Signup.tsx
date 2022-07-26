import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './Signup.css';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email: '',
    fullname: '',
    mobile: '',
    password: '',
  });

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/signin/');
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let response: any = await axios.post(
        'http://localhost:3001/auth/register',
        {
          email: profile.email,
          fullname: profile.fullname,
          mobile: profile.mobile,
          password: profile.password,
        }
      );

      console.log(response.data);
      setSuccessMessage(response.data.message);

      setErrorMessage('');
      setProfile({
        email: '',
          fullname: '',
          mobile: '',
          password: '',
      })
    } catch (e: any) {
      let error = e.response.data;

      setErrorMessage(e.response.data);
      setSuccessMessage('');
      console.log(error);
    }
  };

  //password toggle function
  const [state, setState] = useState(true);

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };
  console.log(errorMessage);

  return (
    <section className="container1">
      <div className="container2">
      {successMessage.length > 0 ? (
                <div className="success-msg">
                  <FontAwesomeIcon
                    onClick={() => setSuccessMessage('')}
                    className="cancel-icon"
                    icon={solid('circle-xmark')}
                  />
                  <FontAwesomeIcon
                    className="check-icon"
                    icon={solid('circle-check')}
                  />{' '}
                  {successMessage}{' '}
                </div>
              ) : null}
        <div className="heading">
          <h2>Sign Up</h2>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
            {/* name */}
            <div className="form-group">
              <div id="name-label">
                <label className="label">Full Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="fullname"
                value={profile.fullname}
                placeholder="Full Name"
                onChange={handleProfile}
              />
              {errorMessage && !profile.fullname ? (
                <>
                  <p className="form-error">Enter a valid name</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.fullname && profile.fullname.length < 3 ? (
                <>
                  <p className="form-error">Cannot be less than 3 characters</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>

            {/* email */}
            <div className="form-group">
              <div id="email-label">
                <label className="label">Email Address</label>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                placeholder="Email Address"
                onChange={handleProfile}
              />
              {errorMessage && !profile.email ? (
                <>
                  <p className="form-error">Enter a valid email address</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>

            {/* phone */}
            <div className="form-group">
              <div id="phone-label">
                <label className="label">Mobile Number</label>
              </div>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="mobile"
                value={profile.mobile}
                placeholder="Mobile"
                onChange={handleProfile}
              />
              {errorMessage && !profile.mobile ? (
                <>
                  <p className="form-error">Enter a valid phone number</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.mobile && profile.mobile.match(/[A-Za-z]/g) ? (
                <>
                  <p className="form-error">Enter a valid phone number</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : null}
            </div>

            {/* password */}
            <div className="form-group">
              <div id="password-label">
                <label className="label">Password</label>
              </div>
              <div id="password-toggle">
                <input
                  type={state ? 'password' : 'text'}
                  className="form-control password-control"
                  id="password"
                  name="password"
                  value={profile.password}
                  placeholder="Password"
                  onChange={handleProfile}
                />
                  <FaEye className="togglebtn" onClick={toggleBtn}></FaEye>
              </div>
              {errorMessage && !profile.password ? (
                <>
                  <p className="form-error">Password cannot be empty</p>
                  <FontAwesomeIcon
                    className="form-error-icon"
                    icon={solid('circle-exclamation')}
                  />
                </>
              ) : profile.password &&
                !profile.password.match(
                  /(?=[A-Za-z0-9@#,.!$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#,.!$%^&+!=])(?=.{8,100}).*$/g
                ) ? (
                <>
                  <p className="form-error-password">Minimum of 8 characters</p>
                  <p className="form-error-password">At least 1 number</p>
                  <p className="form-error-password">At least 1 lowercase</p>
                  <p className="form-error-password">At least 1 uppercase</p>
                  <p className="form-error-password">At least 1 symbol</p>
                  <p className="form-error-password">No white spaces</p>
                </>
              ) : null}
            </div>

            {/* submit */}
            <div className="form-group">
              <button type="submit" className="btn-signup">
                Sign Up
              </button>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn-signin"
                onClick={handleSignin}
              >
                Sign In
              </button>
              {errorMessage.length >= 1 && errorMessage.includes('exists') ? (
                <div className="error-msg">
                  {' '}
                  <FontAwesomeIcon
                    className="email-error-icon"
                    icon={solid('triangle-exclamation')}
                  />
                  {errorMessage}{' '}
                </div>
              ) : null}
              <p className="policy">
                By signing up, you agree to our{' '}
                <a href="#">Terms & Conditions</a> and our{' '}
                <a href="#">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
