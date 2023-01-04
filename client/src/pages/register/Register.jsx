import { useRef, useState } from "react";
import "./register.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    console.log(username + " " + password + " " + email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("auth/register", { email, username, password });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="register">
    //   <div className="top">
    //     <h1 className="logo">NETFLIX</h1>
    //     <Link to="/login" className="login-btn">
    //       Sign In
    //     </Link>
    //   </div>
    //   <div className="container">
    //     <h1>Unlimited Movies, TV shows, and more.</h1>
    //     <h2>Watch anywhere, Cancel anytime.</h2>
    //     <p>
    //       Ready to watch? Enter your email to create or restart your membership.
    //     </p>
    //     <form className="input">
    // <input type="email" placeholder="Email address" ref={emailRef} />
    // <input type="text" placeholder="Username" ref={usernameRef} />
    // <input type="password" placeholder="Password" ref={passwordRef} />

          // {!username || !email || !password ? (
          //   <button className="register-btn" onClick={handleStart}>
          //     Get Started
          //     <ArrowForwardIosIcon className="icon" />
          //   </button>
          // ) : (
          //   <button className="register-btn" onClick={handleRegister}>
          //     Start
          //   </button>
          // )}
    //     </form>
    //   </div>
    // </div>

    <div className="register">
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
          <h2>Sign Up</h2>
          <div className="inputs">
            <PersonIcon className="icons person" />
            <input type="text" placeholder="Username" ref={usernameRef} />
            <AlternateEmailIcon className="icons email" />
            <input type="email" placeholder="Email address" ref={emailRef} />
            <LockIcon className="icons lock" />
            <input type="password" placeholder="Password" ref={passwordRef} />
          </div>
          {!username || !email || !password ? (
            <button className="register-btn" onClick={handleStart}>
              Get Started
              <ArrowForwardIosIcon className="icon" />
            </button>
          ) : (
            <button className="register-btn" onClick={handleRegister}>
              Sign Up
            </button>
          )}

          <span className="newto">
            Already registered?
            <Link className="link" to="/login">
              Sign In now.
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

export default Register;
