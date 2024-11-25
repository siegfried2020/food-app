import { useContext } from "react";
import Header from "../../../shared/components/Header/Header";
import { AuthContext } from "../../../../context/AuthContext";

export default function Dashboard() {
  
  let {loginData}=useContext(AuthContext);
  return (
  <div>
    <h1>{loginData?.userGroup}</h1>
    <Header title={`Welcome ${loginData?.userName}`} description=
    {'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    <div className="fill-recipe-container my-3 mx-3 p-5 d-flex justify-content-between align-items-center">
      <div>
        Dashboard
      </div>

      <div>
        <button className="btn btn-success">Fill Recipes</button>
      </div>
    </div>
  </div>);
}