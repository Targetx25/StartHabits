import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({$id, name, streak, status}) {
  return (
    <Link to={`/habit/${$id}`}>
      <div className='flex flex-row justify-center items-center'>
      <div className='flex flex-row bg-gray-600 px-2 py-2 my-2 w-2/3 justify-between ml-3 rounded-md text-white hover:ring-white hover:outline-1'>
            <p className='text-2xl'>{name}</p>
            <div className='flex flex-col gap-2'>
                <p>Streak : {streak}</p>
                <p>Status : {status ? "Deadline Reached" : "In Progress"}</p>  
            </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
