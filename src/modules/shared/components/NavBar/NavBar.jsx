import avatar from "../../../../assets/images/avatar.png";

export default function NavBar({loginData}) {
 return (
  <div className="bg-white py-3 d-flex justify-content-end align-items-center">
    <img className="mx-3 avatar-img" src={avatar} alt="user-img" />
    <span>{loginData?.userName}</span>
  </div> 
);
}