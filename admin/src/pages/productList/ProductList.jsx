import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect, useState } from "react";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";

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
    { field: "_id", headerName: "ID", width: 190 },
    {
      field: "movies",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Age Limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
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
    <div className="productList">
      {isLoading ? (
        <Loader /> // added this line
      ) : (
        <>
          <Link to="/newproduct">
            <button className="productAddButton">Upload Movie</button>
          </Link>
          <DataGrid
            rows={movies}
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
