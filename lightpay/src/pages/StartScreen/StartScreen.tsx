import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import '../../App.css';
import './StartScreen.css';

const StartScreen = () => {
  const [splashScreen, setSplashScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setSplashScreen(false), 5300);
  }, []);

  const handleSignup = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate('/signup/');
  };

  return (
    <>
      {splashScreen === false ? (
        <div className="start-container1">
          <div className="start-container2">
            <div className="wrap-startScreen">
              <img
                className="welcome-img"
                src="/images/koin.gif"
                alt="welcome icon"
              />
              <button
                className="start-btn getStarted-btn"
                onClick={handleSignup}
              >
                Get Started
              </button>

              {/* <button className="start-btn importWallet-btn">
                Import Wallet
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default StartScreen;
