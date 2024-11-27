import React, { useEffect, useState } from "react";
import Header from "../../shared/components/Header/Header";
import { axiosInstance, imgbaseURL, USER_RECIPE } from "../../../services/api/urls";
import sora from "../../../assets/images/sora.png";
import NoData from "../../shared/components/NoData/NoData";

export default function Favourites() {
  const [favList, setFavList] =useState([]);
  
  let getFavList= async()=>{
    try{
      let response=await axiosInstance.get(USER_RECIPE.GET_USER_RECIPE)
      console.log(response);

      setFavList(response.data.data);
    }
    catch(error){
      console.log(error)
    }
  };

  let removeFromFav=async(id)=>{
    try{
      let response=await axiosInstance.delete(USER_RECIPE.DELETE_USER_RECIPE(id));
      getFavList();
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getFavList();
  },[])
  
  return (<div>
    <Header title={"Favourites"} 
      description={"You can now add your items that any user can order it from the Application and you can edit"}
    />

    <div className="container my-3">
      <div className="row p-5">
        {favList.length > 0 ?
            favList.map(favItem=>
              <div className="col-md-4 shadow-lg p-2">
                <div className="item" key={favItem.id}>
                  {favItem.recipe.imagePath ?
                    <img className="w-50" src={`${imgbaseURL}/${favItem.recipe.imagePath}`} alt="" />
                    :<img className="w-50" src={sora} alt="" />
                  }

                  <div className="caption d-flex justify-content-between p-3">

                    <div className="title">
                      <h4>{favItem.recipe.name}</h4>
                      <p>{favItem.recipe.description}</p>
                    </div>

                    <i className="bi bi-heart text-danger fa-2x fa-regular" 
                    onClick={()=>removeFromFav(favItem.id)}
                    aria-hidden="true"></i>

                  </div>
                </div>
              </div>
          )
          : <NoData/>
        }
      </div>
    </div>
    
  </div>);
}