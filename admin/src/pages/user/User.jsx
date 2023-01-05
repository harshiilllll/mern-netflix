import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";

import "./user.css";

export default function User() {
  const [updatedUser, setUpdatedUser] = useState(null);

  const {dispatch} = useContext(UserContext)

  const history = useHistory();

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUpdateUser({
  //     ...updateUser,
  //     [name]: name === "isAdmin" && value === "true" ? true : value
  //   });
  //   console.log(updateUser);
  // }

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, [e.target.name]: value });
  };
  console.log(updatedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update?")){
      updateUser(user._id, dispatch, updatedUser)
      history.push("/users")
    }
  }

  const location = useLocation();
  const user = location.user;

  let dateString = user.createdAt.slice(0, 10);
  let dateArray = dateString.split("-");
  [dateArray[0], dateArray[2]] = [dateArray[2], dateArray[0]];

  let monthNumber = dateArray[1];
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthName = monthNames[monthNumber - 1];
  dateArray[1] = monthName;
  let joinDate = dateArray.join(" ");

  console.log(user.isAdmin);

  let strIsAdmin = user.isAdmin.toString();
  strIsAdmin = (strIsAdmin === "true") ? "Admin" : "User";



  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{strIsAdmin}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{joinDate}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="password"
                  className="userUpdateInput"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
