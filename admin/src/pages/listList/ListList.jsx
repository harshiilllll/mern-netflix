import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";
import Loader from "../../components/loader/Loader";

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
    { field: "_id", headerName: "ID", width: 190 },
    { field: "title", headerName: "List Title", width: 200 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
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
          <Link to="/newlist">
            <button className="productAddButton">Create List</button>
          </Link>
          <DataGrid
            rows={lists}
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
