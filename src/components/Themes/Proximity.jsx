import React, { useState, useEffect } from "react";


import { Trash, Plus, ExternalLink, MoveUpRight } from 'lucide-react';

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
import { motion, scale } from 'framer-motion';



    const socialicons = [{ GitHub: <FiGithub className='h-6 w-6  sm:h-8 sm:w-8' />, label: "GitHub" },
    { StackOverflow: <FaStackOverflow className='h-6 w-6 sm:h-8 sm:w-8' />, label: "StackOverflow" },
    { Instagram: <FaInstagram className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Instagram" },
    { Steam: <FaSteam className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Steam" },
    { Twitter: <FaTwitter className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Twitter" }]

    const skillicons = [
        { JavaScript: <IoLogoJavascript className='h-6 w-6 sm:h-8 sm:w-8' />, label: "JavaScript" },
        { HTML: <FaHtml5 className='h-6 w-6 sm:h-8 sm:w-8' />, label: "HTML" },
        { Css: <FaCss3Alt className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Css" },
        { Tailwind: <RiTailwindCssFill className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Tailwind" },
        { Python: <FaPython className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Python" },
        { NodeJs: <FaNodeJs className='h-6 w-6 sm:h-8 sm:w-8' />, label: "NodeJs" },
        { Django: <DiDjango className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Django" },
        { React: <FaReact className='h-6 w-6 sm:h-8 sm:w-8' />, label: "React" },
        { Java: <FaJava className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Java" },
        { GoLang: <FaGolang className='h-6 w-6 sm:h-8 sm:w-8' />, label: "GoLang" },
        { Rust: <FaRust className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Rust" },
        { Numpy: <SiNumpy className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Numpy" },
        { TensorFlow: <SiTensorflow className='h-6 w-6 sm:h-8 sm:w-8' />, label: "TensorFlow" },
        { GitGithub: <FaGitAlt className='h-6 w-6 sm:h-8 sm:w-8' />, label: "GitGithub" },


    ]

function Proximity({ url }) {
  const appUrl = import.meta.env.VITE_BACKEND_API;

  const [portfolio, setPortfolio] = useState({
    username: "",
    profileimg: "",
    description: "",
    tag: "",
    url: "",
    social: [],
    skills: [],
    projects: [],
    experience: []
  });

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(`${appUrl}/api/getportfolio/${url}`);
        const data = await res.json();
        if (res.ok) {
          setPortfolio(data.portfolio);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPortfolio();
  }, [url]);

  return (
   <div className="min-h-screen w-full bg-[#020617] relative">
  {/* Dark Sphere Grid Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#020617",
      backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
      `,
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
    }}
  />
  {/*Top NavBar*/}
     <div className="relative z-5 w-full  flex flex-col justify-center items-center  border-white pt-10 mx-auto">
      <div className='flex justify-between w-full max-w-3/4  flex-row'>
        <h1 className="text-white text-lg font-bold">Portlify</h1>
       {/*Social Icons  */}
        <div className="flex ">
        {portfolio.social?.map((items,index)=>{
          
            const iconObj=socialicons.find(icon=>icon.label===items.title)
            const IconComponent= iconObj?.[items.title]
          return IconComponent? (
            <a
            key={index} 
        href={items.link }
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:scale-110 mx-3 text-white/80 hover:text-white transition-transform"
         > 
            {IconComponent}
            </a>
          ):null
                })}
        </div>
      </div>
                {/*User Description */}
        <div className="w-full flex justify-center items-center text-white border-b-2 pb-5 border-t-2 border-red-400/30 mt-10">
                <div className="w-full flex flex-col justify-center items-center mt-10 max-w-3/4">
                      <div>
                        <img className="rounded-full object-cover shadow-lg shadow-emerald-600 border-emerald-400 border-5 w-[110px] h-[110px]" src={portfolio.profileimg}/>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                       
                        <h1 className="mt-5 text-3xl font-extrabold">
                          Hi I'm  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text ">{portfolio.username.toUpperCase()}</span>
                        </h1>
                        
                        <h2 className="mt-2 text-xl font-bold border-b-2 border-emerald-400/80">{portfolio.tag}</h2>

                        <p className="flex mt-2 w-full text-md text-justify">{portfolio.description}</p>
                      </div>
                </div>
        </div>

        {/* Projects */}
        <div className="w-full mt-5 flex flex-col justify-center items-center">
          <h1 className="border-b-2 border-emerald-400 text-3xl text-white font-extrabold">Projects</h1>
                  <div className="w-full mt-5  flex flex-col justify-center items-center max-w-3/4">
                  
                    {portfolio.projects.map((item,index)=>(
                      <div className="text-white border-2 border-emerald-400 mb-5 w-full ">
                            <img  src={item.img} className="w-full object-cover h-[180px]"/>
                            <div className=" flex flex-col pb-[10px]   items-center border-t-3 w-full  border-red-400 bg-white/30">
                                <h1 className="text-md font-semibold mt-[5px] border-b-2 border-emerald-400">{item.title}</h1>
                                <div className="flex mt-[10px] max-w-1/2 w-full  justify-between ">
                                  <button className="bg-black/50 rounded-full p-2"><a><FiGithub className="h-[30px] w-[30px]"/></a></button>
                                   <button className="bg-black/50 rounded-full p-2"><a><MoveUpRight className="h-[30px] w-[30px]"/></a></button>
                                </div>
                            </div>
                      </div>
                    ))}
                  </div>
        </div>
     </div>

</div>
  );
}

export default Proximity;