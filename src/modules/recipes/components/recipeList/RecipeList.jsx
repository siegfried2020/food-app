import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import {React, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import sora from "../../../../assets/images/sora.png";

import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { axiosInstance, CATEGORY_URLS, imgbaseURL, RECIPE_URLS, TAG_URLS } from "../../../../services/api/urls";
import NoData from "../../../shared/components/NoData/NoData";
import { Link } from "react-router-dom";

export default function RecipeList() {
  
  const [tags, setTags]=useState([]);
  const [categories, setCategories]=useState([]);
  const [recipesList, setRecipesList]=useState([]);
  const [arrayOfPages, setArrayOfPages]=useState([]);
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);
  const [nameValue, setNameValue]=useState('');
  const [tagValue, setTagValue]=useState('');
  const [catValue, setCatValue]=useState('');

  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setSelectedId(id)
    setShow(true)
  };

  let getRecipes= async(pageNo, pageSize, name, tag, category)=>{
    try{
      let response=await axiosInstance.get(RECIPE_URLS.GET_RECIPES,
        {params:{pageSize:pageSize, pageNumber:pageNo, name:name, tagId:tag, categoryId:category}}
      )
      console.log(response.data.data);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      setRecipesList(response.data.data);

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
  const getTags= async()=>{
    try{
      let response=await axiosInstance.get(TAG_URLS.GET_TAGS);
      console.log(response);
      setTags(response?.data);
      

    }catch(error){
      console.log(error);
    }
  };

  const getCategories= async()=>{
    try{
      let response=await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES)
      // console.log(response.data.data)
      setCategories(response.data.data)
      
    }
    catch(error){
      console.log(error)
    }
    
  };
  
  const getNameValue=(input)=>{
    //console.log(input.target.value);
    setNameValue(input.target.value);
    getRecipes(1, 3, input.target.value, tagValue, catValue);
  }
  
  const getTagValue=(input)=>{
    //alert("tag changed");
    //console.log(input.target.value);
    setTagValue(input.target.value);
    getRecipes(1, 3, nameValue, input.target.value, catValue);
  }
  
  const getCatValue=(input)=>{
    // alert("catgeory changed");
    // console.log(input.target.value);
    setCatValue(input.target.value);
    getRecipes(1, 3, nameValue, tagValue, input.target.value);
  }

  useEffect(()=>{
   
    getCategories();
    getTags();
    getRecipes(1, 10);
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
        <Link to="new-recipe" className="btn btn-success">Add new Recipe</Link>
        </div>
      </div>
      <div></div>
      <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteRecipe}>Recipe</DeleteConfirmation>  

      
      <div className="p-4">
        <div className="row">
          <div className="col-md-6">
            <input type="text"
            onChange={getNameValue} 
            placeholder="Search here..." 
            className="form-control"/>
          </div>
          
          <div className="col-md-3">
            <select onChange={getTagValue}  className="form-control">
              <option value="">Tags</option>
              {tags.map(item=>{
              return <option key={item.id} value={item.id}>
                {item.name}</option>
              })}
            </select>
          </div>
          
          <div className="col-md-3">
            <select onChange={getCatValue} className="form-control">
              <option value="">Categories</option>
              {categories.map(item=>{
              return <option key={item.id} value={item.id}>
                {item.name}</option>
              })}
            </select>
          </div>
          
        </div>
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
                <td className="w-25">{recipe.imagePath ?
                  <img className="w-25" src={`${imgbaseURL}/${recipe.imagePath}`} alt="" />
                  :<img className="w-25" src={sora} alt="" />}
                </td>
                <td>{recipe.price}</td>
                <td>{recipe.description}</td>
                <td>{recipe.tag.id}</td>
                <td>{recipe.category?.[0]?.name}</td>
                
                <td>
                  <i className="bi bi-trash-fill text-danger mx-3 fs-5" 
                  onClick={()=>handleShow(recipe.id)} aria-hidden="true"></i>
                  <Link to={`${recipe?.id}`}>
                  <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
                  </Link>
                </td>
              </tr>

              )}
              
            </tbody>
          </table> : <NoData/>}
        <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {arrayOfPages.map((pageNo)=>(
            
            <li className="page-item" key={pageNo} 
            onClick={()=>getRecipes(pageNo, 3)}>
              <a className="page-link" href="#">
                {pageNo}
              </a>
            </li>))
          }
          
          
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
        </nav>
      </div>
      
    </div>
  );
}