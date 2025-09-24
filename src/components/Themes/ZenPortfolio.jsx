import React, { useState, useEffect } from "react";
import { ExternalLink, Mail, MapPin, Calendar, ChevronRight } from 'lucide-react';
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

const socialicons = [
    { GitHub: <FiGithub className='h-5 w-5' />, label: "GitHub" },
    { StackOverflow: <FaStackOverflow className='h-5 w-5' />, label: "StackOverflow" },
    { Instagram: <FaInstagram className='h-5 w-5' />, label: "Instagram" },
    { Steam: <FaSteam className='h-5 w-5' />, label: "Steam" },
    { Twitter: <FaTwitter className='h-5 w-5' />, label: "Twitter" }
];

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
];

// Modal Component for Project Details
const ProjectModal = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                        >
                            ×
                        </button>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-light text-gray-900 mb-4">{project.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            Visit Project <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

function ZenPortfolio({ url }) {
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

    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95"
            >
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-light text-gray-900">Portfolio</h1>
                    <div className="flex gap-4">
                        {portfolio.social?.map((item, index) => {
                            const iconObj = socialicons.find(icon => icon.label === item.title);
                            const IconComponent = iconObj?.[item.title];
                            return IconComponent ? (
                                <motion.a
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {IconComponent}
                                </motion.a>
                            ) : null;
                        })}
                    </div>
                </div>
            </motion.header>

            <div className="max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-20 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <img
                            src={portfolio.profileimg}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                        />
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
                    >
                        {portfolio.username}
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-600 font-light mb-8"
                    >
                        {portfolio.tag}
                    </motion.p>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-700 leading-relaxed max-w-2xl mx-auto"
                    >
                        {portfolio.description}
                    </motion.p>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-20"
                >
                    <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Selected Work</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {portfolio.projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                    <div className="overflow-hidden">
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-light text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
                                            <span className="text-sm">View project</span>
                                            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Experience Section */}
                {portfolio.experience.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="py-20"
                    >
                        <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Experience</h2>
                        <div className="space-y-8">
                            {portfolio.experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg p-8 shadow-sm"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-light text-gray-900 mb-1">{exp.title}</h3>
                                            <p className="text-gray-600 mb-2">{exp.company}</p>
                                            <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-0">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {exp.location}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {exp.startdate} - {exp.current ? "Present" : exp.endDate}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {exp.highlight[0]?.split(',').map((highlight, idx) => (
                                            <p key={idx} className="text-gray-700 text-sm leading-relaxed">
                                                • {highlight.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Skills Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-20"
                >
                    <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Skills</h2>
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-8 justify-items-center">
                        {portfolio.skills.map((skill, index) => {
                            const skillObj = skillicons.find(s => s.label === skill.title);
                            const SkillIcon = skillObj?.[skill.title];
                            return SkillIcon ? (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex flex-col items-center group"
                                >
                                    <div className="p-4 bg-white rounded-lg shadow-sm group-hover:shadow-lg transition-shadow mb-2">
                                        <div className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                            {SkillIcon}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-600 text-center">{skill.title}</span>
                                </motion.div>
                            ) : null;
                        })}
                    </div>
                </motion.section>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="py-12 text-center border-t border-gray-100"
                >
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} {portfolio.username}. Built with Zen theme.
                    </p>
                </motion.footer>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}

export default ZenPortfolio;