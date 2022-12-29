import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;

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

  console.log(uploadDate); // Output: "28 Dec 2022"

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movies</h1>
        <Link to="/newproduct">
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
            <input type="text" placeholder={movie.title} />
            <label>Description</label>
            <textarea type="text" cols={3} placeholder={movie.desc} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} />
            <label>Age Limit</label>
            <input type="text" placeholder={movie.limit} />
            <label>Is Series</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Trailer</label>
            <input type="file" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="file" placeholder={movie.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
