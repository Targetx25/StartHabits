import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/authSlice'
import authService from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

function Oauthload() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

    useEffect(()=>{

        const fetchuserInfo = async () => {
            try {
                const userData = await authService.getUserInfo()
                if(userData){
                  console.log(userData)
                  dispatch(loginSuccess(userData))
                  navigate("/")
                }else{
                  console.log("User Data Not Found")
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchuserInfo();
    }, [])
  return (
    <div>
      <p className='flex flex-row justify-center items-center'>Please Wait While We Log You In ...</p>
    </div>
  )
}

export default Oauthload
