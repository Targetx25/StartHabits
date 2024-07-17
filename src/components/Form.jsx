import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/authSlice'

function Form() {

  
  return (
      <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type='email' {...register("email", { required: true }, {
          pattern: {
            value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            message: "Invalid email address"
          }
        })} />
        <input type='text' {...register("password",
         { required: true }, 
          {minLength: 6, message: "Password must be at least 6 characters"},
          {maxLength: 12, message: "Password must be at most 12 characters"},
          )} />
        <input type='submit' />
      </form>
    </div>
  )
}




export default Form


