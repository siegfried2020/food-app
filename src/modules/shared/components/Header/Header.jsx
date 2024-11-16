import React from "react";
import eatingLogo from "../../../../assets/images/eating vegan food-rafiki.png";
export default function Header({title, loginData, description}) {
  return (
  <div className="header-container  my-5 mx-4 p-5 d-flex justify-content-between align-items-center">
    <div className="caption w-100 text-white">
      <h1> <span className="fw-bold">{title}</span> {loginData}</h1>
      <p>{description} 
      </p>
    </div>
    <div className="header-img">
      <img src={eatingLogo}/>
    </div>
  </div>);
}