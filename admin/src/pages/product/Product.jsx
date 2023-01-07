import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@mui/icons-material";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";

export default function Product() {
  const [updatedMovie, setUpdatedMovie] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie({
      ...updatedMovie,
      [name]: name === "isSeries" && value === "true" ? true : value,
    });
  };
  console.log(updatedMovie);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update?")) {
      updateMovie(movie._id, dispatch, updatedMovie);
      history.push("/movies");
    }
  };
  
  const location = useLocation();
  const movie = location.movie;
  console.table(movie);

  let dateString = movie.createdAt.slice(0, 10);
  let dateArray = dateString.split("-");
  [dateArray[0], dateArray[2]] = [dateArray[2], dateArray[0]];

  let monthNumber = dateArray[1];
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthName = monthNames[monthNumber - 1];
  dateArray[1] = monthName;
  let uploadDate = dateArray.join(" ");

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description: </span>
              <span className="productInfoValue">{movie.desc}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Uploaded at:</span>
              <span className="productInfoValue">{uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              onChange={handleChange}
              name="title"
              type="text"
              placeholder={movie.title}
            />
            <label>Description</label>
            <textarea
              onChange={handleChange}
              name="desc"
              type="text"
              cols={3}
              placeholder={movie.desc}
            />
            <label>Genre</label>
            <input
              onChange={handleChange}
              name="genre"
              type="text"
              placeholder={movie.genre}
            />
            <label>Age Limit</label>
            <input
              onChange={handleChange}
              name="limit"
              type="text"
              placeholder={movie.limit}
            />
          </div>
          <div className="productFormLeft">
            <label>Is Series</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label>Release Year</label>
            <input
              onChange={handleChange}
              name="year"
              type="text"
              placeholder={movie.year}
            />
            <label>Duration</label>
            <input
              onChange={handleChange}
              name="duration"
              type="text"
              placeholder={movie.duration}
            />
            <label>Trailer</label>
            <input
              onChange={handleChange}
              name="trailer"
              type="file"
              placeholder={movie.trailer}
            />
            <label>Video</label>
            <input
              onChange={handleChange}
              name="video"
              type="file"
              placeholder={movie.video}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                onChange={handleChange}
                name="img"
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            <button onClick={handleSubmit} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
