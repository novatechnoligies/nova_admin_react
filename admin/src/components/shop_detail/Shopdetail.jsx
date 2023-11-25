import React from 'react'
import './Shopdetail.css'
import { NavLink, Outlet } from 'react-router-dom'





const Shopdetail = () => {
  return (
    <div className='S_detail_container'>
         <div className='S_detail_nav_bar'>
            <NavLink to="/shop_detail/ShopServeice" className="SD_navLink">shop service</NavLink>
            <NavLink to="/shop_detail/ShopAva" className="SD_navLink"> shop avalibility</NavLink>
            <NavLink to="/shop_detail/ShopPromo" className="SD_navLink">Promotions</NavLink>
            <NavLink to="/shop_detail/ShopInventory" className="SD_navLink">Inventories</NavLink>
            <NavLink to="/shop_detail/EmoloyesManagement" className="SD_navLink">Employees managment</NavLink>
            <NavLink to='/shop_detail/S_Consumer' className="SD_navLink">Consumer </NavLink>
         </div>  
         <Outlet/>
    </div>
   
  )
}

export default Shopdetail