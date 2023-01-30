import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import Preloader from "./components/preloader/Preloader";
import { WatchContextProvider } from "./watchlistContext/WatchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Preloader>
      <AuthContextProvider>
        <WatchContextProvider>
          <App />
        </WatchContextProvider>
      </AuthContextProvider>
    </Preloader>
  </React.StrictMode>
);
