import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { axiosInstance, CATEGORY_URLS } from "../../../../services/api/urls";

const getCategories= async()=>{

  let response=await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES,);
  return response;

};


const useCategories=()=>{
  const {data, error, isError, isLoading, trigger}=useFetch(getCategories);
  
  //const [arrayOfPages, setArrayOfPages]=useState([]);
  //setArrayOfPages(Array().fill().map((_,i)=>i+1));
  
  //console.log(query);
  
  return {categories: data?.data, 
    categoriesError: error, 
    isCategoriesError: isError,
    isLoadingCategories: isLoading,
    triggerCategories: trigger
  }
};

export default useCategories;