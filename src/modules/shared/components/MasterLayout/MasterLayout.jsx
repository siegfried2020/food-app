import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../Sidebar/SideBar";

export default function MasterLayout() {
  return (
  <div className="d-flex">
    <div className="border-0"><SideBar/></div>
    
    <div className="w-100">
      <NavBar/>
      
      <Outlet/>
    </div>
  </div>);
}