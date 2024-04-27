import React, { useEffect } from "react";
import ErrorImage from "../Screenshots/404.png";
import { getAllUser } from "../user/getuser";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  useEffect(() => {
    getAllUser()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="bg-cover bg-center w-full h-full"
        style={{ backgroundImage: `url(${ErrorImage})` }}
      ></div>
    </div>
  );
};

export default ErrorPage;
