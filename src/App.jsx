import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Home from "./modules/Home.jsx";
import UsersList from "./modules/users/components/usersList/UsersList.jsx";
import RecipeList  from "./modules/recipes/components/recipeList/RecipeList.jsx";
import CategoriesList from "./modules/categories/components/categoriesList/CategoriesList.jsx"
import Login from "./modules/authentication/Login/Login.jsx";
import ChangePass from "./modules/authentication/ChangePass/ChangePass.jsx";
import Registration from "./modules/authentication/Registration/Registration.jsx";
import ForgetPass from "./modules/authentication/ForgetPass/ForgetPass.jsx";
import ResetPass from "./modules/authentication/ResetPass/ResetPass.jsx";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout.jsx";
import NotFound from "./modules/shared/components/NotFound/NotFound.jsx";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout.jsx";
import Dashboard from "./modules/dashboard/components/Dashboard/Dashboard.jsx";
import RecipeData from "./modules/recipes/components/recipeData/RecipeData.jsx";
import CategoryData from "./modules/categories/components/CategoryData/CategoryData.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/components/PrtectedRoute/ProtectedRoute.jsx";
import RecipeForm from "./modules/recipes/components/RecipeForm/RecipeForm.jsx";
import { VerifyAccount } from "./modules/authentication/VerifyAccount/VerifyAccount.jsx";
import Favourites from "./modules/Favorites/component/Favourites.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const  LoginData  = useContext(AuthContext);

  

  const routes= createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<Login />},
        {path:'login', element:<Login />},
        {path:'changePassword', element:<ChangePass/>},
        {path:'register', element:<Registration/>},
        {path:'verify', element:<VerifyAccount/>},
        {path:'forget-password', element:<ForgetPass/>},
        {path:'reset-password', element:<ResetPass/>},
      ]
    },
    {
      path:'dashboard',
      element:(
      <ProtectedRoute >
        <MasterLayout />
      </ProtectedRoute>),
      errorElement:<NotFound/>,
      children:[
        {index:true, element:<Dashboard />},
        {path:'recipes', element:<RecipeList />},
        {path:'recipes/:recipeId', element:<RecipeForm/>},
        {path:'recipe-data', element:<RecipeData />},
        {path:'favourites', element:<Favourites />},
        {path:'categories', element:<CategoriesList />},
        {path:'category-data', element:<CategoryData/>},
        {path:'users', element:<UsersList/>},
        
      ]
    }])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={routes}></RouterProvider>  
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home/>}></Route>
    //     <Route path="/users" element={<UsersList/>}>Users</Route>
    //     <Route path="/recipes" element={<RecipeList/>}>Recipes</Route>
    //     <Route path="/category" element={<CategoriesList/>}>Category</Route>
    //     <Route path="/login" element={<Login/>}>Login</Route>
    //     <Route path="/changePassword" element={<ChangePass/>}>ChangePass</Route>
    //     <Route path="/ForgetPassword" element={<ForgetPass/>}>ForgetPass</Route>
    //     <Route path="/ResetPassword" element={<ResetPass/>}>ResetPass</Route>
    //     <Route path="/Registration" element={<Registration/>}>Registration</Route>
    //   </Routes>
    // </BrowserRouter>    
  )
}

export default App
