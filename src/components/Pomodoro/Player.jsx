import React, { useRef, useState } from 'react'

function Player() {

    const [play, setPlay] = useState(false)
    

    const audioRef = useRef(new Audio("/sounds/fire-sound.wav"))
    audioRef.current.preload = "auto";

    const handlePlay = ()=>{


        if(play){
            console.log("paused")
            try{
                audioRef.current.loop = false;
                audioRef.current.pause()
            }catch(err){
                console.log(err)
            }
            setPlay(false)
        }else{
            console.log("playing")
            setPlay(true)
            audioRef.current.loop = true;
           audioRef.current.play();
           
        }
    }

  return (
    <div className='bg-pink-600 text-white flex flex-row items-center'>

        <button onClick={handlePlay} className='rounded-md text-white bg-pink-400'>{play?"Pause":"Play"}</button>
      
    </div>
  )
}

export default Player
