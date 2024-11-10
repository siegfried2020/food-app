import {React, useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import sora from "../../../../assets/images/sora.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList]=useState([]);
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () =>{ 
    // alert(selectedId)
    setShow(true)
  };

  let getCategories= async()=>{
    try{
      let response=await axios.get("https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      )
      // console.log(response.data.data)
      setCategoriesList(response.data.data)

    }
    catch(error){
      console.log(error)
    }
  };

  let deleteCategory=()=>{
    try{
      let response=axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
        {
          headers:{Authorization:localStorage.getItem("token")}
        }
      );
      // console.log(response);
      getCategories()
    }catch(error){
      console.log(error)
    }
    alert(selectedId)
    handleClose();
  }

  useEffect(()=>{
    getCategories()
  },[])
  return (
    <>
      <Header title={"Categories Item"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"}/>
      
      
    <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteCategory}>Category</DeleteConfirmation>  
    
      
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={sora} alt="" />
            <h5>Delete This Category?</h5>
            <p className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <button className="btn btn-white border-danger  text-danger" onClick={deleteCategory}>
            Delete This Category
          </button>
        </Modal.Footer>
      </Modal> */}
      
      <div className="d-flex justify-content-between mx-1 p-4">
        <h3>Category Table Details</h3>
        <button className="btn btn-success">Add new Category</button>
      </div>
      <div className="p-4">

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
                onClick={()=>handleShow(setSelectedId(category.id))} aria-hidden="true"></i>
                <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
              </td>
            </tr>

            )}
            
          </tbody>
        </table>
      </div>
      
    </>
  );
}