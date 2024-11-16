import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../Sidebar/SideBar";

export default function MasterLayout({loginData}) {
  return (
  <div className="d-flex">
    <div className="bg-info"><SideBar/></div>
    
    <div className="w-100">
      <NavBar loginData={loginData}/>
      
      <Outlet/>
    </div>
  </div>);
}