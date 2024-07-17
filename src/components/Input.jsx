import React, {forwardRef, useId} from 'react'


function Input({label, type, placeholder, className, ...props}, ref) {
    const  id = useId();
  return (
    <div> 
     {label && <label htmlFor={id}>{label}</label>}
     <input 
     type={type}
     className={` px-4 rounded-md py-2${className}`}
     placeholder={placeholder}
     id={id}
     ref={ref}
     {...props}
     />
     
    </div>
  )
}

 export default forwardRef(Input)
