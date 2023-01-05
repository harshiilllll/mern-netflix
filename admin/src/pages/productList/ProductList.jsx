import "./productList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect, useState } from "react";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";
import { Box } from "@mui/material";

export default function ProductList() {
  const [isLoading, setIsLoading] = useState(false); // added this line
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    setIsLoading(true); // added this line
    getMovies(dispatch).then(() => setIsLoading(false)); // added this line
  }, [dispatch]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220, headerClassName: "header-cell", },
    {
      field: "movies",
      headerName: "Movie",
      width: 240, headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", flex: 1, headerClassName: "header-cell", },
    { field: "year", headerName: "Year", flex: 1, headerClassName: "header-cell", },
    { field: "limit", headerName: "Age Limit", flex: 1, headerClassName: "header-cell", },
    { field: "isSeries", headerName: "isSeries", flex: 1, headerClassName: "header-cell", },
    {
      field: "action",
      headerName: "Action",
      width: 120, headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/product/" + params.row._id, movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
            rows={movies}
            columns={columns}
            getRowId={(r) => r._id}
            components={{ Toolbar: GridToolbar }} 
          />
        </Box>
      )}
    </>
  );
}
