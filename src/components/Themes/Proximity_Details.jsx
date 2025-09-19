import { Link, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

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
    <motion.div 
      className='relative max-h-screen overflow-y-auto flex flex-col justify-cetner items-center'
      initial={{opacity:0, scale:0.9}}
      animate={{opacity:1, scale:1}}
      exit={{opacity:0, scale:0.9}}
      transition={{duration:0.3}}
    >
        <button onClick={()=>handleDetailsClick(null)}  className='absolute bg-slate-800 cursor-pointer rounded-lg p-1 top-0 right-5'>
          <X  className='h-[40px] w-[40px] text-red-400 '/>
        </button>
        
    <div className='pt-[15px] flex flex-col justify-center items-center'>
        <motion.h1 
          className='font-extra-bold text-3xl text-white'
          initial={{opacity:0, y:-20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.4}}
        >
          Project Detail
        </motion.h1>

        <motion.div 
          className='w-full mt-10 h-72 overflow-hidden'
          initial={{opacity:0, y:30}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.5}}
        >
            <img src={detailValue.img}/>
        </motion.div>

        <motion.span 
          className='bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text  text-transparent'
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.5}}
        >
          <h1 className=' font-extrabold mt-5  border-b-3 border-emerald-400  text-3xl'>{detailValue.title.toUpperCase()}</h1>
        </motion.span>

        <motion.button 
          className='cursor-pointer flex w-[50px] h-[30px] mt-[10px] justify-center items-center border-b-3 border-emerald-400 text-white'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.5, delay:0.2}}
        >
          Visit <a className='text-white'  target="_blank" 
            rel="noopener noreferrer" href={detailValue.link}><Link className=' ml-2 h-[15px] w-[15px]'/></a>
        </motion.button>

        <motion.div 
          className='w-full mt-5 max-w-3/4 bg-white p-2 rounded-md border-l-5 border-emerald-400'
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.5, delay:0.3}}
        >
            <p className='text-lg font-mono'>
                {detailValue.description}
            </p>
        </motion.div>
    </div>
    </motion.div>
  )
}

export default Proximity_Details
