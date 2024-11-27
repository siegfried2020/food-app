import axios from "axios"

export const baseURL="https://upskilling-egypt.com:3006/api/v1";
export const imgbaseURL="https://upskilling-egypt.com:3006/";


export  const axiosInstance=axios.create({baseURL, 
  headers:{Authorization:localStorage.getItem("token")} })
// User URLs
export const USERS_URLS={
  LOGIN:`/Users/Login`,
  Register:`/Users/Register`,
  CREATE:`/Users/Create`,
  DELETE_USER:(id)=>`/Users/${id}`,
  GET_USER:(id)=> `/Users/${id}`,
  VERIFY:`/Users/verify`,
  CHANGE_PASSWORD:`/Users/ChangePassword`,
  GET_CURRENT_USER:`/Users/currentUser`,
  GET_USERS_LIST:`/Users/`,
  RESET_REQUEST:`/Users/Reset/Request`,
  RESET:`/Users/Reset`
}

// Category

export const CATEGORY_URLS={
  POST_CATEGORY:`/Category/`,
  GET_CATEGORIES:`/Category/`,
  GET_CATEGORY_BY_ID:(id)=>`/Category/${id}`,
  DELETE_CATEGORY:(id)=>`/Category/${id}`,
  UPDATE_CATEGORY:(id)=>`/Category/${id}`
}
// tags

export const TAG_URLS={
  GET_TAGS:`/tag/`
}

// Recipe

export const RECIPE_URLS={
  CREATE_RECIPE:`/Recipe/`,
  GET_RECIPES:`/Recipe/`,
  GET_RECIPE_BY_ID:(id)=>`/Recipe/${id}`,
  DELETE_RECIPE:(id)=>`/Recipe/${id}`,
  UPDATE_RECIPE:(id)=>`/Recipe/${id}`
}

// User Recipe

export const USER_RECIPE={
  GET_USER_RECIPE:`/userRecipe`,
  ADD_TO_FAV:`/userRecipe`,
  DELETE_USER_RECIPE:(id)=>`/userRecipe/${id}`,
}