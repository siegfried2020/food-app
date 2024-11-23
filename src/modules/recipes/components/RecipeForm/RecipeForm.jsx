import {  Link, useNavigate, useParams } from "react-router-dom";
import {useForm} from "react-hook-form";
import styles from '../RecipeForm/RecipeForm.module.css';
import { ToastContainer, toast } from "react-toastify";
import { axiosInstance, CATEGORY_URLS, RECIPE_URLS, TAG_URLS } from "../../../../services/api/urls";
import React, { useState } from "react";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";

export default function RecipeForm() {
  const params =useParams();
  const [tags, setTags]=React.useState([]);
  const [categories, setCategories]=React.useState([]);
  const navigate=useNavigate();
  
  let { register, setValue, getValues,
    formState:{isSubmitting, errors}, 
    handleSubmit}=useForm({mode:'onChange'})
    
    useBeforeUnload(()=>{
      localStorage.setItem("recipeData", JSON.stringify(getValues))
    })
  
  const [file, setFile] = useState();
  function handleChange(e) {
    
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    
}
  
  const onSubmitHandler=async(data)=>{
    //console.log(data);
    const formData = new FormData();    
    // formData.append('name', data?.name);
    // formData.append('description', data?.description);
    // formData.append('price', data?.price);
    // formData.append('tagId', data?.tagId);
    // formData.append('recipeImage', data?.recipeImage[0]);
    // formData.append('categoriesIds', data?.categoriesIds);
    for(const key in data){
      if(key !== "recipeImage"){
        formData.append(key, data?.[key]);
      }else{
        formData.append('recipeImage', data?.[key]?.[0])
      }
    }

    try{
      const response=await axiosInstance[isNewRecipe ? "post":"put"](
        (isNewRecipe?RECIPE_URLS.CREATE_RECIPE:RECIPE_URLS.UPDATE_RECIPE(recipeId)), formData);
      console.log(response);
      toast.success("recipe added");
      navigate("../recipes")
    }catch(error){
      toast.error("failed to add recipe");
      console.log(error)
    }

  }
  
  const recipeId=params.recipeId;
  const isNewRecipe=recipeId ==="new-recipe";

  React.useEffect(()=>{
    let getTags= async()=>{
      try{
        let response=await axiosInstance.get(TAG_URLS.GET_TAGS);
        console.log(response);
        setTags(response?.data);
        
  
      }catch(error){
        console.log(error);
      }
    };
    let getCategories= async()=>{
      try{
        let response=await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES)
        // console.log(response.data.data)
        setCategories(response.data.data)
        
      }
      catch(error){
        console.log(error)
      }
      
    };
    
    (async ()=>{
      
      await getTags();
      await getCategories();
      
      if(!isNewRecipe){
        const getRecipeById= async()=>{
          const response= await axiosInstance.get(RECIPE_URLS.GET_RECIPE_BY_ID(recipeId))
          console.log(response);
          const recipe= response?.data;
          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("price", recipe?.price);
          setValue("categoriesIds", recipe?.category?.[0]?.id);
          setValue("tagId", recipe?.tag?.id);
          setValue("name", recipe?.name);
          
        }
        getRecipeById()
      }
    })();

  },[recipeId, setValue])
  console.log(tags);
  // console.log(params);
  // console.log(styles);
  React.useEffect(()=>{
    const beforeUnloadHandler=(e)=>{
      e.preventDefault
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return()=>{
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
  },[])
  return(
    <main>
      <ToastContainer/>
      <header className={styles["header-wrapper"]}>
        <div className={styles["content-wrapper"]}>
          <h3>Fill the <span>Recipes</span>!</h3>
          <p>you can now fill the meals easily using the table and form, 
            click here and sill it with the table !</p>
        </div>
        <Link to="../recipes" className={styles["btn-primary"]}>All Recipes {" "}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z" fill="white"/>
          </svg>
        </Link>
      </header>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles["form-wrapper"]}>
        <div className={styles["input-wrapper"]}>
          {errors?.name?.message &&<div className="text-danger">{errors?.name?.message}</div>}
          <input placeholder="Recipe Name" 
          className="form-control"
          {...register("name", {required:"This field is required"})}/>
        </div>
        
        <div className={styles["input-wrapper"]}>
          {errors.tagId?.message &&<div className="text-danger">{errors?.tagId?.message}</div>}
          <select className="form-control" 
          {...register("tagId", {required:"This field is required"})}>
            <option value="">Tag</option>
            {tags.map(item=>{
              return <option key={item.id} value={item.id}>
                {item.name}</option>
              })}
          </select>
        </div>

        <div className={styles["input-wrapper"]}>
          {errors.price?.message &&<div className="text-danger">{errors?.price?.message}</div>}
          <input type="number" placeholder="Price" className="form-control"
          {...register("price", {required:"phone number is required", min:0})}/>
        </div>

        <div className={styles["input-wrapper"]}>
          {errors.categoriesIds?.message &&<div className="text-danger">{errors?.categoriesIds?.message}</div>}
          <select {...register("categoriesIds", {required:"This field is required"})}
           className="form-control">
            <option>Category</option>
            {categories.map(item=>{
              return <option key={item.id} value={item.id}>
                {item.name}</option>
              })}
          </select>
        </div>

        <div className={styles["input-wrapper"]}>
          {errors.description?.message &&<div className="text-danger">{errors?.description?.message}</div>}
          <textarea placeholder="Description" className="form-control"
          {...register("description", {required:"description is required"})}/>
        </div>

        <div className={styles["input-wrapper"]}>
          {errors.recipeImage?.message &&<div className="text-danger">{errors?.recipeImage?.message}</div>}
          <input type="file"
          className="form-control"
          onChange={handleChange} 
          {...register("recipeImage")}/>
          <img src={file} />
        </div>

        <div className={styles["actions-wrapper"]}>
          <Link to="../recipes" type="button" className={styles["btn-cancel"]}>Cancel</Link>
          <button disabled={isSubmitting} className={styles["btn-primary"]}>
            {isSubmitting? "Saving...":"Save"}</button>
          
        </div>
      </form>
    </main>
  )
}