import React from "react";
import {useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {useForm} from "react-hook-form";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function ResetPass() {
  let navigate=useNavigate()
  let {register, formState:{errors}, handleSubmit}=useForm();
  const onSubmit= async (data)=>{
    try{
      let response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset", data)
      toast.success("welcome")
      navigate('/login');
      // console.log(response)
    }catch(error){
      toast.error(error.response.data.message)
    }
    
    // console.log(data);
  }
  return (
    <div className="auth-container bg-info">
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3">
          <div>
            <div className="logo-container ">
              <img className="w-75" src={logo} alt="" />
              <div className="title my-4">
                <h3 className="fw-bold h5">Reset Password?</h3>
                <span className="text-body-tertiary">Please Enter Your Otp or Check Your Inbox</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.email && <span className="text-danger ">{errors.email.message}</span>}
                <div className="input-group mb-3 my-5">
              
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope fs-5" aria-hidden='true'></i>
                  </span>

                  <input type="email"
                  className="form-control" 
                  placeholder="E-mail" aria-label="Email" aria-describedby="basic-addon1"
                  {...register('email', {required:'field is required',
                    pattern:{
                      value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                      message: "Invalid Email"
                    }
                    })
                  }/>
                </div>


                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                <div className="input-group mb-3">
                  
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-lock fs-5" aria-hidden='true'></i>
                  </span>

                  <input type="password"
                  className="form-control" 
                  placeholder="New Password" aria-label="password" aria-describedby="basic-addon1"
                  {...register('password', {required:'field is required'})
                    }/>

                </div>
                
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                <div className="input-group mb-3">
                  
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-lock fs-5" aria-hidden='true'></i>
                  </span>

                  <input type="password"
                  className="form-control" 
                  placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1"
                  {...register('confirmPassword', {required:'field is required'})
                    }/>
                  
                </div>
                
                <div className="input-group mb-3">
                  
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-lock fs-5" aria-hidden='true'></i>
                  </span>
                  {/* seed */}
                  <input type="text"
                  className="form-control" 
                  placeholder="Otp" aria-label="seed" aria-describedby="basic-addon1"
                  {...register('seed', {required:'field is required'})
                    }
                  />
                </div>
                
                <button className="bg-success w-100 py-2 my-5 text-white rounded-3 border-0">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}