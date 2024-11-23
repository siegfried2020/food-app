import { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { axiosInstance, imgbaseURL, USERS_URLS } from "../../../../services/api/urls";
import NoData from "../../../shared/components/NoData/NoData";
import sora from "../../../../assets/images/sora.png";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
export default function UsersList() {
  const [usersList, setUsersList]=useState([]);
  const [arrayOfPages, setArrayOfPages]=useState([]);
  const [selectedId, setSelectedId]=useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setSelectedId(id)
    setShow(true)
  };

  let getUsers= async(pageNo, pageSize)=>{
    try{
      let response=await axiosInstance.get(USERS_URLS.GET_USERS_LIST,
        {params:{pageSize:pageSize, pageNumber:pageNo}}
      );
      console.log(response.data.data);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
      setUsersList(response.data.data);
    }catch(error){
      console.log(error)
    }
  }

  let deleteUser=()=>{
    try{
      let response=axiosInstance.delete(USERS_URLS.DELETE_USER(selectedId));
      // console.log(response);
      getRecipes()
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  useEffect(()=>{
    getUsers(3,10);
  },[])

  return (
    <>
      <Header title={`Users list`} description=
      {'You can now add your items that any user can order it from the Application and you can edit'}/>
      
      <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteUser}>User</DeleteConfirmation>  

      <div className="p-4">

        {usersList.length > 0 ?
          <table className="table table-white table-striped">
            <thead className="table-header table-secondary table-borderless">
              <tr >
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {usersList.map(user=>
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td className="w-25">{user.imagePath ?
                  <img className="w-25" src={`${imgbaseURL}/${user.imagePath}`} alt="" />
                  :<img className="w-25" src={sora} alt="" />}
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                
                <td>
                  <i className="bi bi-trash-fill text-danger mx-3 fs-5" 
                  onClick={()=>handleShow(user.id)} 
                  aria-hidden="true">

                  </i>
                  
                  <i className="bi bi-eye-fill  fs-5" aria-hidden="true"></i>
                  
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
    </>
  );
}