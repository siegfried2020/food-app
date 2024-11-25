import { useContext } from "react";
import avatar from "../../../../assets/images/avatar.png";
import { AuthContext } from "../../../../context/AuthContext";

export default function NavBar() {
  let {loginData}=useContext(AuthContext);

 return (
  <div className="bg-white py-3 d-flex justify-content-end align-items-center">
    <img className="mx-3 avatar-img" src={avatar} alt="user-img" />
    <span>{loginData?.userName}</span>
  </div> 
);
}