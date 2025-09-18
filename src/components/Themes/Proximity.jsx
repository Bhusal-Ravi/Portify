import React, { useState, useEffect } from "react";


import { Trash, Plus, ExternalLink } from 'lucide-react';

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

<div className="w-full flex justify-center items-center text-white border-t-2 border-red-400/30 mt-10">
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
     </div>

</div>
  );
}

export default Proximity;
