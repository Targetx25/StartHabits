import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input} from "./index"
import authService from '../appwrite/auth'
import { loginSuccess } from '../features/authSlice'
import { Link } from 'react-router-dom'



function Login() {
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()

  //This code was just for testing habit submission Maybe needed in future fo development purposes
  // useEffect( ()=> {
  //   authService.getUserInfo()
  //   .then((data) => {
  //     console.log(data)
  //     if(data){
  //       dispatch(loginSuccess(data))

  //     }


  //   })
  // }, [])

  
   
  const onSubmit = async (data) => {

    try {
      const res = await authService.login({...data})

      if(res){
        const userData = await authService.getUserInfo()
          if(userData){
            dispatch(loginSuccess(userData))
          }
      }else{
        console.log("Error While fetching user data !")
      }
    
    } catch (error) {
      console.log("Error While LOgging in !")
    }
  }

  const googleLogin =  async () => {
    await authService.oauthLogin()
  }

  return (
    <div className=''>
      <Link to="/habit">habit</Link>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
          label={"Email"}
          type = {"email"}
          placeholder={"Enter Your Email"}
          className={"text-black hover:shadow-md"}
          {...register("email", { required: true }, {
            pattern: {
              value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
              message: "Invalid email address"
            }
          })}
          />

          <Input
           type='text'
           className={"ext-black hover:shadow-md"}
           placeholder="Enter Your Password"
           label="Password"
           {...register("password",
         { required: true }, 
          {minLength: 6, message: "Password must be at least 6 characters"},
          {maxLength: 12, message: "Password must be at most 12 characters"},
          )} />

          <Button
          type="submit"
          text="Login"
          />

        </form>
      </div>
     <Button
      onClick = {googleLogin}
      icon = ""
      text = "Login with Google"/>
     <div>
      {/* Not a memeber Sign up now ! Pending to be implemented */}
     </div>
    </div>
    
  )
}

export default Login
