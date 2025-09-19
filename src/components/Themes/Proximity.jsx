import React, { useState, useEffect } from "react";


import { Trash, Plus, ExternalLink, MoveUpRight, Link, CircleArrowRight, CircleSmall } from 'lucide-react';

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
import Proximity_Details from "./Proximity_Details";



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

  const [detail,setDetail] = useState(false);
  const [detailValue,setDetailValue]= useState()

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

  function handleDetailsClick(value){
      setDetail((PREV)=>!PREV)
      setDetailValue(value)


  }

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
        <div className="w-full pb-[10px] border-b-2 border-red-400/30 relative mt-5 flex flex-col justify-center items-center">
          <h1 className="border-b-2 border-emerald-400 text-3xl text-white font-extrabold">Projects</h1>
                {detail && detailValue && <div className="fixed inset-0 bg-black/90 h-full   w-full z-20">
                 (<Proximity_Details detailValue={detailValue} handleDetailsClick={handleDetailsClick} detail={detail}/>)
                 </div>}
                  <div className="w-full mt-5  flex flex-col justify-center items-center max-w-3/4">
                  
                    {portfolio.projects.map((item,index)=>(
                      <div className="text-white border-2 border-emerald-400 mb-5 w-full ">
                            
                            <img  src={item.img} className="w-full object-cover h-[180px]"/>
                            <div className=" flex flex-col pb-[10px]   items-center border-t-3 w-full  border-red-400 bg-black/40">
                                <h1 className="text-md font-semibold mt-[5px] border-b-2 border-emerald-400">{item.title}</h1>
                                <div className="flex mt-[10px] max-w-1/2 w-full  justify-between ">
                                  <div className="relative group  inline-block" >
                                    <span className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow  ">Website</span>
                                  <button className="bg-black/50 rounded-full border-1 border-emerald-400 p-2"><a href={item.link}><Link className="h-[25px] w-[25px]"/></a></button>
                                  </div>
                                   <div className="relative group  inline-block" >
                                    <span className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow  ">Details</span>
                                   <button onClick={()=>handleDetailsClick(item)} className="bg-black/50 cursor-pointer rounded-full p-2 border-1 border-emerald-400"><MoveUpRight className="h-[25px] w-[25px]"/></button>

                                  

                                </div>
                                </div>
                            </div>
                      </div>
                    ))}
                  </div>
        </div>

        {/* Experience */}
        <div className="flex mb-10 mt-[20px] w-full max-w-[90%] flex-col justify-center items-center">
           <h1 className="border-b-2 border-emerald-400 text-3xl text-white font-extrabold">Experience</h1>
            <div className="border-l-4 border-dashed w-full  mt-[20px] pl-3 border-emerald-400">
                {
                  portfolio.experience.map((item,index)=>(
                    <div className="flex   mb-[20px]">
                      <span className="text-emerald-400 mt-[5px] mr-[10px]"><CircleArrowRight/></span>
                    <div className="border-1 w-full max-w-[90%] flex flex-col  items-center  border-emerald-400 bg-slate-800 p-2 rounded-md">
                         
                         <div className="flex w-full px-[10px] justify-between items-center">
                              <div className="flex flex-col justify-between">
                                  <h1 className="flex border-b-2 border-emerald-400 font-bold  text-white">{item.title}</h1>
                                  <h2 className="mt-[2px] font-semibold  bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">{item.company}</h2>
                              </div>

                                <div className="ml-[35px] ">
                                  <p className="text-white text-sm  bg-black font-mono p-2 rounded-lg  border-l-2 border-emerald-400 ">{item.startdate}-{!item.current? (item.endDate):("Present")}</p>
                                  <p className="text-sm mt-[5px] font-semibold   bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">{item.location}</p>
                                </div>
                          </div>

<div className=" w-full max-w-[95%] mt-[10px] bg-white relative">
  {/* Teal Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)
      `,
      backgroundSize: "100% 100%",
    }}
  />
  
  <div className="relative   w-full max-w-[90%] rounded-md flex justify-center items-center  mt-[20px] mb-[5px]">
                                
                               <p className="p-2"> {item.highlight[0].split(",").map((item,index)=>(
                                <p className="flex text-sm ">
                                  < CircleSmall className="mr-[5px] text-emerald-800"/><span className="font-mono">{item}</span>
                                </p>
                               ))}</p>
                            </div>
</div>
                            
                      </div>
                      </div>
                  ))
                }
            </div>
        </div>
     </div>

</div>
  );
}

export default Proximity;