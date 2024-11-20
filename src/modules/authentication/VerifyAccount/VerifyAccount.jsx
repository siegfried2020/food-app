import React from "react";
import {useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, USERS_URLS } from "../../../services/api/urls";
import { EMAIL_VALIDATION } from "../../../services/api/validations";

export function VerifyAccount() {
  
  let navigate=useNavigate()
  let {register, formState:{isSubmitting, errors}, 
  handleSubmit}=useForm({defaultValues:{email:location.state}, mode:"onChange"});

  const onSubmit= async (data)=>{
    try{
      let response=await axiosInstance.put(USERS_URLS.VERIFY, data);
      localStorage.setItem("token", response.data.token);
      
      toast.success("welcome")
      navigate('/login');
      // console.log(response)
    }catch(error){
      toast.error("verify failed");
      console.log(error);
    }
    
    // console.log(data);
  }
  return (
    // {required:'field is required',
    //   pattern:{
    //     value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
    //     message: "Invalid Email"
    //   }
    // }
    <>
        
      <ToastContainer/>
      <div className="title my-4">
        <h3 className="fw-bold h5">Verify account</h3>
        <span className="text-body-tertiary">Verify your account</span>
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
            {...register('email', EMAIL_VALIDATION)
              }
            />
        </div>
                
        {errors.password && <span className="text-danger">{errors.password.message}</span>}
        <div className="input-group mb-3">
            
          <span className="input-group-text" id="basic-addon1">
            <i className="bi bi-key fs-5" aria-hidden='true'></i>
          </span>

          <input type="text" 
          className="form-control" 
          placeholder="Enter your Code" 
          aria-label="Code" 
          aria-describedby="basic-addon1"
          {...register('code', {required:'code is required'})}/>
        </div>

        
        <button className="btn btn-success w-100 py-2 my-4 text-white rounded-3 border-0">
          {isSubmitting ? "Verifying": "Verify"}</button>
      </form>
              
    </>
  );
}