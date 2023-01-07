import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./search.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`/movies/search${query}`, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setMovies(res.data);
    };
    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="searchPage">
        {movies.map((movie) => {
          let strIsSeries = movie.isSeries.toString();
          strIsSeries = strIsSeries === "true" ? "TV" : "Movie";
          return (
            <Link className="movieCard" key={movie._id} to='/watchdetail' state={{ movie: movie }}>
              <div className="moviePoster">
                <img className="movieImg" src={movie.imgSm} alt={movie.title} />
              </div>
              <div className="movieInfo">
                <h3 className="movieTitle">{movie.title}</h3>
                <div className="movieBottomInfo">
                  <span className="movieGenre">{movie.genre}</span>
                  <span className="dot"></span>
                  <span className="movieDuration">{movie.duration}</span>
                </div>
                <p className="movieDesc">{movie.desc}</p>
                <div className="tags">
                  <span className="movieYear">{movie.year}</span>
                  <span className="movieIsSeries">{strIsSeries}</span>
                  <span className="movieLimit">{movie.limit}+</span>
                </div>
                <PlayCircleRoundedIcon className="playIcon" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Search;
