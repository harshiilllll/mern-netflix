import "./listList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import Loader from "../../components/loader/Loader";
import { Box } from "@mui/system";

export default function ListList() {
  const [isLoading, setIsLoading] = useState(false); // added this line
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    setIsLoading(true); // added this line
    getLists(dispatch).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "header-cell",
      width: 220,
    },
    {
      field: "title",
      headerName: "List Title",
      headerClassName: "header-cell",
      width: 240,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-cell",
      width: 100,
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "header-cell",
      width: 100,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 2,
      headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <Delete
              className="del productListDelete"
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
            rows={lists}
            columns={columns}
            getRowId={(r) => r._id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </>
  );
}
