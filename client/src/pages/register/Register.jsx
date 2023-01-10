import { useContext, useRef, useState } from "react";
import "./register.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { googleLogin } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
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
    <div className="register">
      <div className="container">
        <div className="side-panel">
          <div className="logo">
            <img
              src="https://www.pngarts.com/files/11/Akatsuki-Cloud-PNG-Image.png"
              alt="logo"
            />
            <h1>NARUTO</h1>
          </div>
          <div></div>
        </div>
        <form className="form">
          <h2>Sign Up</h2>
          <div className="inputs">
            <PersonIcon className="icons person" />
            <input
              type="text"
              placeholder="Username"
              ref={usernameRef}
              required
            />
            <AlternateEmailIcon className="icons email" />
            <input
              type="email"
              placeholder="Email address"
              ref={emailRef}
              required
            />
            <LockIcon className="icons lock" />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
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
          <span className="or">OR</span>
          <button
            className="register-btn google-btn"
            onClick={signinWithGoogle}
          >
            <img
              src="https://cdn.discordapp.com/attachments/1031916555535134742/1061892730097254437/google-icon.png"
              alt="google icon"
            />
            Google
          </button>

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
