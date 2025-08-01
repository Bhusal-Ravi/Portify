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
    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-slate-900 via-indigo-400 to-slate-900 flex flex-col justify-start items-center py-8 px-4'>
            <div className='w-5xl bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50  rounded-lg shadow-sm  p-6'>

                <div className='bg-slate-100/  rounded-lg p-6 h-full flex flex-col justify-start'>

                    <div className='flex flex-col'>
                        {portfolio.username ? (
                            <div className='bg-slate-700/50 group/main transition-colors duration-700 hover:bg-slate-800 flex flex-col items-center font-semibold rounded-md px-4 py-4 w-full text-white'>

                                {/* Row: Image + Name */}
                                {portfolio.username && (
                                    <div className='flex flex-col items-center mb-4'>
                                        <div className='h-25 w-25 flex justify-center  border-2 border-emerald-400 shadow-lg transition-all duration-700  group-hover/main:shadow-emerald-800 rounded-full items-center mr-5 mb-2 overflow-hidden'>
                                            <img
                                                className='h-20 w-20  rounded-full object-cover transition-all duration-700 group-hover/main:scale-115'
                                                src='https://i.imgur.com/g3RTCiv.jpeg'
                                                alt='Profile'
                                            />
                                        </div>
                                        <h1 className='transition-all duration-700 text-white group-hover/main:text-emerald-400 group-hover/main:scale-115 text-lg'>
                                            <span>Hi, I'm <span className='text-emerald-400'>{portfolio.username}</span></span>
                                        </h1>
                                        <p className='font-extralight text-sm text-white/70 transition-all duration-700 group-hover/main:text-emerald-400/70'>{portfolio.tag}</p>
                                    </div>
                                )}

                                {/* Socials Below */}
                                {portfolio.social.length > 0 && (
                                    <div className='flex flex-col justify-center items-center flex-wrap gap-2'>
                                        <h1 className='font-light mr-2 text-emerald-400'>Connect With Me</h1>
                                        <div className='flex gap-4'>
                                            {portfolio.social.length > 0 &&

                                                portfolio.social.map((items, index) => (
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
                                    </div>
                                )}



                                <hr className='w-full mt-5 opacity-50 transition duration-700  group-hover/main:text-emerald-400'></hr>


                                <div className='w-full flex justify-center items-center mt-5'>
                                    <p className='break-words flex  overflow-auto text-md transition-all duration-700 group-hover/main:text-emerald-400 font-light md:text-base'>
                                        {portfolio.description || (
                                            <span className='text-slate-400 italic'>No description provided</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : (<div className='flex min-h-screen justify-center items-center'><p className='font-semibold text-black/50 text-sm '>Live preview of your portfolio will appear here as you update the form</p></div>)}
                    </div>




                    {/*Skills*/}
                    {portfolio.skills.length > 0 && (
                        <div className='bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 group flex flex-col justify-center items-center mt-4 p-5 group/main rounded-md'>
                            <h1 className='font-bold text-lg text-white mb-2 transition-all duration-400 group-hover:text-emerald-400'>Skills</h1>
                            <div className='flex justify-center items-center flex-wrap gap-2'>

                                {portfolio.skills.length > 0 &&
                                    portfolio.skills.map((items, index) => (
                                        <div key={index} className='relative group/icon'>

                                            <div className='text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10'>
                                                {items.title}
                                            </div>

                                            <a
                                                href={items.link}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='w-fit cursor-pointer bg-slate-800 transition-all duration-700 m-1 shadow-sm group-hover:shadow-emerald-400  group-hover/main:scale-115 group-hover/icon:bg-slate-900 rounded-full flex justify-center items-center p-2 text-white '
                                            >
                                                {skillicons.map((item) => item[items.title])}
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}



                    {/*Projects*/}
                    {portfolio.projects.length > 0 && (
                        <div className='bg-gradient-to-br from-slate-900 via-indigo-400 group to-slate-900 mt-5 p-2 flex flex-col justify-center items-center rounded-md'>
                            <h1 className='font-bold text-white text-lg transition-all duration-700 group-hover:text-emerald-400'>Projects</h1>
                            {portfolio.projects.length > 0 &&
                                portfolio.projects.map((items, index) => (
                                    <div className=' relative group/main m-3 bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 flex  flex-col justify-center items-center overflow-hidden rounded-md w-full p-3'>
                                        <div className=' flex flex-row justify-center items-center'>
                                            <div className='rounded-full  '>
                                                {items.link && (<img
                                                    className='h-10 w-10 object-cover transition-all duration-700 group-hover/main:scale-115'
                                                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${formatUrl(items.link)}`}


                                                />)}
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                <h1 className='font-bold text-lg ml-5 text-white transition-all duration-700 group-hover/main:text-emerald-400'>{items.title}</h1>
                                                <span className='absolute right-5  justify-right text-sm text-white font-light'>Active<span className='ml-4 h-2 w-2 inline-block  group-hover/main:animate-ping rounded-full bg-emerald-400 opacity-75'></span></span>
                                            </div>
                                        </div>
                                        <h1 className='text-white font-semibold mt-4'> <span className='flex justify-center items-center cursor-pointer  hover:border-b'>
                                            <ExternalLink />
                                            <a
                                                className=' text-emerald-400 ml-2'
                                                target='blank'
                                                rel='noopener noreferrer'
                                                href={formatUrl(items.link)} >
                                                DEMO
                                            </a>

                                        </span></h1>

                                        <div className='w-full mb-3 flex flex-col justify-center items-center'>
                                            <hr className='mt-2 mb-2 w-full text-white/50'></hr>

                                            <p className='text-white font-light transition-all duration-700 group-hover/main:text-emerald-400'>
                                                {items.description}
                                            </p>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PortFolio