import {React, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import sora from "../../../../assets/images/sora.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { axiosInstance, CATEGORY_URLS } from "../../../../services/api/urls";
import  NoData  from "../../../shared/components/NoData/NoData";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddConfirmation  from "../../../shared/components/AddConfirmation/AddConfirmation";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList]=useState([]);
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setSelectedId(id)
    setShow(true)
  };

  
  const [showAdd, setShowAdd]=useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id) =>{ 
    setShowAdd(true)
  };

// "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1"
  let getCategories= async()=>{
    try{
      let response=await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES,{params:{
        pageSize:10, pageNumber:1
      }})
      // console.log(response.data.data)
      setCategoriesList(response.data.data)
      
    }
    catch(error){
      console.log(error)
    }
    
  };


  let onSubmit= async(data)=>{
    try{
      let response=await axiosInstance.post(CATEGORY_URLS.POST_CATEGORY, data)
      toast.success("Category added")
      console.log(response.data.data)
      getCategories()
    }
    catch(error){
      toast.error("failed to add category")
      console.log(error)
    }
    handleCloseAdd()
  };

  // axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`
  let deleteCategory=()=>{
    try{
      let response=axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId));
      //console.log(response);
      getCategories()
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  useEffect(()=>{
    getCategories()
  },[])
  return (
    <div className="w-100">
      <Header title={"Categories Item"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"}/>
      
      
    <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteCategory}>Category</DeleteConfirmation>  
    
      
    
    <AddConfirmation showAdd={showAdd} handleCloseAdd={handleCloseAdd} onSubmit={onSubmit}/>

      <div className="d-flex justify-content-between mx-1 p-4">
        <h3>Category Table Details</h3>
        <button className="btn btn-success" onClick={handleShowAdd}>Add new Category</button>
      </div>
      <div className="p-4">
      <ToastContainer/>
      {categoriesList.length > 0?
        <table className="table table-white table-striped">
          <thead className="table-header table-secondary table-borderless">
            <tr >
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map(category=>
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
                <i className="bi bi-trash-fill text-danger mx-3 fs-5" 
                onClick={()=>handleShow(category.id)} aria-hidden="true"></i>
                <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
              </td>
            </tr>

            )}
            
          </tbody>
        </table>:<NoData/>}
      </div>
      
    </div>
  );
}