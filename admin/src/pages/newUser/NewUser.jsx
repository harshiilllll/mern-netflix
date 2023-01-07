import { useState } from "react";
import "./newUser.css";
// import storage from "../../firebase";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUser } from "../../context/userContext/apiCalls";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";

export default function NewProduct() {
  const [user, setUser] = useState(null);
  const {dispatch} = useContext(UserContext)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: name === "isAdmin" && value === "true" ? true : value
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch)
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add User</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="exampleusername"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Profile Pic</label>
          <input
            type="text"
            placeholder="Your Profile Pic Url"
            name="profilePic"
            onChange={handleChange}
          />
        </div> */}
        <div className="addProductItem">
          <label>Is Admin?</label>
          <select id="isSeries" onChange={handleChange} name="isAdmin">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
