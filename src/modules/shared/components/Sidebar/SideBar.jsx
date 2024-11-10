import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import HomeLogo from "../../../../assets/images/Home-logo.png";
import { useState } from 'react';


export default function SideBar() {
  const [isCollapse, setIsCollapse]=useState(true)
  let toggleCollpase=()=>{
    setIsCollapse(!isCollapse)
  }
  return (
    <>
      <div className='sidebar-container'>
        <Sidebar collapsed={isCollapse}>
          <Menu>
            
            <MenuItem onClick={toggleCollpase}
             icon={<img className='Home-logo' src={HomeLogo}/>} 
             className='my-5 logo-menu-item'></MenuItem>
            
            <MenuItem component={<Link to='/dashboard'/>}>
            <i className="bi bi-house-door-fill fs-5 mx-2"></i>
             Home </MenuItem>
            
            <MenuItem icon={<i className="bi bi-people-fill fs-5 mx-2"></i>} component={<Link to='/dashboard/users'/>}>
             Users </MenuItem>
            
            <MenuItem icon={<i className="bi bi-stack fs-5 mx-2"></i>} component={<Link to='/dashboard/recipes'/>}> 
              Recipes 
            </MenuItem>
            
            <MenuItem icon={<i className="bi bi-table fs-5 mx-2"></i>} component={<Link to='/dashboard/categories'/>}> 
              
              Categories 
            </MenuItem>
           
            <MenuItem icon={<i className="bi bi-unlock-fill fs-5 mx-2"></i> } >
              
              Change Password 
            </MenuItem>
           
            <MenuItem icon={<i className="bi bi-door-open-fill fs-5 mx-2"></i>} component={<Link to='/login'/>}>
              
              logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  
  )
}