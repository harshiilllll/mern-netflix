import "./userList.css";
import { DataGrid , GridToolbar } from "@mui/x-data-grid";
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
          m="25px 0 0 0"
          height="84vh"
          width="84.5vw"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "yellowgreen",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#727cf5",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#0c1427",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#727cf5",
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
            components={{ Toolbar: GridToolbar }} 
          />
        </Box>
      )}
    </>
  );
}
