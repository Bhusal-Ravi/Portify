import React, { useEffect, useState } from 'react'
import { Trash, Plus, ExternalLink } from 'lucide-react';
import { useParams } from 'react-router-dom'
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
import { motion } from 'framer-motion';


function PortFolio() {
    const { url } = useParams();
    const [portfolio, setPortfolio] = useState({
        username: '',
        description: '',
        tag: '',
        social: [],
        skills: [],
        projects: []
    })

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const response = await fetch(`http://localhost:5001/api/getportfolio/${url}`, {
                    method: 'GET'
                })

                const result = await response.json();
                if (response.ok) {
                    setPortfolio(result.portfolio)
                }
                console.log(result.portfolio)

            } catch (error) {
                console.log(error)
            }
        }
        fetchPortfolio()
    }, [url])

    const formatUrl = (url) => {
        if (!url) return '#';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    const socialicons = [{ GitHub: <FiGithub className='h-8 w-8' />, label: "GitHub" },
    { StackOverflow: <FaStackOverflow className='h-8 w-8' />, label: "StackOverflow" },
    { Instagram: <FaInstagram className='h-8 w-8' />, label: "Instagram" },
    { Steam: <FaSteam className='h-8 w-8' />, label: "Steam" },
    { Twitter: <FaTwitter className='h-8 w-8' />, label: "Twitter" }]

    const skillicons = [
        { JavaScript: <IoLogoJavascript className='h-8 w-8' />, label: "JavaScript" },
        { HTML: <FaHtml5 className='h-8 w-8' />, label: "HTML" },
        { Css: <FaCss3Alt className='h-8 w-8' />, label: "Css" },
        { Tailwind: <RiTailwindCssFill className='h-8 w-8' />, label: "Tailwind" },
        { Python: <FaPython className='h-8 w-8' />, label: "Python" },
        { NodeJs: <FaNodeJs className='h-8 w-8' />, label: "NodeJs" },
        { Django: <DiDjango className='h-8 w-8' />, label: "Django" },
        { React: <FaReact className='h-8 w-8' />, label: "React" },
        { Java: <FaJava className='h-8 w-8' />, label: "Java" },
        { GoLang: <FaGolang className='h-8 w-8' />, label: "GoLang" },
        { Rust: <FaRust className='h-8 w-8' />, label: "Rust" },
        { Numpy: <SiNumpy className='h-8 w-8' />, label: "Numpy" },
        { TensorFlow: <SiTensorflow className='h-8 w-8' />, label: "TensorFlow" },
        { GitGithub: <FaGitAlt className='h-8 w-8' />, label: "GitGithub" },


    ]

    const containerVarients = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.5
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0, y: 20
        },
        show: {
            opacity: 1, y: 0
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center bg-gradient-to-r from-slate-900 via-indigo-400 to-slate-900'>

            {/* Profile Section - Full Screen */}
            <div className=' min-w-7xl flex flex-col justify-center items-center py-8 px-4'>

                <div className='flex  flex-col justify-center items-center '>
                    {portfolio.username ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className='relative bg-slate-700/50 min-w-7xl min-h-screen group/main transition-colors duration-700 hover:bg-slate-800 flex justify-center flex-col items-center font-semibold rounded-md px-1 py-4 w-full text-white'
                        >
                            {/* About Me Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: -40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.7 }}
                                className='absolute top-40 text-3xl font-bold'
                            >
                                About Me
                            </motion.h1>

                            <div className='flex min-w-5xl px-2 flex-row justify-between items-center mb-4'>

                                {/* Text Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.7 }}
                                    className='flex flex-col justify-center items-center'
                                >
                                    <h1 className='transition-all duration-700 text-white group-hover/main:text-emerald-400 group-hover/main:scale-115 text-lg'>
                                        <span>Hi, I'm <span className='text-emerald-400'>{portfolio.username}</span></span>
                                    </h1>
                                    <p className='font-extralight text-sm text-white/70 transition-all duration-700 group-hover/main:text-emerald-400/70'>{portfolio.tag}</p>
                                    <hr className='w-full mt-5 opacity-50 transition duration-700 group-hover/main:text-emerald-400'></hr>

                                    <div className='max-w-xl flex justify-center items-center mt-5'>
                                        <p className='break-words flex overflow-auto text-md transition-all duration-700 group-hover/main:text-emerald-400 font-light md:text-base'>
                                            {portfolio.description || (
                                                <span className='text-slate-400 italic'>No description provided</span>
                                            )}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Image */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.7 }}
                                    className='h-100 w-70 flex justify-center border-2 border-emerald-400 shadow-lg transition-all duration-700 group-hover/main:shadow-emerald-800 rounded-lg items-center mr-5 mb-2 overflow-hidden'
                                >
                                    <img
                                        className='h-90 w-60 rounded-lg object-cover transition-all duration-700 group-hover/main:scale-115'
                                        src={`${portfolio.profileimg}`}
                                        alt='Profile'
                                    />
                                </motion.div>
                            </div>

                            {/* Social Icons */}
                            {portfolio.social.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    className='absolute bottom-30 flex flex-col justify-center items-center flex-wrap gap-2'
                                >
                                    <h1 className='font-light mr-2 text-emerald-400'>Connect With Me</h1>
                                    <div className='flex gap-4'>
                                        {portfolio.social.map((items, index) => (
                                            <div key={index} className='relative group/icon'>
                                                <div className='text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
                                                    {items.title}
                                                </div>
                                                <a
                                                    href={formatUrl(items.link)}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='w-fit cursor-pointer bg-slate-800 rounded-full flex justify-center items-center p-2 text-white hover:bg-slate-700 transition-all duration-700 shadow-md group-hover/main:shadow-emerald-400'
                                                >
                                                    {socialicons.map((item) => item[items.title])}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <div className='flex min-h-screen justify-center items-center'>
                            <p className='font-semibold text-white/50 text-sm'>Live preview of your portfolio will appear here as you update the form</p>
                        </div>
                    )}

                </div>

            </div>

            {/* Skills Section - Full Screen */}
            {portfolio.skills.length > 0 && (
                <div className='min-h-screen min-w-7xl flex flex-col justify-center items-center py-8 px-4'>

                    <div

                        className='bg-slate-700/50 min-h-[80vh] w-full transition-all duration-700 hover:bg-slate-800 group flex flex-col justify-center items-center p-5 group/main rounded-md'>
                        <h1 className='font-bold text-lg text-white mb-8 transition-all duration-400 group-hover:text-emerald-400'>Skills</h1>
                        <motion.div
                            variants={containerVarients}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className='flex justify-center items-center max-w-4xl flex-wrap gap-6'>
                            {portfolio.skills.length > 0 &&
                                portfolio.skills.map((items, index) => (
                                    <motion.div
                                        variants={itemVariants}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        key={index} className='relative group/icon'>
                                        <div className='text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
                                            {items.title}
                                        </div>
                                        <a
                                            href={items.link}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='w-fit cursor-pointer bg-slate-800 transition-all duration-700 shadow-sm group-hover:shadow-emerald-400 group-hover/main:scale-115 group-hover/icon:bg-slate-900 rounded-full flex justify-center items-center p-3 text-white'
                                        >
                                            {skillicons.map((item) => item[items.title])}
                                        </a>
                                    </motion.div>
                                ))}
                        </motion.div>
                    </div>

                </div>
            )}

            {/* Projects Section - Full Screen */}
            {portfolio.projects.length > 0 && (
                <div className='min-h-screen min-w-7xl flex flex-col justify-center items-center py-8 px-4'>
                    <div className='w-full max-w-6xl bg-gradient-to-r from-blue-800/50 via-indigo-400-800/50 to-blue-900/50 rounded-lg shadow-sm p-6'>
                        <div className='bg-gradient-to-br from-slate-900 via-indigo-400 group to-slate-900 p-5 flex flex-col justify-center items-center rounded-md min-h-[80vh]'>
                            <h1 className='font-bold text-white text-lg mb-8 transition-all duration-700 group-hover:text-emerald-400'>Projects</h1>
                            <div className='flex flex-col gap-6 w-full max-w-4xl overflow-y-auto max-h-[70vh]'>
                                {portfolio.projects.length > 0 &&
                                    portfolio.projects.map((items, index) => (
                                        <div key={index} className='relative group/main bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 flex flex-col justify-center items-center overflow-hidden rounded-md w-full p-6'>
                                            {items.img && (items.img.includes(".jpeg") || items.img.includes(".png") || items.img.includes(".jpg")) && (
                                                <div className='w-full h-60 overflow-hidden rounded-md mb-4'>

                                                    <img
                                                        className='w-full h-full object-cover transition-transform duration-700 group-hover/main:scale-105'
                                                        src={items.img}
                                                        alt={items.title}
                                                    />
                                                </div>
                                            )}
                                            <div className='flex flex-row justify-center items-center w-full'>
                                                <div className='rounded-full'>
                                                    {items.link && (
                                                        <img
                                                            className='h-10 w-10 object-cover transition-all duration-700 group-hover/main:scale-115'
                                                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${formatUrl(items.link)}`}
                                                            alt={`${items.title} favicon`}
                                                        />
                                                    )}
                                                </div>
                                                <div className='flex justify-center items-center flex-1'>
                                                    <h1 className='font-bold text-lg ml-5 text-white transition-all duration-700 group-hover/main:text-emerald-400'>{items.title}</h1>
                                                </div>
                                                <span className='text-sm text-white font-light flex items-center'>
                                                    Active
                                                    <span className='ml-2 h-2 w-2 inline-block group-hover/main:animate-ping rounded-full bg-emerald-400 opacity-75'></span>
                                                </span>
                                            </div>

                                            <h1 className='text-white font-semibold mt-4'>
                                                <span className='flex justify-center items-center cursor-pointer hover:border-b'>
                                                    <ExternalLink />
                                                    <a
                                                        className='text-emerald-400 ml-2'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        href={formatUrl(items.link)}
                                                    >
                                                        Live Demo Here
                                                    </a>
                                                </span>
                                            </h1>

                                            <div className='w-full mb-3 flex flex-col justify-center items-center'>
                                                <hr className='mt-2 mb-2 w-full text-white/50'></hr>
                                                <p className='text-white font-light transition-all duration-700 group-hover/main:text-emerald-400 text-center'>
                                                    {items.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PortFolio