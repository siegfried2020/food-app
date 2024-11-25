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
import  EditCategory from "../EditCategory/EditCategory";
import useCategories from "../hooks/useCategories";

export default function CategoriesList() {
  //const [categoriesList, setCategoriesList]=useState([]);
  const categoriesQuery= useCategories();
  
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setSelectedId(id);
    setShow(true);
  };
  
  console.log(categoriesQuery);
  // Add Category
  const [showAdd, setShowAdd]=useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () =>{ 
    setShowAdd(true);
  };

  // Edit Category
  const [showEdit, setShowEdit]=useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) =>{ 
    setSelectedId(id);
    setShowEdit(true);
  };

// "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1"
  // let getCategories= async()=>{
  //   try{
  //     let response=await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES,
  //     )
  //     // console.log(response.data.data)
  //     setCategoriesList(response.data.data)
      
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
    
  // };



  let createCategory= async(data)=>{
    try{
      let response=await axiosInstance.post(CATEGORY_URLS.POST_CATEGORY,data)
      toast.success("Category added");
      console.log(response);
      categoriesQuery.trigger();
      //getCategories()
    }
    catch(error){
      toast.error("failed to add category")
      console.log(error)
    }
    handleCloseAdd()
  };

  let updateCategory= async(data)=>{
    try{
      let response=await axiosInstance.put(CATEGORY_URLS.UPDATE_CATEGORY(selectedId),data)
      toast.success("Category edited")
      categoriesQuery.trigger();
      
      //console.log(response.data.data)
      // getCategories()
    }
    catch(error){
      toast.error(error)
      console.log(error)
    }
    handleCloseEdit()
  };

  // axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`)
  let deleteCategory=()=>{
    try{
      let response=axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId));
      categoriesQuery.trigger();
      
      //console.log(response);
      // getCategories()
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  // useEffect(()=>{
  //   categoriesQuery.categories;
  // },[])
  return (
    <div className="w-100">
      <Header title={"Categories Item"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"}/>
      
      
    <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteCategory}>Category</DeleteConfirmation>  
    
      
    
    <AddConfirmation showAdd={showAdd} handleCloseAdd={handleCloseAdd} onSubmit={createCategory}/>

    {/* <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header className="border-0"  closeButton>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <form onSubmit={handleSubmit(UpdateCategory)}>
                
              {errors.name && <span className="text-danger ">{errors.name.message}</span>}
              <div className="input-group mb-3 my-5">

                <input type="text" 
                className="form-control text-bg-secondary"
                placeholder="Category Name" aria-label="name" aria-describedby="basic-addon1"
                {...register('name',{required:'Name is required'}) }/>
             </div>
              <Modal.Footer>
               <button className="btn btn-success border-success px-5  text-white" >
                  Save
               </button>
              </Modal.Footer>

            </form>
          </div>
        </Modal.Body>
        
    </Modal> */}

    <EditCategory showEdit={showEdit} handleCloseEdit={handleCloseEdit} UpdateCategory={updateCategory}/>

      <div className="d-flex justify-content-between mx-1 p-4">
        <h3>Category Table Details</h3>
        <button className="btn btn-success" onClick={handleShowAdd}>Add new Category</button>
      </div>
      <div className="p-4">
      <ToastContainer/>
      {categoriesQuery?.categories?.data?.length > 0?
        <table className="table table-white table-striped">
          <thead className="table-header table-secondary table-borderless">
            <tr >
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesQuery?.categories?.data?.map(category=>
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
                <i className="bi bi-trash-fill text-danger mx-3 fs-5" 
                onClick={()=>handleShow(category.id)} aria-hidden="true"></i>
                
                <i className="bi bi-pencil-square text-warning fs-5"
                onClick={()=>handleShowEdit(category.id)}
                aria-hidden="true"></i>
              </td>
            </tr>

            )}
            
          </tbody>
        </table>:<NoData/>}
      </div>
      {/* <nav aria-label="Page navigation example">
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
        </nav> */}
    </div>
  );
}