import React, {useEffect, useId} from 'react'
import { useSelector } from 'react-redux'

import {useNavigate } from 'react-router-dom'

function Header() {

 
  const status = useSelector(state => state.auth.status)
  console.log(status)


  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      link : "/",
      active : status
    },

    {
      name: "Login",
      link : "/login",
      active : !status
    },

    {
      name : "SignUp",
      link : "/signup",
      active : !status,
    },
    {
      name : " Add Habit",
      link : "/add-habit",
      active : status,
    },
    {
      name: "Logout",
      link : "/logout",
      active : status,
    }
  ]
  return (
  // NOte change the key for each item here
    <div>
      <nav className=" bg-black text-white ">
        <ul className='flex flex-row justify-evenly list-none'>
          {navItems.map(item => (
          
           item.active && ( <li key= {item.name} className='rounded-md bg-black'>
           <button onClick={()=>(navigate(item.link))}>
             {item.name}
           </button>
         </li>)
          ))}
      </ul>

      </nav>
    </div>
  )
}

export default Header
