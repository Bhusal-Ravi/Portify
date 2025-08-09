import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Telescope } from 'lucide-react';
import { motion, spring } from 'framer-motion';
import Marqueeslider from './Marqueeslider';



function Home() {

    const navigate = useNavigate();
    const [menueShow, setMenueShow] = useState(false)

    function handlePortfolio() {
        navigate('/username')
    }

    return (

        <div className='min-h-screen '>


            {/*NavBar*/}
            <motion.nav initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "tween", duration: 1, ease: "easeOut" }} className=' shadow-2xl shadow-purple-600  fixed z-10 top-5 max-w-4xl mx-auto left-5 right-5  rounded-xl  bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20   py-5 px-5 flex text-white justify-between  items-center '>
                <div className='transition-all hover:scale-110 duration-300 ease-in-out  cursor-pointer'>
                    <h1 className='text-sm md:text-lg md:font-bold '>Portify</h1>
                </div>
                {/*Medium Screen Nav*/}
                <div className='hidden md:flex '>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 50 }}
                        className=' rounded-lg   '
                    >
                        <ul className="list-none flex text-gray-800">
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className="px-4 py-2 cursor-pointer text-slate-800 ">Home</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className="px-4 py-2 cursor-pointer text-slate-800 ">Features</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className="px-4 py-2 cursor-pointer text-slate-800 ">How to</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className="px-4 py-2 cursor-pointer text-slate-800 ">Contact Us</motion.li>
                        </ul>
                    </motion.div>
                </div>
                <div className='group '>

                    <button className='cursor-pointer group-hover:shadow-2xl transition duration-300 group-hover:shadow-purple-600/80 h-8 w-22 md:h-10 md:w-32 p-[1.5px] pt-[1px] flex justify-center items-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500'>

                        <div className='h-full w-full text-sm font-thin flex p-1 justify-center items-center rounded-full bg-gradient-to-r from-gray-600 to-gray-800 group-hover:from-gray-500 group-hover:to-gray-600 group-hover:transition group-hover:duration-300 '><span> <img className='h-3 w-3 md:h-5 md:w-5 md:mr-5 mr-2' src='google.png' /></span>Sign In</div>
                    </button>
                </div>

                {/*NMobile Nav*/}
                <div className='mr-10 md:hidden '>
                    {!menueShow ?
                        (<Menu className='h-5 w-5  relative cursor-pointer hover:scale-105 transition-all duration-300' onClick={() => setMenueShow((prev) => !prev)} />) :

                        (<X className=' h-5 w-5relative cursor-pointer hover:scale-105 transition-all duration-300' onClick={() => setMenueShow((prev) => !prev)} />)

                    }


                    {menueShow && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            className='absolute top-full right-6 mt-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-lg shadow-lg min-w-[150px] py-2'
                        >
                            <ul className="list-none text-white/80">
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Home</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Features</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">How to</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Contact Us</motion.li>
                            </ul>
                        </motion.div>
                    )
                    }
                </div>




            </motion.nav>
            <section
                id='home'
                className='heropattern flex flex-col justify-center items-center min-h-screen object-cover bg-center  '

            >

                <div className='flex flex-col justify-center text-center max-w-3xl md:max-w-4xl lg:max-w-7xl '>
                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: -150, y: 150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/50 font-extrabold text-4xl md:text-7xl lg:text-9xl transition-all ease-in-out duration-200"
                    >
                        Stop Searching,
                    </motion.h1>

                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: 150, y: -150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/90 mt-1 font-extrabold text-4xl md:text-7xl lg:text-9xl drop-shadow-2xl drop-shadow-white/40 transition-all ease-in-out duration-300"
                    >
                        Start{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            Creating!
                        </span>
                    </motion.h1>
                    <div className='mt-10 text-white/60 text-md md:text-xl lg:text-2xl font-md flex flex-col justify-center text-center text-wrap max-w-3xl md:max-w-4xl lg:max-w-7xl px-5'>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }} className=' '>Skip the code. Portify, your Personal Portfolio <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-200'>Designer,</span></motion.p>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }}>Builds a stunning showcase for your skills fast. Impress, don’t <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-300'>stress!</span></motion.p>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }} className='flex gap-5 justify-center items-center'>
                    <button onClick={handlePortfolio} className='text-white/80 cursor-pointer text-sm font-bold  mt-15 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 rounded-md h-13 w-40 p-[2px] flex items-center justify-center group hover:shadow-lg hover:shadow-purple-500/50'><span className=' group-hover:text-white bg-gradient-to-r from-slate-900  to-slate-900 group-hover:from-gray-800 group-hover:to-gray-900 w-full h-full rounded-md flex justify-center items-center'><Zap className='mr-3' />Try For Free</span></button>
                    <button className='text-white/80 hover:text-white cursor-pointer text-sm font-bold  mt-15 bg-white/10 border-white border-2 rounded-md h-13 w-40 p-[2px] flex items-center justify-center group hover:shadow-lg hover:shadow-white/50'><span className='flex justify-center items-center '><Telescope className='mr-3' />Explore</span></button>
                </motion.div>

            </section>

            <section id='features' className='min-h-screen bg-black'>
                <div className='overflow-x-hidden'>
                    <Marqueeslider />
                </div>
            </section>

        </div >
    )
}

export default Home