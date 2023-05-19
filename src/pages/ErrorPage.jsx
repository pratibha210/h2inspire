import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

function ErrorPage() {

  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("AUTH_USER") !== undefined) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <div className="main">
      <div className="center-div">
        <h2>Oops! Something went wrong.</h2>
      </div>
    </div>
  );
}

export default ErrorPage;
