import React, { useState, useEffect } from "react";
import { ExternalLink, MoveUpRight, Link, CircleArrowRight, CircleChevronRight } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';
import Proximity_Details from "./Proximity_Details";

const socialicons = [
    { GitHub: <FiGithub className='h-6 w-6  sm:h-8 sm:w-8' />, label: "GitHub" },
    { StackOverflow: <FaStackOverflow className='h-6 w-6 sm:h-8 sm:w-8' />, label: "StackOverflow" },
    { Instagram: <FaInstagram className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Instagram" },
    { Steam: <FaSteam className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Steam" },
    { Twitter: <FaTwitter className='h-6 w-6 sm:h-8 sm:w-8' />, label: "Twitter" }
];

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
];

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

    const [detail, setDetail] = useState(false);
    const [detailValue, setDetailValue] = useState();

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

    function handleDetailsClick(value) {
        setDetail((PREV) => !PREV);
        setDetailValue(value);
    }

    return (
        <div className="min-h-screen w-full bg-[#020617] relative">
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
            <div className="relative z-5 w-full flex flex-col justify-center items-center border-white pt-10 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='flex justify-between w-full max-w-3/4 flex-row'
                >
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-lg font-bold"
                    >
                        Portlify
                    </motion.h1>
                    <div className="flex">
                        {portfolio.social?.map((items, index) => {
                            const iconObj = socialicons.find(icon => icon.label === items.title);
                            const IconComponent = iconObj?.[items.title];
                            return IconComponent ? (
                                <motion.a
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    href={items.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 mx-3 text-white/80 hover:text-white transition-transform"
                                >
                                    {IconComponent}
                                </motion.a>
                            ) : null;
                        })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center items-center text-white border-b-2 pb-5 border-t-2 border-red-400/30 mt-10"
                >
                    <div className="w-full flex flex-col justify-center items-center mt-10 max-w-3/4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img className="rounded-full object-cover shadow-lg shadow-emerald-600 border-emerald-400 border-5 w-[110px] h-[110px]" src={portfolio.profileimg} alt="Profile" />
                        </motion.div>
                        <div className="flex flex-col justify-center items-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mt-5 text-3xl font-extrabold"
                            >
                                Hi I'm <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text ">{portfolio.username.toUpperCase()}</span>
                            </motion.h1>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mt-2 text-xl font-bold border-b-2 border-emerald-400/80"
                            >
                                {portfolio.tag}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex mt-2 w-full text-md text-justify"
                            >
                                {portfolio.description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full pb-[10px] border-b-2 border-red-400/30 relative mt-5 flex flex-col justify-center items-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="border-b-2 border-emerald-400 text-3xl text-white font-extrabold"
                    >
                        Projects
                    </motion.h1>
                    <AnimatePresence>
                        {detail && detailValue &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 bg-black/90 h-full w-full z-20"
                            >
                                <Proximity_Details detailValue={detailValue} handleDetailsClick={handleDetailsClick} detail={detail} />
                            </motion.div>
                        }
                    </AnimatePresence>
                    <div className="w-full mt-5 flex flex-col justify-center items-center max-w-3/4">
                        {portfolio.projects.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="text-white border-2 border-emerald-400 mb-5 w-full"
                            >
                                <img src={item.img} className="w-full object-cover h-[180px]" alt={item.title} />
                                <div className="flex flex-col pb-[10px] items-center border-t-3 w-full border-red-400 bg-black/40">
                                    <motion.h1
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="text-md font-semibold mt-[5px] border-b-2 border-emerald-400"
                                    >
                                        {item.title}
                                    </motion.h1>
                                    <div className="flex mt-[10px] max-w-1/2 w-full justify-between">
                                        <div className="relative group inline-block">
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow">Website</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="bg-black/50 rounded-full border-1 border-emerald-400 p-2"
                                            >
                                                <a href={item.link}><Link className="h-[25px] w-[25px]" /></a>
                                            </motion.button>
                                        </div>
                                        <div className="relative group inline-block">
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow">Details</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDetailsClick(item)}
                                                className="bg-black/50 cursor-pointer rounded-full p-2 border-1 border-emerald-400"
                                            >
                                                <MoveUpRight className="h-[25px] w-[25px]" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex pb-[20px] mb-10 mt-[20px] w-full max-w-[90%] flex-col justify-center items-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="border-b-2 border-emerald-400 text-3xl text-white font-extrabold"
                    >
                        Experience
                    </motion.h1>
                    <div className="border-l-4 border-dashed w-full mt-[20px] pl-3 border-emerald-400">
                        {portfolio.experience.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="flex mb-[20px]"
                            >
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="text-emerald-400 mt-[5px] mr-[10px]"
                                >
                                    <CircleArrowRight />
                                </motion.span>
                                <motion.div
                                    className="border-1 w-full max-w-[90%] flex flex-col items-center border-emerald-400 bg-slate-800 p-2 rounded-md"
                                >
                                    <div className="flex w-full px-[10px] justify-between items-center">
                                        <div className="flex flex-col justify-between">
                                            <motion.h1
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 }}
                                                className="flex border-b-2 border-emerald-400 font-bold text-white"
                                            >
                                                {item.title}
                                            </motion.h1>
                                            <motion.h2
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 }}
                                                className="mt-[2px] font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text"
                                            >
                                                {item.company}
                                            </motion.h2>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 }}
                                            className="ml-[35px]"
                                        >
                                            <p className="text-white text-sm bg-black font-mono p-2 rounded-lg border-l-2 border-emerald-400">{item.startdate}-{!item.current ? (item.endDate) : ("Present")}</p>
                                            <p className="text-sm mt-[5px] font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">{item.location}</p>
                                        </motion.div>
                                    </div>

                                    <div className="w-full max-w-[95%] mt-[10px] bg-white relative">
                                        <div
                                            className="absolute inset-0 z-0"
                                            style={{
                                                backgroundImage: `
                                                    radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #14b8a6 100%)
                                                `,
                                                backgroundSize: "100% 100%",
                                            }}
                                        />
                                        <div className="relative w-full max-w-[90%] rounded-md flex flex-col justify-center mt-[20px] mb-[5px]">
                                            {item.highlight[0].split(",").map((highlight, highlightIndex) => (
                                                <motion.p
                                                    key={highlightIndex}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.1 * highlightIndex }}
                                                    className="flex m-2 text-sm"
                                                >
                                                    <CircleChevronRight className="mr-[5px] h-[20px] w-[20px] text-emerald-800" />
                                                    <span className="font-mono">{highlight}</span>
                                                </motion.p>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full pb-[20px] mb-[20px] border-t-2 flex justify-center items-center border-red-400/30"
                >
                    <div className="max-w-[90%] mt-[20px] flex flex-col justify-center items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl text-white border-b-2 border-emerald-400 font-extrabold"
                        >
                            Skills
                        </motion.h1>

                        <div className="grid grid-cols-5 gap-4 mt-4">
                            {portfolio.skills.map((item, index) => {
                                const skill = skillicons.find((value) => value.label === item.title);
                                const skillComponent = skill?.[item.title];

                                return skillComponent ? (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.1,
                                        }}
                                        className="text-white m-[10px] flex flex-col justify-center items-center"
                                    >
                                        {skillComponent}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                            className="text-sm mt-[10px] border-b-2 p-[5px] border-emerald-400"
                                        >
                                            {skill.label}
                                        </motion.p>
                                    </motion.div>
                                ) : null;
                            })}
                        </div>
                    </div>
                </motion.div>

                <motion.footer
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full border-t-2 border-red-400/30 bg-black/30 text-white py-8"
                >
                    <div className="max-w-[90%] mx-auto w-full">
                        <div className="hidden md:flex justify-between items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col items-start"
                            >
                                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                                    Portlify
                                </h1>
                                <p className="text-sm text-gray-400">Crafted with ❤️ by Ravi Bhusal</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center text-sm text-gray-400"
                            >
                                <p className="mb-2">© {new Date().getFullYear()} Portlify. All rights reserved.</p>
                                <p>
                                    Built with <span className="text-emerald-400 font-semibold">Proximity</span>-
                                    <span className="text-cyan-400 font-semibold">Theme</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex space-x-6"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.2 }}
                                    href="https://github.com/Bhusal-Ravi/Portify"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
                                >
                                    <FiGithub className="h-6 w-6 text-white/80 hover:text-emerald-400" />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.2 }}
                                    href="https://www.instagram.com/bhusalravi/#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
                                >
                                    <FaInstagram className="h-6 w-6 text-white/80 hover:text-pink-500" />
                                </motion.a>
                            </motion.div>
                        </div>

                        <div className="md:hidden space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center"
                            >
                                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                                    Portlify
                                </h1>
                                <p className="text-sm text-gray-400 mt-1">Crafted with ❤️ by Ravi Bhusal</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center text-sm text-gray-400"
                            >
                                <p className="mb-2">© {new Date().getFullYear()} Portlify. All rights reserved.</p>
                                <p>
                                    Built with <span className="text-emerald-400 font-semibold">Proximity</span>-
                                    <span className="text-cyan-400 font-semibold">Theme</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex justify-center space-x-6"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.2 }}
                                    href="https://github.com/Bhusal-Ravi/Portify"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
                                >
                                    <FiGithub className="h-6 w-6 text-white/80 hover:text-emerald-400" />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.2 }}
                                    href="https://www.instagram.com/bhusalravi/#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:scale-110 transition-transform"
                                >
                                    <FaInstagram className="h-6 w-6 text-white/80 hover:text-pink-500" />
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}

export default Proximity;