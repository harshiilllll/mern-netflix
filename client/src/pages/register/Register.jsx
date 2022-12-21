import React from 'react';

import { useRef, useState } from "react";
import "./register.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  };

  return (
    <div className="register">
      <div className="top">
        <h1 className="logo">NETFLIX</h1>
        <button className="login-btn">Sign In</button>
      </div>
      <div className="container">
        <h1>Unlimited Movies, TV shows, and more.</h1>
        <h2>Watch anywhere, Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email address" ref={emailRef} />
            <button className="register-btn" onClick={handleStart}>
              Get Started
              <ArrowForwardIosIcon className="icon" />
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button className="register-btn" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
