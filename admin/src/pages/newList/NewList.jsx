import { useState } from "react";
import "./newList.css";
import { getMovies } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { useEffect } from "react";
import { createLists } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    // console.log(e.target.selectedOptions);
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({...list, [e.target.name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createLists(list, dispatch)
    history.push("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select id="type" onChange={handleChange} name="type">
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>CONTENT</label>
            <select
              multiple
              id="content"
              onChange={handleSelect}
              name="content"
              className="movieSelect"
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <button className="addProductButton" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
