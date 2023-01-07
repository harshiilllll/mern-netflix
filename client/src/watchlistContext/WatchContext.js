import { useEffect, useReducer } from "react";
import { createContext } from "react";
import WatchReducer from "./WatchReducer";

const INITIAL_STATE = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

export const WatchContext = createContext(INITIAL_STATE);

export const WatchContextProvider = (props) => {
  const [state, dispatch] = useReducer(WatchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  //actions
  const addMovieToWatchList = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removieMovieFromWatchList = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };
  return (
    <WatchContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchList,
        removieMovieFromWatchList,
      }}
    >
      {props.children}
    </WatchContext.Provider>
  );
};
