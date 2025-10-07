import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.svg'
import BellIcon from '../../assets/bell_icon.svg'
import ProfileImg from '../../assets/profile_img.png'
import caretIcon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={logo} alt="" />
            <ul>
                <li>Home</li>
                <li>Tv Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse by Languages</li>
            </ul>
            </div>
        <div className="navbar-right">
   <img src={searchIcon} alt="" className='icons' />
   <p style={{marginTop:'14px'}}>Children</p>
   <img src={BellIcon} alt="" className='icons' /> 
   <div className="navbar-profile">
   <img src={ProfileImg} alt="" className='profile' /> 
<img src={caretIcon} alt="" />
<div className="dropdown">
  <p onClick={()=>{logout()}}  >Sign Out of Netflix</p>
</div>
   </div>
        </div>
    </div>
  )
}

export default Navbar