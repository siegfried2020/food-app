import React from "react";
import {useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function ForgetPass() {
// username: Mah21 email: domydodo2015@gmail.com  password: Pass@12
  let navigate=useNavigate();
  let {register, formState:{errors}, handleSubmit}=useForm();
  const onSubmit=async (data)=>{
    try{
      let response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request", data)
      toast.success("Go change your password")
      navigate('/reset-pass');
      // console.log(response)

    }catch(error){
      toast.error(errors.response.data.message)
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
                <h3 className="fw-bold h5">Forgot your Password?</h3>
                <span className="text-body-tertiary">No worries! Please enter your email and 
                  we will send a password reset link</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                
                {errors.email && <span className="text-danger ">{errors.email.message}</span>}
                <div className="input-group mb-3 my-5">
                  
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope fs-5" aria-hidden='true'></i>
                  </span>

                  <input type="email" 
                  className="form-control" 
                  placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"
                  {...register('email', {required:'field is required',
                    pattern:{
                      value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                      message: "Invalid Email"
                    }
                    })
                  }/>
                </div>

                
                  <button className="bg-success w-100 py-2 my-5 text-white rounded-3 border-0">
                    Submit    
                  </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}