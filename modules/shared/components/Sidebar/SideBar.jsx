import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
 
import HomeLogo from "../../../../assets/images/Home-logo.png";
export default function SideBar() {
  return (
    <>
      <div className='sidebar-container'>
        <Sidebar>
          <Menu>
            
            <MenuItem component={<Link to='/dashboard'/>}> <img className='w-75' src={HomeLogo}/> </MenuItem>
            <MenuItem component={<Link to='/dashboard/users'/>}> Users </MenuItem>
            <MenuItem component={<Link to='/dashboard/recipes'/>}> Recipes </MenuItem>
            <MenuItem component={<Link to='/dashboard/categories'/>}> Categories </MenuItem>
            <MenuItem > Change Password </MenuItem>
            <MenuItem component={<Link to='/login'/>}>logout</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  
  )
}