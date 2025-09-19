import { Link, X } from 'lucide-react'
import React, { useEffect } from 'react'

function Proximity_Details({detailValue,detail,handleDetailsClick}) {
  
    useEffect(()=>{
        if(detail){
            document.body.classList.add("overflow-hidden");

        }else {
            document.body.classList.remove("overflow-hidden")
        }
          return () => document.body.classList.remove("overflow-hidden");
    },[detail])

    return (
    <div className='relative max-h-screen overflow-y-auto flex flex-col justify-cetner items-center'>
       
        <button onClick={()=>handleDetailsClick(null)}  className='absolute bg-slate-800 cursor-pointer rounded-lg p-1 top-0 right-5'><X  className='h-[40px] w-[40px] text-red-400 '/></button>
        
    <div className='pt-[15px] flex flex-col justify-center items-center'>

                <h1 className='font-extra-bold text-3xl text-white'>Project Detail</h1>

        <div className='w-full mt-10 h-72 overflow-hidden'>
            <img 
                src={detailValue.img}
            />

        </div>
          <span className='bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text  text-transparent'><h1 className=' font-extrabold mt-5  border-b-3 border-emerald-400  text-3xl'>{detailValue.title.toUpperCase()}</h1></span>
            <button className='cursor-pointer flex w-[50px] h-[30px] mt-[10px] justify-center items-center border-b-3 border-emerald-400 text-white'>Visit <a className='text-white'  target="_blank" 
  rel="noopener noreferrer" href={detailValue.link}><Link className=' ml-2 h-[15px] w-[15px]'/></a></button>
        <div className='w-full mt-5 max-w-3/4 bg-white p-2 rounded-md border-l-5 border-emerald-400'>
                <p className='text-lg font-mono'>
                    {detailValue.description}
                </p>
        </div>
    </div>
    </div>
  )
}

export default Proximity_Details
