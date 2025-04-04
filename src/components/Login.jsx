import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input} from "./index"
import authService from '../appwrite/auth'
import { loginSuccess } from '../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'




function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register,handleSubmit, formState: { errors }} = useForm()

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
    console.log(data)
    try {
      const res = await authService.login({...data})

      if(res){
        const userData = await authService.getUserInfo()
          if(userData){
            dispatch(loginSuccess(userData))
            navigate("/")
          }
      }else{
        console.log("Error While fetching user data !")
      }
    
    } catch (error) {
      console.log("Error While LOgging in !")
    }
  }

  const googleLogin =  async () => {
   try {
      await authService.oauthLogin()

    } catch (error) {
      console.log("Error While LOgging in !")
    }
  }

  return (
    <div className=''>
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
          {errors.email && <span>{errors.email.message}</span>}

          <Input
           type='text'
           className={"text-black hover:shadow-md"}
           placeholder="Enter Your Password"
           label="Password"
           {...register("password",
         { required: true , 
          minLength:{ value : 6, message: "Password must be at least 6 characters"},
          maxLength:{ value: 12, message: "Password can be at most 12 characters"}},
          )} />
          {errors.password && <span>{errors.password.message}</span>}

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
      <Link to = "/signup">Not a member? Sign up now</Link>
     </div>
    </div>
    
  )
}

export default Login
