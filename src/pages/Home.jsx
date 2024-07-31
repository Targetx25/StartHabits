
import configService from '../appwrite/config'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'



function Home() {


    const [habits , setHabits] = useState([])
    const [error , setError ] = useState(null)
    const [loading , setLoading ] = useState(false)

    useEffect( () => {
      
      try {
        setLoading(true)
       setError(null)
          configService.getHabitList()
          .then((data)=>{
            if(data){
              setHabits(data.documents)
              setLoading(false)
            }
          })
         

     } catch (error) {
      setError(error.message)
      console.log("Appwrite :: getHabits :: Error :: " , error.message)
     }

       
       
    }, [])
 

  if(loading){
    return (
      <p>Loading...</p>
    )
  }else{
    if(habits == 0){
      return(
        <div>
          <h1>No Habits Added yet Please Login</h1>
        </div>
      )
    
     }else{
    
      return (
        <div className='bg-black  text-white h-screen mt-2'>
           <p className='font-bold text-center'> Welcome, Acer!</p>
         {error?<p className='text-red-400'>{error}</p>:
          habits.map((habit)=>(
            
            <PostCard key={habit.$id} $id= {habit.$id} name={habit.name} streak={habit.streak} status={habit.complete}/>
        ))
         }
        </div>
      )
     }
  }
    
}

export default Home
