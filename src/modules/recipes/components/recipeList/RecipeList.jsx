import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import {React, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import sora from "../../../../assets/images/sora.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { axiosInstance, imgbaseURL, RECIPE_URLS } from "../../../../services/api/urls";
import NoData from "../../../shared/components/NoData/NoData";
export default function RecipeList() {
  
  const [recipesList, setRecipesList]=useState([]);
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setSelectedId(id)
    setShow(true)
  };

  let getRecipes= async()=>{
    try{
      let response=await axiosInstance.get(RECIPE_URLS.GET_RECIPES,{params:{
        pageSize:10, pageNumber:1
      }}
      )
      console.log(response.data.data)
      setRecipesList(response.data.data)

    }
    catch(error){
      console.log(error)
    }
  };
// `https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`
  let deleteRecipe=()=>{
    try{
      let response=axiosInstance.delete(RECIPE_URLS.DELETE_RECIPE(selectedId)
      );
      // console.log(response);
      getRecipes()
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  useEffect(()=>{
    getRecipes()
  },[])

  return (
    <div>
      <Header title={"Recipes Items"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"}/>
      
      <div className="d-flex justify-content-between mx-1 p-4">
        <div>
          <h3>Recipe Table Details</h3>
          <p>You can check all the details</p>
        </div>
        <div>
        <button className="btn btn-success">Add new Recipe</button>
        </div>
      </div>
      <div></div>
      <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteRecipe}>Recipe</DeleteConfirmation>  

      
      <div className="p-4">

      {recipesList.length > 0 ?
        <table className="table table-white table-striped">
          <thead className="table-header table-secondary table-borderless">
            <tr >
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">category</th>
              <th scope="col">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {recipesList.map(recipe=>
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.imagePath ?
                <img className="w-25" src={`${imgbaseURL}/${recipe.imagePath}`} alt="" />
                :<img className="w-25" src={NoData} alt="" />}
              </td>
              <td>{recipe.price}</td>
              <td>{recipe.description}</td>
              <td>{recipe.tag.id}</td>
              <td></td>
              
              <td>
                <i className="bi bi-trash-fill text-danger mx-3 fs-5" 
                onClick={()=>handleShow(recipe.id)} aria-hidden="true"></i>
                <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
              </td>
            </tr>

            )}
            
          </tbody>
        </table> : <NoData/>}
      </div>
    </div>
  );
}