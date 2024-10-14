import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addHabit, updateHabit } from '../features/listSlice'
import configService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'


function Habitsform({habit}) {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.status)
  const {register , handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      name : habit?.name || "",
      goal : habit?.goal || "",
      importance : habit?.importance || "",
      hrsday : habit?.hrsday || "",
    }
  })
    const [loading , SetLoading] = useState(false)

  const onSubmit =  async(data) => {
    SetLoading(true)

    if(habit){
      //Perform Update
      dispatch(updateHabit(data))

      try {
        const res = await configService.updateDocument({...data, goal : parseInt(data.goal) ,hrsday : parseInt(data.hrsday), userid : userData.$id})
      } catch (error) {
        console.log("Appwrite :: UpdateDocument :: Error :: ", error.message)
      }finally{
        SetLoading(false)
        navigate("/habit/"+habit.$id)
      }
    } else{

      dispatch(addHabit(data))

      try {
        SetLoading(true)
        const res = await configService.createDocument({...data, goal : parseInt(data.goal) ,hrsday : parseInt(data.hrsday), userid : userData.$id})
        console.log(res)
        const another = await configService.newStreak({habitid: res.$id, startDate: new Date()})
        if(res && another){
          console.log("Successfully Created")
          navigate("/habit/"+res.$id)
        }
      } catch (error) {
        console.log("Appwrite :: CreateDocument :: Error :: ", error.message)
      }
    }

  }


  return (

     <div >

      {loading?<h1>Loading</h1>: <form  className='flex flex-col gap-2 w-[55%] text-black font-bold' onSubmit={handleSubmit(onSubmit)}>

<label>Habit Name</label>
<input type="text" placeholder='Enter Your Habit' {...register("name" , {required :true}) } />
{errors.name && <span>This field is required</span>}
<label >How many days you want to do it for ?  </label>
<input type="text" placeholder='21' {...register("goal", {required: true})} />
<label >Habit Importance </label>
<p>Why is this habit important to You ?Give yourself 2 mins to think before writing it</p>
<input type="text" placeholder='i want to do ir because i wanna be better person' {...register("importance", {required :true})} />
<label >Frequency : </label>
<p>How many hours a day do you want to do it ?</p>
<input type="text" placeholder='3' {...register("hrsday", {required:true}, {pattern : {value: /^[0-9]+$/i, message: "Only numbers are allowed"}})} />
{errors.hrsday && <span>{errors.hrsday.message}</span>}
<input type="submit" value="Submit" className='bg-black text-white p-2'/>


</form> }
      

    </div>
  )
}

export default Habitsform
