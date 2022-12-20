import React from 'react';

import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="top">
        <h1 className="logo">NETFLIX</h1>
      </div>
      <div className="container">
        <form className="form">
          <h2>Sign In</h2>
          <div className="inputs">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
          <button className="login-btn">Sign In</button>

          <span className="newto">
            New to Netflix? <span className="link"> Sign up now. </span>
          </span>
          <span className="captcha-info">This page is protected by Google reCAPTCHA to ensure you're not a bot. <b> Learn more. </b></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
