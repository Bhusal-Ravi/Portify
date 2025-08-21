import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './AuthContext'
import Username from './Username';
import { ChevronDown, ChevronUp, Eye, Pencil, RotateCcw, Trash } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
import {
    FaStackOverflow, FaInstagram, FaSteam,
    FaTwitter, FaCss3Alt, FaPython, FaNodeJs, FaReact, FaJava, FaRust, FaGitAlt
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaHtml5, FaGolang } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiDjango } from "react-icons/di";
import { SiNumpy, SiTensorflow } from "react-icons/si";
import { AnimatePresence, motion, spring } from 'framer-motion';





function UserProfile() {

    const socialicons = [{ GitHub: <FiGithub />, label: "GitHub" },
    { StackOverflow: <FaStackOverflow />, label: "StackOverflow" },
    { Instagram: <FaInstagram />, label: "Instagram" },
    { Steam: <FaSteam />, label: "Steam" },
    { Twitter: <FaTwitter />, label: "Twitter" }]

    const skillicons = [
        { JavaScript: <IoLogoJavascript />, label: "JavaScript" },
        { HTML: <FaHtml5 />, label: "HTML" },
        { Css: <FaCss3Alt />, label: "Css" },
        { Tailwind: <RiTailwindCssFill />, label: "Tailwind" },
        { Python: <FaPython />, label: "Python" },
        { NodeJs: <FaNodeJs />, label: "NodeJs" },
        { Django: <DiDjango />, label: "Django" },
        { React: <FaReact />, label: "React" },
        { Java: <FaJava />, label: "Java" },
        { GoLang: <FaGolang />, label: "GoLang" },
        { Rust: <FaRust />, label: "Rust" },
        { Numpy: <SiNumpy />, label: "Numpy" },
        { TensorFlow: <SiTensorflow />, label: "TensorFlow" },
        { GitGithub: <FaGitAlt />, label: "GitGithub" },

    ]

    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [portfolioList, setPortfolioList] = useState({})
    const [toggleList, setToggleList] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const siteUrl = "https://localhost:5173"

    useEffect(() => {
        setProfile(user)
    }, [user])




    async function fetchPortfolio() {
        try {
            const response = await fetch(`http://localhost:5001/api/portfoliolist/${user._id}`, {
                credentials: 'include',
                method: "GET"
            })

            const result = await response.json();

            if (result.error === false) {
                setPortfolioList(result.list);
                setRefresh(prev => prev + 1)
                console.log(result.list)

            }

        } catch (error) {
            console.log("Error Getting Portfolio list", error);
        }
    }

    useEffect(() => {
        fetchPortfolio()
    }, [user])

    useEffect(() => {

    }, [refresh])

    return (
        <div className='userprofile  transition-all duration-300 ease-in-out min-h-screen relative flex flex-col items-center justify-start px-4'>
            <div className='hidden md:block text-2xl transition-all duration-400 ease-in-out lg:text-4xl text-white font-bold lg:ml-10  absolute top-5 left-5 '>
                <div className='bg-gradient-to-r animate-pulse absolute inset-0 transition-all duration-400 ease-in-out  from-purple-500 to-red-500 to yellow-500 blur-md z-10 h-10 w-35 lg:h-15 lg:w-39'></div>
                <h1 className=' relative z-50  transition-all duration-400 ease-in-out left-5 lg:top-2 text-center'>Portify</h1>


            </div>



            <div className='w-full max-w-md lg:max-w-lg mt-10 shadow-purple-500 shadow-2xl bg-gradient-to-r from-slate-900 to-purple-900 p-4 lg:p-6 rounded-md'>
                <div className='flex flex-col sm:flex-row items-center justify-center'>
                    <img
                        className='h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full mb-4 sm:mb-0 sm:mr-5'
                        src={`${profile.avatar}`}
                        alt="Profile"
                    />
                    <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-center sm:text-left'>
                        <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>
                            Welcome!
                        </span>
                        <span className='ml-2 text-white'>{profile.name}</span>
                    </h1>
                </div>
            </div>


            <div className='w-full relative  max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl transition-all ease-in-out duration-500 flex flex-col justify-center items-center mt-8'>
                <Username />
                <div className='hidden 2xl:flex  absolute right-0 px-5 py-5 top-0  max-w-[350px]  translate-x-[400px]  bg-black/20 border-2 border-purple-300 rounded-lg backdrop-blur-md text-white '>
                    <div className='flex flex-wrap flex-col justify-center items-center'>
                        <h1 className='text-xl font-bold'>Simple Working</h1>
                        <ul className='list-disc mx-5 mt-2 '>
                            <li className='mt-8 transition-all hover:text-purple-200 cursor-pointer'>Choose a unique username.</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>Your username will uniquely identify your portfolio.</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>Once set, your portfolio will be accessible at portify.com/(username).</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>Click "Submit" to proceed to the form page.</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>Complete the form to generate your personalized portfolio.</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>Currently, only one theme is available.</li>
                            <li className='mt-5 transition-all hover:text-purple-200 cursor-pointer'>More themes will be introduced after the MVP release.</li>

                        </ul>
                    </div>
                </div>
                <AnimatePresence>
                    {!toggleList && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ type: "tween" }}
                            className='flex flex-col items-center justify-center mt-6'>
                            <h1 className='font-semibold text-lg lg:text-xl'>Previous Portfolio</h1>
                            <button
                                onClick={() => setToggleList(prev => !prev)}
                                className='hover:scale-110 transition-all duration-300 cursor-pointer'
                            >
                                <ChevronDown />
                            </button>
                        </motion.div >
                    )}
                </AnimatePresence>


                <AnimatePresence mode='wait'>
                    {toggleList && (

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ type: "tween", duration: 0.5 }}
                            className='mt-6 w-full bg-white/30 backdrop-blur-sm relative border-purple-500 border-2 rounded-lg p-4 lg:p-6'
                        >
                            <div className='group  absolute bg-black p-2 rounded-full top-5 right-5 '>

                                <button onClick={fetchPortfolio} className=''><span className='opacity-0 absolute top-0 -translate-y-7 py-1 text-white text-xs font-medium -translate-x-5 bg-black rounded-md px-2 transition-all ease-in-out duration-200   group-hover:opacity-100'>Refresh</span>
                                    <RotateCcw className='h-5 w-5 text-purple-500 group-hover:scale-110 transition-all duration-300 cursor-pointer  ' />
                                </button>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center'>
                                    All of your previous <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-700 bg-clip-text text-transparent'>Portfolios</span>
                                </h1>
                                <button
                                    onClick={() => setToggleList(prev => !prev)}
                                    className='mt-2 mb-4 hover:scale-110 transition-all duration-300 cursor-pointer animate-pulse'
                                >
                                    <ChevronUp />
                                </button>
                            </div>

                            {portfolioList.length > 0 ? (
                                <div className='space-y-4 lg:space-y-6'>
                                    {portfolioList.map((item, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ type: "tween", duration: 0.5 }}
                                            viewport={{ amount: 0.5 }}

                                            key={index}
                                            className='relative  bg-black rounded-lg shadow-lg shadow-black/50 '
                                        >

                                            <div className='flex absolute top-0 right-0 gap-2 bg-black p-1 sm:p-2 lg:p-3 rounded-md'>
                                                <div className='group relative'>
                                                    <p className='absolute z-50 -translate-y-10 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-1/2 left-1/2 bg-black/80 rounded-md px-2 py-1 text-xs text-white whitespace-nowrap'>
                                                        View
                                                    </p>
                                                    <Eye className='text-purple-500 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
                                                </div>
                                                <div className='group relative'>
                                                    <p className='absolute -translate-y-10 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-1/2 left-1/2 bg-black/80 rounded-md px-2 py-1 text-xs text-white whitespace-nowrap'>
                                                        Edit
                                                    </p>
                                                    <Pencil className='text-yellow-500 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
                                                </div>
                                                <div className='group relative'>
                                                    <p className='absolute -translate-y-10 opacity-0 transition-all duration-300 group-hover:opacity-100 -translate-x-1/2 left-1/2 bg-black/80 rounded-md px-2 py-1 text-xs text-white whitespace-nowrap'>
                                                        Delete
                                                    </p>
                                                    <Trash className='text-red-500 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
                                                </div>
                                            </div>


                                            <div className='customurl object-cover flex h-18 md:h-25 lg:h-32 transition-all ease-in-out items-end justify-center bg-white px-2'>
                                                <p className='text-sm sm:text-base lg:text-lg bg-white rounded-md py-1 lg:py-2 mx-5 shadow-sm font-semibold truncate text-black   w-full text-center'>
                                                    {siteUrl}/<span className='font-semibold  bg-gradient-to-r from-purple-500 via-red-500 to-yellow-700 bg-clip-text text-transparent'>
                                                        {item.url}
                                                    </span>
                                                </p>
                                            </div>


                                            <div className='p-3 lg:p-5 text-white'>

                                                <div className='flex flex-col sm:flex-row items-center justify-between mb-3 md:mb-8 lg:mb-10 transition-all ease-in-out '>
                                                    <div className='flex items-center mb-2 sm:mb-0'>
                                                        {item.profileimg && (
                                                            <img
                                                                className='h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full object-cover mr-2 sm:mr-3'
                                                                src={`${item.profileimg}`}
                                                                alt="Profile"
                                                            />
                                                        )}
                                                        <h2 className='text-sm sm:text-base lg:text-lg'>{item.username}</h2>
                                                    </div>


                                                    <div className='flex flex-wrap justify-center'>
                                                        {item.social.map((items, index) => (
                                                            <div key={index} className='relative m-1 lg:m-2 group/icon'>
                                                                <div className='text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
                                                                    {items.title}
                                                                </div>
                                                                <a
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='w-fit cursor-pointer bg-slate-800 rounded-full flex justify-center items-center p-1 sm:p-2 lg:p-3 text-white hover:bg-slate-700 transition-all duration-300 shadow-md group-hover/main:shadow-emerald-400'
                                                                >
                                                                    {socialicons.map((item) => item[items.title])}
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>


                                                <p className='text-xs sm:text-sm lg:text-base text-center mb-3 md:mb-8 lg:mb-10 transiton-all duration-200 ease-in-out'>{item.tag}</p>


                                                <div className='flex flex-wrap justify-center gap-1 mx-0 md:mx-10 lg:mx-16 sm:gap-2 lg:gap-3 transition-all ease-in-out duration-500'>
                                                    {item.skills.map((items, index) => (
                                                        <div key={index} className='relative group/icon '>
                                                            <div className='text-xs  transition-all bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100  duration-200 pointer-events-none whitespace-nowrap z-10'>
                                                                {items.title}
                                                            </div>
                                                            <a
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                                className='w-fit cursor-pointer bg-slate-800 transition-all duration-300 m-0.5 lg:m-1 shadow-sm group-hover:shadow-emerald-400 group-hover/main:scale-110 group-hover/icon:bg-slate-900 rounded-full flex justify-center items-center p-1 sm:p-2 lg:p-3 text-white'
                                                            >
                                                                {skillicons.map((item) => item[items.title])}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-4 lg:py-6'>No previous Portfolios Found</div>
                            )}
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default UserProfile