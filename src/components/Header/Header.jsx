import React, {useId} from 'react'
import {useNavigate } from 'react-router-dom'

function Header() {

  const id = useId()

  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      link : "/"
    },

    {
      name: "Login",
      link : "/login"
    },

    {
      name : "SignUp",
      link : "/signup"
    },
    {
      name : " Add Habit",
      link : "/add-habit"
    }
  ]
  return (
  // NOte change the key for each item here
    <div>
      <nav className=" bg-black text-white ">
        <ul className='flex flex-row justify-evenly list-none'>
          {navItems.map(item => (
            <li key= {item.name} className='rounded-md bg-black'>
              <button onClick={()=>(navigate(item.link))}>
                {item.name}
              </button>
            </li>
          ))}
      </ul>

      </nav>
    </div>
  )
}

export default Header
