import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login({saveLoginData}) {

  let navigate=useNavigate()
  let {register, formState:{errors}, handleSubmit}=useForm();
  const onSubmit= async (data)=>{
    try{
      let response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login", data);
      localStorage.setItem("token", response.data.token);
      saveLoginData()
      toast.success("welcome")
      navigate('/dashboard');
      // console.log(response)
    }catch(error){
      toast.error(error.response.data.message)
    }
    
    // console.log(data);
  }
  return (
    <>
    
      <ToastContainer/>
      <div className="auth-container bg-info">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3">
              <div>
                <div className="logo-container ">
                  <img className="w-75" src={logo} alt="" />
                  <div className="title my-4">
                    <h3 className="fw-bold h5">Login</h3>
                    <span className="text-body-tertiary">Welcome back! Please enter your details</span>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    {errors.email && <span className="text-danger ">{errors.email.message}</span>}
                    <div className="input-group mb-3">
                      
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-envelope fs-5" aria-hidden='true'></i>
                      </span>

                      <input type="email" 
                      className="form-control" 
                      placeholder="Enter your E-mail" aria-label="Email" 
                      aria-describedby="basic-addon1"
                      {...register('email', {required:'field is required',
                        pattern:{
                          value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                          message: "Invalid Email"
                        }
                      })
                        }
                      />
                    </div>
                    
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    <div className="input-group mb-3">
                      
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-key fs-5" aria-hidden='true'></i>
                      </span>

                      <input type="password" 
                      className="form-control" 
                      placeholder="Password" 
                      aria-label="password" 
                      aria-describedby="basic-addon1"
                      {...register('password', {required:'field is required',
                    
                      })
                        }/>
                    </div>

                    <div className="links d-flex justify-content-between">
                      <Link to='/register' className="text-muted text-decoration-none">Regisiter Now?</Link>
                      <Link to='/forget-pass' className="text-success text-decoration-none">Forgot Password</Link>
                    </div>
                    <button className="bg-success w-100 py-2 my-4 text-white rounded-3 border-0">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}