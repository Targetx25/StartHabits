import Modal from '../Modal'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logoutSuccess } from '../../features/authSlice'

function Logout() {
  const [showModal , setShowModal] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

 
  const handleCloseModal = ()=>{
    setShowModal(false)
    navigate("/")
  }
  return (
    <div>
      {showModal && 
       <Modal
       title = "Do You Really Wanna Logout?"
       message = "Or Are You Just Trying to Escape to Your Comfort Zone"
      actionHandler = {()=>{authService.logout()
        .then(()=>(dispatch(logoutSuccess())))
        .then(()=>{navigate("/")})}}
      handleCloseModal = {handleCloseModal}
      actionLabel = "Logout.I am Sure.."
       />
      }
      
    </div>
  )
}

export default Logout
