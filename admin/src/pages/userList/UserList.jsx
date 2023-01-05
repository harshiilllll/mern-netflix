import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import Loader from "../../components/loader/Loader";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // added this line

  useEffect(() => {
    setIsLoading(true); // added this line
    getUsers(dispatch)
      .then(() => setIsLoading(false)) // added this line
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  };

  const columns = [
    { field: "_id", sort: "desc", headerName: "ID", width: 240 },
    {
      field: "username",
      headerName: "Username",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 260 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/user/" + params.row._id, user: params.row }}
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      {isLoading ? <Loader /> : ( // added this line
        <>
          <Link to="/newuser">
            <button className="productAddButton">Add User</button>
          </Link>
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        </>
      )}
    </div>
  );
}
