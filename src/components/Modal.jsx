import React ,{useRef} from 'react'
import { useNavigate } from 'react-router-dom';



function Modal ({handleCloseModal , title, message, actionHandler, actionLabel, imp}) {

  const modalRef = useRef(null)

  const handleClick = (e)=>{
    
    if(modalRef.current === e.target){
      handleCloseModal();
    }
  }

  const navigate = useNavigate();


  return ( 
   <div ref={modalRef} onClick={handleClick} className='fixed  flex flex-col items-center justify-center inset-0 bg-opacity-5 backdrop-blur-sm text-white'>
    <div className='bg-black w-1/3 rounded-t-md'>
    <button className='text-white' onClick={handleCloseModal} type='button'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    </div>
     <div className='bg-violet-500 flex flex-col border-black border-4 gap-3 items-center w-1/3 h-75% rounded-b-md  px-3 py-3 text-white'>
        {title && <h1 className='font-bold text-2xl text-white '>{title}</h1>}
        {imp && <p className='text-wrap italic'> Remember You Said {imp}</p>}
        {message && <p className='text-wrap text-xl'>{message}</p>}
        {actionLabel && <button className='bg-black  px-4 py-2 rounded-md' onClick={actionHandler}>{actionLabel}</button>}
    </div>
   </div>
  )
}

export default Modal
