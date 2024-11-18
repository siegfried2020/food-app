import React from "react";
import {useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {useForm} from "react-hook-form";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { axiosInstance, USERS_URLS } from "../../../services/api/urls";
import { EMAIL_VALIDATION, PasswordValidation } from "../../../services/api/validations";

export default function ResetPass() {
  const navigate=useNavigate();
  const location=useLocation();
  const [isPasswordVisible, setIsPasswordVisible]=React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible]=React.useState(false);
  let {register, watch, trigger, formState:{isSubmitting, errors}, 
  handleSubmit}=useForm({defaultValues:{email:location.state}, mode:"onChange"});

  const password=watch("password");
  const confirmPassword=watch("confirmPassword");
  React.useEffect(()=>{
    if(confirmPassword){
      trigger("confirm Password")
    }
  }, [password, confirmPassword, trigger])
  const onSubmit= async (data)=>{
    try{
      let response=await axiosInstance.post(USERS_URLS.RESET, data)
      toast.success("welcome")
      navigate('/login');
      // console.log(response)
    }catch(error){
      toast.error(error.response.data.message)
    }
    
    // console.log(data);
  }
  return (<>
      
    <div className="title my-4">
      <h3 className="fw-bold h5">Reset Password?</h3>
      <span className="text-body-tertiary">Please Enter Your Otp or Check Your Inbox</span>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.email && <span className="text-danger ">{errors.email.message}</span>}
      
      {/* Email */}
      <div className="input-group mb-3 my-3">
    
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-envelope fs-5" aria-hidden='true'></i>
        </span>

        <input
        disabled={true} 
        type="email"
        className="form-control" 
        placeholder="E-mail" 
        aria-label="Email" 
        aria-describedby="basic-addon1"
        {...register('email')
        }/>
      </div>

      {/* OTP */}
      <div className="input-group mb-3">
        
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>
        {/* seed */}
        <input type="text"
        className="form-control" 
        placeholder="Otp" aria-label="seed" aria-describedby="basic-addon1"
        {...register('seed', {required:'seed is required'})
          }
        />
      </div>


      {/* Password */}

      {errors.password && <span className="text-danger">{errors.password.message}</span>}
      <div className="input-group mb-3">
        
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>

        <input 
        type={isPasswordVisible ? "text" : "password"}
        className="form-control" 
        placeholder="New Password" aria-label="password" aria-describedby="basic-addon1"
        {...register('password', PasswordValidation('password'))
          }/>
        
        <button className="input-group-text"
        type="button"
        onClick={()=>{setIsPasswordVisible((prev) => !prev)}}
        onMouseDown={(e)=>
          {e.preventDefault();}
        }
        onMouseUp={(e)=>
        {e.preventDefault();}
        }
        id="basic-addon1">
          <i className={` bi ${isPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
        </button>

      </div>

      {/*confirm password */}

      {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
      <div className="input-group mb-3">
                  
        <span className="input-group-text" id="basic-addon1">
          <i className="bi bi-lock fs-5" aria-hidden='true'></i>
        </span>

        <input 
        type={isConfirmPasswordVisible ? "text" : "password"} className="form-control" 
        placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1"
        {...register('confirmPassword',
          { 
            validate:(confirmPassword)=>{
              return confirmPassword ===watch("password") ?"":"passwords don't match"
            }}, PasswordValidation('password'))
          }/>
        
        <button
          type="button"
          className="input-group-text"
          onClick={()=>{setIsConfirmPasswordVisible((prev) => !prev)}}
          onMouseDown={(e)=>
          {e.preventDefault();}
          }
          onMouseUp={(e)=>
          {e.preventDefault();}
          }
          id="basic-addon1">
          {/* <span className="sr-only">{isConfirmPasswordVisible ? "hide password": "Show Password"}</span> */}
          <i className={` bi ${isConfirmPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
        </button>
                  
      </div>
                
      
                
      <button disabled={isSubmitting} className="btn btn-success w-100 py-2 my-2 text-white rounded-3 border-0">
        {isSubmitting ? "Submitting": "Submit"}
      </button>
    </form>
          
        
  </>);
}