import "./widgetLg.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

export default function WidgetLg() {
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const getNewMovies = async () => {
      try {
        const res = await axios.get("/movies?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewMovies();
  }, []);

  // const Button = ({ type }) => {
  //   return <button className={"widgetLgButton " + type}>{type}</button>;
  // };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Recently added Movies/Series</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Series?</th>
            <th className="widgetLgTh">Year</th>
            <th className="widgetLgTh">Uploaded At</th>
            <th className="widgetLgTh">Genre</th>
          </tr>
          {newMovies.map((movie) => {
            const dateOptions = {
              day: "numeric",
              month: "short",
              year: "numeric",
            };
            const formattedDate = new Date(movie.createdAt).toLocaleDateString(
              "en-US",
              dateOptions
            );
            return (
              <tr key={movie._id} className="widgetLgTr">
                <td className="widgetLgUser">
                  <img src={movie.imgSm} alt="" className="widgetLgImg" />
                  <span className="widgetLgName">{movie.title}</span>
                </td>
                <td className="widgetLgAmount">{movie.isSeries ? <DoneRoundedIcon /> : <CloseRoundedIcon />}</td>
                <td className="widgetLgStatus">{movie.year}</td>
                <td className="widgetLgDate">{formattedDate}</td>
                <td className="widgetLgAmount">{movie.genre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
