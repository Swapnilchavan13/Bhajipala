import React from 'react'
import {Link} from 'react-router-dom';
import '../Styles/navbar.css'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <img width={"100px"} height={"50px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ne_uwrbPpLliewoqwqzEvSXNxhcrTM2f1DQ65jEq8RlAB91d4_bxemTM-oTP1q0F_So&usqp=CAU" alt="" />
        <Link to=''>
        <h3>Login</h3> 
        </Link>
        <Link to='signup'>
        <h3>Signup</h3> 
        </Link>
        <Link to='products'>
        <h3>Products</h3> 
        </Link>
    </div>
  )
}
