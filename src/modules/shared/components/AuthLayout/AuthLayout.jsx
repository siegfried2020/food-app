import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

export default function AuthLayout() {
  return (<>
    <div className="auth-container bg-info">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-5 col-md-6 bg-white rounded rounded-2 px-5 py-3">
              <div>
                <div className="logo-container ">
                  <img className="w-75" src={logo} alt="" />
                </div>
                <Outlet/>
              </div>
             
            </div>
          </div>
        </div>
    </div>
  </>
);
}