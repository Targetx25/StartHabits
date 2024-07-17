import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addHabit, updateHabit } from '../features/listSlice'
import configService from '../appwrite/config'


function Habitsform({habit}) {


  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)
  console.log(userData)
  const {register , handleSubmit} = useForm({
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
    console.log(data)

    if(habit){
      //Perform Update
      dispatch(updateHabit(data))

      try {
        const res = await configService.updateDocument(data)
      } catch (error) {
        console.log("Appwrite :: UpdateDocument :: Error :: ", error.message)
      }finally{
  
        SetLoading(false)
      }
    } else{

      dispatch(addHabit(data))

      try {
        const res = await configService.createDocument({...data, userid : userData.$id})
        console.log("Sucessfully Created")
      } catch (error) {
        console.log("Appwrite :: CreateDocument :: Error :: ", error.message)
      }
    }

  }


  return (

     <div >

      {loading?<h1>Loading</h1>: <form  className='flex flex-col gap-2 w-[55%] text-black font-bold' onSubmit={handleSubmit(onSubmit)}>

<label>Habit Name</label>
<input type="text" placeholder='Enter Your Habit' {...register("name")} />
<label >How many days you want to do it for ?  </label>
<input type="text" placeholder='21' {...register("goal")} />
<label >Habit Importance </label>
<p>Why is this habit important to You ?Give yourself 2 mins to think before writing it</p>
<input type="text" placeholder='i want to do ir because i wanne be better person' {...register("importance")} />
<label >Frequency : </label>
<p>How many hours a day do you want to do it ?</p>
<input type="text" placeholder='3' {...register("hrsday")} />
<input type="submit" value="Submit" className='bg-black text-white p-2'/>


</form> }
      

    </div>
  )
}

export default Habitsform
