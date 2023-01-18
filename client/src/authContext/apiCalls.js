import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch, setError) => {
  
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    setError("Wrong username or password");
    dispatch(loginFailure());
  }
};


//Google Login
export const googleLogin = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/google", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};