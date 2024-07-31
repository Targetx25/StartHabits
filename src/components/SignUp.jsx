import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Input} from "./index"
import authService from '../appwrite/auth'
import { loginSuccess } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
     
    const onSubmit = async (data) => {
      
      try {
        //Also need to send name to createAcc Maybe idk for later
        const res = await authService.createAccount({...data})
          if(res){
            const userData = await authService.getUserInfo()
              if(userData){
                dispatch(loginSuccess(userData))
                navigate("/")
              }
          }    
        
     } catch (error) {
        console.log("Error While Creating Account4 !")
     }
    }
    
    const googleLogin =  async () => {
      await authService.oauthLogin()
    }    
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Input
          label={"Name"}
          type = {"text"}
          placeholder={"Enter Your Name"}
          className={"text-black hover:shadow-md"}
          {...register("name", { required: true })}
          />

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
          text="Sign Up"
          />

        </form>
      </div>
     <Button
      onClick = {googleLogin}
      icon = ""
      text = "SignUp with Google"/>
     <div>
      <Link to = '/login'>Already have an account?</Link>
     </div>
    </div>
  )
}

export default SignUp
