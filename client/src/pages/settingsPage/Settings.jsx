import React, { useEffect, useRef } from "react";
import "./settings.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import SettingsIcon from "@mui/icons-material/Settings";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Settings = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [newUser, setNewUser] = useState(user);
  const [isLoading, setIsLoading] = useState(true); // added
  const [uploadProgress, setUploadProgress] = useState("");

  const fileInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`users/find/${newUser._id}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUser(response.data);
        setIsLoading(false); // added
      } catch (error) {
        console.error(error);
      }
    };
    if (isLoading) {
      // added
      getUser();
    }
  }, [isLoading, newUser._id]); // added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `users/${user._id}`,
        { ...updatedUser },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      window.alert("Your data has been successfully updated!");
      setNewUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const profilePicUpload = (event) => {
    const file = event.target.files[0];
    const fileName = `${newUser._id}-${newUser.username}/profile_pic`;
    const storageRef = ref(storage, "profilePics/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
        setUploadProgress("Upload is " + progress + "% done click on save");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUpdatedUser({
            ...updatedUser,
            profilePic: downloadURL,
          });
        });
      }
    );
  };

  console.log(updatedUser);
  let strFromGoogle = newUser.fromGoogle.toString();
  let strIsAdmin = newUser.isAdmin.toString();

  if (strFromGoogle === "true" || strIsAdmin === "true") {
    strFromGoogle = "Google User ";
    strIsAdmin = "Admin";
  } else {
    strFromGoogle = "Normal User";
    strIsAdmin = "User";
  }

  let dateString = newUser.createdAt.slice(0, 10);
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
  let createdDate = dateArray.join(" ");

  return (
    <div className="settings">
      <div className="header">
        <h4 onClick={() => navigate("/")}>
          <SettingsIcon className="icon" />
          Settings
        </h4>
        <button
          style={{ textDecoration: "none", color: "var(--font-color)" }}
          className="logout-btn"
          onClick={() => {
            if (window.confirm("Are u sure u want to logout?")) {
              dispatch(logout());
              navigate("/login");
            }
          }}
        >
          Logout
        </button>
      </div>
      <div className="container">
        <div className="right">
          <img htmlFor="file" src={newUser.profilePic} alt="user" />
          <label htmlFor="file">Change Profile</label>
          <small>{uploadProgress}</small>
          <input
            onChange={(e) => {
              profilePicUpload(e);
              setTimeout(() => {
                updateUser(e);
              }, 5000);
            }}
            id="file"
            style={{ display: "none" }}
            type="file"
            ref={fileInputRef}
          />
        </div>
        <div className="left">
          <h3 className="username">{newUser.username}</h3>
          <p className="email">{"Email :" + newUser.email}</p>
          <p className="admin">{strIsAdmin}</p>
          <b className="google">{strFromGoogle}</b>
          <p className="date">Account created on {createdDate}</p>

          <form onSubmit={updateUser}>
            <h3>Edit</h3>
            <div className="inputs">
              <PersonIcon className="icons person" />
              <input
                placeholder={newUser.username}
                name="username"
                type="text"
                onChange={handleChange}
              />
              <AlternateEmailIcon className="icons email" />
              <input
                placeholder={newUser.email}
                name="email"
                type="email"
                onChange={handleChange}
              />
              <LockOpenIcon className="icons lock" />
              <input
                placeholder="Password"
                name="password"
                type="text"
                onChange={handleChange}
              />
              <button className="update-btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
