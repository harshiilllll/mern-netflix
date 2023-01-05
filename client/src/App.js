import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import React, { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import WatchDetail from "./pages/watch Detail/WatchDetail";

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
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/watchdetail" element={<WatchDetail />} />
          </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
