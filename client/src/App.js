import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import React, { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import WatchDetail from "./pages/watchDetail/WatchDetail";
import Search from "./pages/search/Search";
import WatchList from "./pages/watchList/WatchList";
import Settings from "./pages/settingsPage/Settings";

function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={user ? <Home /> : <Navigate to="login" />}
        />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />

        {user && (
          <React.Fragment>
            <Route path="/movies" element={user ? <Home type="movie" /> : <Navigate to="login" />} />
            <Route path="/series" element={user ? <Home type="series" /> : <Navigate to="login" />} />
            <Route path="/watch" element={user ? <Watch /> : <Navigate to="login" />} />
            <Route path="/watchdetail" element={user ? <WatchDetail /> : <Navigate to="login" />} />
            <Route path="/search" element={user ? <Search /> : <Navigate to="login" />} />
            <Route path="/watchlist" element={user ? <WatchList /> : <Navigate to="login" />} />
            <Route path="/settings" element={user ? <Settings /> : <Navigate to="login" />} />
          </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
