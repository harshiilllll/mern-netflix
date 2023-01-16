import { useState, useEffect } from "react";
import "./preloader.scss";
import LOGO from "../../img/LOGO.png";

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="preloader">
        <img src={LOGO} alt="LOGO" className="logo" />
        <div className="loading">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }
  return children;
}
