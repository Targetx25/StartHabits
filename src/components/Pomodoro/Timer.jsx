import React, {useState , useEffect, useCallback, useRef} from 'react'


function Timer() {

    const [seconds, setSeconds] = useState(5);
    const [ started , setStarted] = useState(false);
    const [breakTime , setBreakTime] = useState(10);
    const [gap, setGap] = useState(false);//For Break Btw sessions
    const interValRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(()=>{

     audioRef.current = new Audio("/sounds/bell.mp3");
      audioRef.current.preload = "auto";

      return()=>{

        if(audioRef.current){
          audioRef.current.pause();
          audioRef.current = null;
        }
      }

    }, [])

    useEffect(()=>{
       
      if(started){
          interValRef.current = setInterval(() => {

            if(seconds > 0){
              setSeconds(seconds-1);

            }else{
              if(gap){
                audioRef.current.play();
                setSeconds(5);
                setGap(false);
              }else{
                setGap(true);
                setSeconds(breakTime);
                audioRef.current.play();
              }
            }
            
          }, 1000);
      }

      return ()=>{
        if(interValRef.current){
          clearInterval(interValRef.current);
          interValRef.current = null;
        }
       
      }

    },[seconds, started])

    const handleToggle = useCallback(()=>{
      setStarted(!started);
    })

    const handleReset = useCallback(()=>{
      setSeconds(20);
      setGap(false);
    }, []);

    const formatDisplay = useCallback((seconds)=>{

      const minutes = Math.floor(seconds/60);
      const remainSeconds = seconds % 60;

      return `${minutes.toString().padStart(2, '0')}:${remainSeconds.toString().padStart(2, '0')}`
    }, [])

  return (
    <div className='flex flex-col gap-2 items-center'>
      <h1 className='text-2xl'>Count: {formatDisplay(seconds)}</h1>
      <p>Status: {gap? "Break" : "Focus"}</p>
      <button onClick={handleToggle} className='bg-blue-500 rounded-md py-2 px-2'>{started ? "Pause" : "Start"}</button>
      <div className='flex flex-row gap-3'>
        <button className='rounded-md bg-violet-600 text-white' onClick={()=>{setSeconds(seconds+60)}}>+ 60 secs</button>
        <button className='rounded-md bg-cyan-400 text-black' onClick={()=>{setSeconds(seconds-60)}}>- 60 secs</button>
      </div>
        <p>Break Time: {formatDisplay(breakTime)} minutes</p>
      <div className='flex flex-row gap-3'>
        <button className='rounded-md bg-violet-600 text-white' onClick={()=>{setBreakTime(breakTime + 60)}} >+ 60 secs</button>
        <button className='rounded-md bg-cyan-400 text-black' onClick={()=>{setBreakTime(breakTime-60)}}>- 60 secs</button>
      </div>

      <button onClick={handleReset} className='bg-green-500 py-2 px-2'>Reset</button>
     
    </div>
  )
}

export default Timer
