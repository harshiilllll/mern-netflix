import { useState } from "react";
import "./newUser.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {dispatch} = useContext(UserContext)

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: name === "isAdmin" && value === "true" ? true : value
    });
    console.log(user);
  }

  const upload = (items) => {
    if(!items) return;
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/content/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
           Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUser((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1)
          });
        }
      );
    });
  };

  console.log(user);

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: profilePic, label: "profilePic" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch)
    history.push("/users")
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add User</h1>
      {uploadProgress}
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
            type="text"
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
        <div className="addProductItem">
          <label>Is Admin</label>
          <select id="isAdmin" onChange={handleChange} name="isAdmin">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Profile pic</label>
          <input
            type="file"
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
