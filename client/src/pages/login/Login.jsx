import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { googleLogin, login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LoginIcon from "@mui/icons-material/Login";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        username: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      };
      await googleLogin(user, dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="side-panel">
          <div className="logo">
            <img
              src="https://www.pngarts.com/files/11/Akatsuki-Cloud-PNG-Image.png"
              alt="logo"
            />
            <h1>NARUTO</h1>
            {/* <span className="copy">Copyright &copy; Harshil</span> */}
          </div>
          <div></div>
        </div>
        <form className="form">
          <h2>Sign In</h2>
          <div className="inputs">
            <AlternateEmailIcon className="icons person" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <LockIcon className="icons lock" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" onClick={handleLogin}>
            Sign In <LoginIcon />
          </button>
          <span className="or">OR</span>
          <button className="login-btn google-btn" onClick={signinWithGoogle}>
            <img
              src="https://cdn.discordapp.com/attachments/1031916555535134742/1061892730097254437/google-icon.png"
              alt="google icon"
            />
            Google
          </button>

          <span className="newto">
            New to Netflix?
            <Link className="link" to="/register">
              Sign up now.
            </Link>
          </span>
          <span className="captcha-info">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b> Learn more. </b>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
