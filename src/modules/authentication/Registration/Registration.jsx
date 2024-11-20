import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../shared/components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import { EMAIL_VALIDATION, PasswordValidation } from "../../../services/api/validations";
import { axiosInstance, USERS_URLS } from "../../../services/api/urls";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Registration() {
  let navigate=useNavigate()
  const [isPasswordVisible, setIsPasswordVisible]=React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible]=React.useState(false); 
  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  let {register, watch, trigger, 
    formState:{isSubmitting, errors}, 
  handleSubmit}=useForm({mode:"onChange"});

  const password=watch("password");
  const confirmPassword=watch("confirmPassword");
  React.useEffect(()=>{
    if(confirmPassword){
      trigger("confirm Password")
    }
  }, [password, confirmPassword, trigger])
  
  const onSubmit= async (data)=>{
    const formData = new FormData();    
    // formData.append('userName', data?.userName);
    // formData.append('country', data?.country);
    // formData.append('password', data?.price);
    // formData.append('email', data?.tagId);
    // formData.append('PhoneNumber', data?.PhoneNumber);
    // formData.append('confirmPassword', data?.confirmPassword);
    // formData.append('profileImage', data?.profileImage[0]);
    
    for(const key in data){
      if(key !== "profileImage"){
        formData.append(key, data?.[key]);
      }else{
        formData.append('profileImage', data?.[key]?.[0])
      }
    }
    try{
      let response=await axiosInstance.post(USERS_URLS.Register, formData);
      toast.success("registration sucssess");
      navigate('/verify', {state: data.email});
      // console.log(response)
    }catch(error){
      toast.error("registration failed");
      console.log(error.response.data.message)
    }
    
    // console.log(data);
  }
  return (
  <div>
    <ToastContainer/>
    <div className="title my-4">
      <h3 className="fw-bold h5">Register</h3>
      <span className="text-body-tertiary">welcome back! Please enter your details</span>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col">
          
          {/* User Name */}
          {errors.userName && <span className="text-danger ">{errors.userName.message}</span>}
          <div className="input-group mb-3 my-2">
            
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-person fs-5" aria-hidden='true'></i>
            </span>

            <input type="text" 
            className="form-control" 
            placeholder="Enter your UserName" aria-label="Username" aria-describedby="basic-addon1"
            {...register('userName', {required:'User Name is required'})
            }/>
          </div>

          {/* country */}
          {errors.country && <span className="text-danger ">{errors.country.message}</span>}
          <div className="input-group mb-3 my-2">
            
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-key fs-5" aria-hidden='true'></i>
            </span>

            <input type="text" 
            className="form-control" 
            placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"
            {...register('country', {required:'Country name is required'})
            }/>
          </div>
          
          {/* password */}
          {errors.password && <span className="text-danger ">{errors.password.message}</span>}
          <div className="input-group mb-3 my-2">
            
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-lock fs-5" aria-hidden='true'></i>
            </span>

            <input type={isPasswordVisible ? "text" : "password"}
            className="form-control" 
            placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
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

        </div>

        <div className="col">

          {/* email */}
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

          {/* PhoneNumber*/}
          {errors.phoneNumber && <span className="text-danger ">{errors.phoneNumber.message}</span>}
          <div className="input-group mb-3 my-2">
            
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-phone fs-5" aria-hidden='true'></i>
            </span>

            <input type="number"
            className="form-control" 
            placeholder="PhoneNumber" aria-label="phonNumber" aria-describedby="basic-addon1"
            {...register('phoneNumber', 
              {required:'phone Number is required,', min:0})
            }/>
          </div>
          
          {/* confirmPassword */}
          {errors.confirmPassword && <span className="text-danger ">{errors.confirmPassword.message}</span>}
          <div className="input-group mb-3 my-2">
            
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-lock fs-5" aria-hidden='true'></i>
            </span>

            <input type={isConfirmPasswordVisible ? "text" : "password"} 
            className="form-control" 
            placeholder="Confirm-password" aria-label="confirm-password" aria-describedby="basic-addon1"
            {...register('confirmPassword',{ required:'password is required',
              } )
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
              <i className={` bi ${isConfirmPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
            </button>
          </div>

        </div>
                
      </div>
      <div className="upload-img">
        <input type="file" onChange={handleChange} 
        {...register('profileImage')}/>
      </div>
      <div className="links d-flex justify-content-end">
          
          <Link to='/login' className="text-success text-decoration-none">Login Now?</Link>
      </div>
      <button disabled={isSubmitting} className="btn btn-success w-100 py-2 my-2 text-white rounded-3 border-0">
        {isSubmitting ? "Registering": "Register"}
      </button>

    </form>
    
  </div>);
}