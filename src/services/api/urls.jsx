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
  RESET_REQUEST:`/Users/Reset/Request`,
  RESET:`/Users/Reset`,
  GET_USER:(id)=> `/Users/${id}`
}

// Category

export const CATEGORY_URLS={
  GET_CATEGORIES:`/Category/`,
  POST_CATEGORY:`/Category/`,
  DELETE_CATEGORY:(id)=>`/Category/${id}`,
  UPDATE_CATEGORY:(id)=>`/Category/${id}`
}

// Recipe

export const RECIPE_URLS={
  GET_RECIPES:`/Recipe/`,
  DELETE_RECIPE:(id)=>`/Recipe/${id}`
}