import React from 'react'
import { motion } from 'framer-motion'
function Marqueeslider() {
    const upper = [
        "/01.svg",
        "/02.svg",
        "/03.svg",
        "/04.svg",
        "/05.svg",
        "/06.svg",
        "/07.svg",
        "/08.svg",
        "/09.svg",
        "/10.svg",
        "/11.svg"

    ]

    const lower = [
        "/12.svg",
        "/13.svg",
        "/14.svg",
        "/15.svg",
        "/16.svg",
        "/17.svg",
        "/18.svg",
        "/19.svg",
        "/20.svg",
        "/21.svg",
        "/22.svg",
    ]
    return (
        <div className='relative z-0 '>
            <div className='flex'>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className='flex '>
                    {upper.map((item, index) => (
                        <img className=' flex-shrink-0 mt-5 mx-5 pr-5 mb-1 lg:h-30 lg:w-46 md:h-25 md:w-40 sm:h-20 sm:w-35' key={index} src={`${item}`} />
                    ))}

                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className='flex '>
                    {upper.map((item, index) => (
                        <img className=' flex-shrink-0 mt-5 mx-5 pr-5 mb-1 lg:h-30 lg:w-46 md:h-25 md:w-40 sm:h-20 sm:w-35' key={index} src={`${item}`} />
                    ))}

                </motion.div>

            </div>
            <div className='flex'>
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className='flex'>
                    {lower.map((item, index) => (
                        <img className='flex-shrink-0 mt-1 mx-5 mb-5 pr-5 lg:h-30 lg:w-46 md:h-25 md:w-40 sm:h-20 sm:w-35' key={index} src={item} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className='flex'>
                    {lower.map((item, index) => (
                        <img className='flex-shrink-0 mt-1 mx-5 mb-5 pr-5 lg:h-30 lg:w-46 md:h-25 md:w-40 sm:h-20 sm:w-35' key={index} src={item} />
                    ))}
                </motion.div>
            </div>

        </div>
    )
}

export default Marqueeslider