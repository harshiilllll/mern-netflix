import "./productList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CloseRounded, Delete, DeleteOutline, DoneRounded } from "@mui/icons-material";
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
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      headerClassName: "header-cell",
    },
    {
      field: "imgSm",
      headerName: "Img",
      width: 50,
      headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 240,
      headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      flex: 1,
      headerClassName: "header-cell",
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      headerClassName: "header-cell",
    },
    {
      field: "limit",
      headerName: "Age Limit",
      flex: 0.6,
      headerClassName: "header-cell",
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 0.6,
      headerClassName: "header-cell",
    },
    {
      field: "isSeries",
      headerName: "Series",
      flex: 0.5,
      headerClassName: "header-cell",
      renderCell: (params) => {
        return Boolean(params.row.isSeries) ? <DoneRounded className="yes" /> : <CloseRounded className="no" />;
      },
    },
    {
      field: "createdAt",
      headerName: "Uploaded At",
      flex: 1,
      headerClassName: "header-cell",
      renderCell: (params) => {
        const dateOptions = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const formattedDate = new Date(params.row.createdAt).toLocaleDateString(
          "en-US",
          dateOptions
        );
        return formattedDate;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerClassName: "header-cell",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
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
