import React from "react";
import {useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {useForm} from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { axiosInstance, USERS_URLS } from "../../../services/api/urls";
import { EMAIL_VALIDATION } from "../../../services/api/validations";

export default function ForgetPass() {
  let navigate=useNavigate();
  let {register, formState:{isSubmitting, errors}, handleSubmit}=useForm();
  const onSubmit=async (data)=>{
    try{
      let response=await axiosInstance.post(USERS_URLS.RESET_REQUEST, data)
      toast.success(response?.data?.message || "OTP sent to your email")
      navigate('/reset-password', {state: data.email});
      // console.log(response)

    }catch(error){
      toast.error(errors.response.data.message)
    }
    // console.log(data);
  }
  
  return (<>
  
            <div className="title my-4">
                <h3 className="fw-bold h5">Forgot your Password?</h3>
                <span className="text-body-tertiary">No worries! Please enter your email and 
                  we will send a password reset link</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                {errors.email && <span className="text-danger ">{errors.email.message}</span>}
                <div className="input-group mb-3 my-2">
                  
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope fs-5" aria-hidden='true'></i>
                  </span>

                  <input type="email" 
                  className="form-control" 
                  placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"
                  {...register('email', EMAIL_VALIDATION)
                  }/>
                </div>

                
                <button disabled={isSubmitting} className="btn btn-success w-100 py-2 my-2 text-white rounded-3 border-0">
                  {isSubmitting ? "Submitting": "Submit"}
                </button>

            </form>
          
  </>);
}