import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { WatchContextProvider } from "./watchlistContext/WatchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WatchContextProvider>
        <App />
      </WatchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
