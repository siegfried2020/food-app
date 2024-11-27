import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {useForm} from "react-hook-form";
import { axiosInstance, USERS_URLS } from "../../../services/api/urls";

import { EMAIL_VALIDATION } from "../../../services/api/validations";
export default function ChangePass() {
  
  let navigate=useNavigate();
  const [isOldPasswordVisible, setIsOldPasswordVisible]=React.useState(false);
  const [isNewPasswordVisible, setNewIsPasswordVisible]=React.useState(false);
  const [isConfirmPasswordVisible, setConfirmIsPasswordVisible]=React.useState(false);
  let {register, formState:{errors}, handleSubmit}=useForm();
  const onSubmit= async (data)=>{
    try{
      let response=await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      
      navigate('/dashboard');
      // console.log(response)
    }catch(error){
      toast.error(error.response.data.message)
    }
    
    // console.log(data);
  }
  return (
  <div>

    <div className="title my-4">
      <h3 className="fw-bold h5">Change Your Password</h3>
      <span className="text-body-tertiary">Enter your details below</span>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>

      {errors.oldPassword && <span className="text-danger ">{errors.oldPassword.message}</span>}
      <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>

        <input type={isOldPasswordVisible ? "text" : "password"}
        className="form-control" 
        placeholder="Old Password" 
        aria-label="password" 
        aria-describedby="basic-addon1"
        {...register('oldPassword', {required:'password is required'},PasswordValidation("password"))}/>
        <button  
        className="input-group-text"
        onClick={()=>{setIsOldPasswordVisible((prev)=>!prev)}}
        type="button"
          onMouseDown={(e)=>{
            e.preventDefault();
          }}
          onMouseUp={(e)=>{
            e.preventDefault();
          }}
          >
          <i className={` bi ${isOldPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
        </button>
        
      </div>

      {/* New Password */}
              
      {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
      <div className="input-group mb-3">
          
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>

        <input type={isNewPasswordVisible ? "text" : "password"}
        className="form-control" 
        placeholder="New Password" 
        aria-label="password" 
        aria-describedby="basic-addon1"
        {...register('newPassword', {required:'password is required'}, PasswordValidation("new password"))}/>
        
        <button  
        className="input-group-text"
        onClick={()=>{setNewIsPasswordVisible((prev)=>!prev)}}
        type="button"
          onMouseDown={(e)=>{
            e.preventDefault();
          }}
          onMouseUp={(e)=>{
            e.preventDefault();
          }}
          >
          <i className={` bi ${isNewPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
        </button>
      </div>

      {/* ConfirmPassword */}
              
      {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
      <div className="input-group mb-3">
          
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>

        <input type={isConfirmPasswordVisible ? "text" : "password"}
        className="form-control" 
        placeholder="Confirm New Password" 
        aria-label="password" 
        aria-describedby="basic-addon1"
        {...register('confirmNewPassword', {required:'password is required'}, PasswordValidation("confirm password"))}/>
        
        <button  
        className="input-group-text"
        onClick={()=>{setConfirmIsPasswordVisible((prev)=>!prev)}}
        type="button"
          onMouseDown={(e)=>{
            e.preventDefault();
          }}
          onMouseUp={(e)=>{
            e.preventDefault();
          }}
          >
          <i className={` bi ${isConfirmPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
        </button>
      </div>

      <div className="links d-flex justify-content-between">
          <Link to='/dashboard' className="text-success text-decoration-none">dashboard</Link>
      </div>
      <button className="btn btn-success w-100 py-2 my-4 text-white rounded-3 border-0">Change Password</button>
    </form>
  </div>);
}