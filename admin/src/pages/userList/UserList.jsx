import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import Loader from "../../components/loader/Loader";
import { Box } from "@mui/material";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false); // added this line

  useEffect(() => {
    setIsLoading(true); // added this line
    getUsers(dispatch).then(() => setIsLoading(false)); // added this line
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    {
      field: "_id",
      sort: "desc",
      cellClassName: "cell",
      headerClassName: "header-cell",
      headerName: "ID",
      width: 200
    },
    {
      field: "username",
      headerName: "Username",
      cellClassName: "cell",
      headerClassName: "header-cell",
      width: 200,
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
    {
      field: "email",
      cellClassName: "cell",
      headerClassName: "header-cell",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-cell",
      width: 100,
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
    <>
      {isLoading ? (
        <Loader /> // added this line
      ) : (
        <Box
          m="40px 0 0 0"
          height="75vh"
          width="83vw"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#94e2cd",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#3e4396",
              color: "#FFFFFF"
            },
            "& .MuiCheckbox-root": {
              color: "#b7ebde !important",
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={users}
            columns={columns}
            getRowId={(r) => r._id}
          />
        </Box>
      )}
    </>
  );
}
