import "./userList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete, VerifiedUser, AccountCircle } from "@mui/icons-material";
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
      headerClassName: "header-cell",
      cellClassName: "cell",
      headerName: "ID",
      flex: 4,
    },
    {
      field: "username",
      headerName: "Username",
      cellClassName: "cell",
      headerClassName: "header-cell",
      flex: 4,
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
      flex: 4,
    },
    {
      field: "isAdmin",
      cellClassName: "cell",
      headerClassName: "header-cell",
      headerName: "Admin",
      flex: 1,
      renderCell: (params) => {
        return Boolean(params.row.isAdmin) ? <VerifiedUser className="yes" /> : <AccountCircle />;
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "header-cell",
      cellClassName: "cell",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/user/" + params.row._id, user: params.row }}
            >
              <button className="userListEdit">View</button>
            </Link>
            <Delete
              className="del userListDelete"
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
          m="0 0 0 0"
          height="93vh"
          width="94%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "var(--accent-color)",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "var(--main-color)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "var(--accent-color)",
              color: "var(--font-color)",
            },
            "& .MuiCheckbox-root": {
              color: "var(--tick-color) !important",
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={users}
            columns={columns}
            getRowId={(r) => r._id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </>
  );
}
