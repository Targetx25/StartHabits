import React, {useState} from 'react'


function HabitCard({data}) {

  return (
    <div className= 'rounded-md text-black bg-white text-semi-bold text-center'>
      <p className='text-bold'>{data.name}</p>
    </div>
  )
}

export default HabitCard
