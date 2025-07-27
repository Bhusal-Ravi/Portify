import React, { useState } from 'react'
import { Trash, Plus } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
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


function Form() {

    const { url } = useParams();
    const socialicons = [{ icon: <FiGithub />, label: "GitHub" },
    { icon: <FaStackOverflow />, label: "Stack Overflow" },
    { icon: <FaInstagram />, label: "Instagram" },
    { icon: <FaSteam />, label: "Steam" },
    { icon: <FaTwitter />, label: "Twitter" }]

    const skillicons = [
        { icon: <IoLogoJavascript />, label: "JavaScript" },
        { icon: <FaHtml5 />, label: "HTML" },
        { icon: <FaCss3Alt />, label: "Css" },
        { icon: <RiTailwindCssFill />, label: "Tailwind" },
        { icon: <FaPython />, label: "Python" },
        { icon: <FaNodeJs />, label: "NodeJs" },
        { icon: <DiDjango />, label: "Django" },
        { icon: <FaReact />, label: "React" },
        { icon: <FaJava />, label: "Java" },
        { icon: <FaGolang />, label: "GoLang" },
        { icon: <FaRust />, label: "Rust" },
        { icon: <SiNumpy />, label: "Numpy" },
        { icon: <SiTensorflow />, label: "TensorFlow" },
        { icon: <FaGitAlt />, label: "Git & Github" },

    ]
    const [socialForm, setSocialForm] = useState([])
    const [skillForm, setSkillForm] = useState([])



    const { register, control, watch, handleSubmit, formState: { error } } = useForm({
        defaultValues: {
            projects: [],
            social: [],
            skills: []
        }
    });
    const { fields: projectsFileds, append: appendProject, remove: removeProject } = useFieldArray({
        control,
        name: "projects"
    })

    const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
        control,
        name: "social"
    })

    const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
        control,
        name: "skills"
    })

    function handleProjectAppend() {
        console.log("append")
        appendProject({ title: "", description: "", link: "" });
    }
    function handleSocialAppend(social) {
        console.log("Appending social:", social);
        if (!socialForm.includes(social.label)) {
            setSocialForm((prev) => [...prev, social.label])
            appendSocial({ title: social.label, icon: social.icon, link: "" })
        }
    }

    function handleSkillAppend(skill) {
        console.log(skill);
        if (!skillForm.includes(skill.label)) {
            setSkillForm((prev) => [...prev, skill.label]);
            appendSkill({ title: skill.label, icon: skill.icon })
        }
    }
    function handleProjectRemove(index) {
        removeProject(index)
    }

    function onSubmit(data) {
        console.log(data)
    }

    return (
        <div className='w-full min-h-screen bg-slate-50 flex flex-col justify-start items-center py-8 px-4'>
            <div className='max-w-7xl w-full'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-slate-800 mb-3'>Create Your Portfolio</h1>
                    <p className='text-slate-600 text-lg'>
                        Your portfolio will be available at: <span className='text-emerald-600 font-semibold'>www.xyz.com/{url}</span>
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className='grid grid-cols-1 xl:grid-cols-7 gap-6'>

                    {/* Left Sidebar - Selection Panel */}
                    <div className='xl:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4'>
                        <h2 className='text-lg font-semibold text-slate-700 mb-4 text-center'>Select Items</h2>

                        {/* Socials Section */}
                        <div className='bg-slate-600 p-4 rounded-lg mb-6 shadow-sm'>
                            <h3 className='text-lg font-semibold text-white mb-4 text-center'>Socials</h3>
                            <div className='flex flex-wrap justify-center gap-3'>
                                {socialicons.map((items, index) => (
                                    <div
                                        key={index}
                                        className='group relative flex justify-center items-center'
                                    >
                                        <div className="text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                            {items.label}
                                        </div>
                                        <button
                                            onClick={() => handleSocialAppend(items)}
                                            className='bg-slate-800 rounded-full p-3 hover:bg-slate-700 transition-all duration-200 hover:scale-105 text-white shadow-md'
                                        >
                                            {items.icon}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className='bg-slate-600 p-4 rounded-lg shadow-sm'>
                            <h3 className='text-lg font-semibold text-white mb-4 text-center'>Skills</h3>
                            <div className='flex flex-wrap justify-center gap-3'>
                                {skillicons.map((items, index) => (
                                    <div
                                        key={index}
                                        className='group relative flex justify-center items-center'
                                    >
                                        <div className="text-xs bg-slate-900/90 text-white px-2 py-1 rounded-md font-medium absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                            {items.label}
                                        </div>
                                        <button
                                            onClick={() => handleSkillAppend(items)}
                                            className='bg-slate-800 rounded-full p-3 hover:bg-slate-700 transition-all duration-200 hover:scale-105 text-white shadow-md'
                                        >
                                            {items.icon}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center - Form Section */}
                    <div className='xl:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

                            {/* About You Section */}
                            <div className='bg-slate-600 rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-bold text-white text-center mb-6'>About You</h2>

                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-white font-medium mb-2'>Your Full Name</label>
                                        <input
                                            type='text'
                                            placeholder='Bruce Wayne'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                            {...register("username", { required: true, min: 2 })}
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white font-medium mb-2'>Your Description</label>
                                        <textarea
                                            placeholder='Tell us about yourself...'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200 resize-none'
                                            rows={4}
                                            {...register("description", { required: true, max: 240 })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Socials Section */}
                            {socialFields.length > 0 && (
                                <div className='bg-slate-600 rounded-lg p-6 shadow-sm'>
                                    <h2 className='text-xl font-bold text-white text-center mb-6'>Social Links</h2>
                                    <div className='space-y-4'>
                                        {socialFields.map((items, index) => (
                                            <div key={index} className='bg-slate-700 p-4 rounded-lg'>
                                                <div className='flex items-center justify-between mb-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-white text-lg'>{items.icon}</span>
                                                        <span className='text-white font-medium'>{items.title}</span>
                                                    </div>
                                                    <button
                                                        type='button'
                                                        className='text-red-400 hover:text-red-300 transition-colors duration-200 hover:scale-110'
                                                        onClick={() => {
                                                            setSocialForm(socialFields.filter((item) => (item !== `${items.title}`)))
                                                            removeSocial(index)
                                                        }}
                                                    >
                                                        <Trash className='w-5 h-5' />
                                                    </button>
                                                </div>
                                                <input
                                                    type='text'
                                                    placeholder={`Enter your ${items.title} profile URL...`}
                                                    className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                    {...register(`social.${index}.link`, { required: true })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Section */}
                            {skillFields.length > 0 && (
                                <div className='bg-slate-600 rounded-lg p-6 shadow-sm'>
                                    <h2 className='text-xl font-bold text-white text-center mb-6'>Your Skills</h2>
                                    <div className='flex flex-wrap justify-center gap-3'>
                                        {skillFields.map((item, index) => (
                                            <div
                                                key={index}
                                                className='bg-slate-800 rounded-full text-white py-3 px-4 flex items-center gap-3 hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg'
                                            >
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-lg'>{item.icon}</span>
                                                    <span className='font-medium text-sm'>{item.title}</span>
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        setSkillForm(skillForm.filter(skill => skill !== item.title));
                                                        removeSkill(index);
                                                    }}
                                                    className='text-red-400 hover:text-red-300 transition-colors duration-200'
                                                >
                                                    <Trash className='w-4 h-4' />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects Section */}
                            <div className='bg-slate-600 rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-bold text-white text-center mb-6'>Projects</h2>

                                <div className='space-y-6'>
                                    {projectsFileds.map((item, index) => (
                                        <div key={index} className='bg-slate-700 p-5 rounded-lg'>
                                            <div className='flex items-center justify-between mb-4'>
                                                <h3 className='text-lg font-semibold text-white'>Project {index + 1}</h3>
                                                <button
                                                    type='button'
                                                    onClick={() => handleProjectRemove(index)}
                                                    className='text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110'
                                                >
                                                    <Trash className='w-5 h-5' />
                                                </button>
                                            </div>

                                            <div className='space-y-4'>
                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Project Name</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Enter project name...'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                        {...register(`projects.${index}.title`, { required: true, min: 2 })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Project Link</label>
                                                    <input
                                                        type='text'
                                                        placeholder='https://github.com/yourproject'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                        {...register(`projects.${index}.link`, { required: true, min: 2 })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Project Description</label>
                                                    <textarea
                                                        placeholder='Describe your project...'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200 resize-none'
                                                        rows={3}
                                                        {...register(`projects.${index}.description`, { required: true, min: 2, max: 100 })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex justify-center mt-6'>
                                        <button
                                            type='button'
                                            onClick={handleProjectAppend}
                                            className='bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                                        >
                                            <Plus className='w-8 h-8' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='flex justify-center pt-4'>
                                <button
                                    type='submit'
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                                >
                                    Create Portfolio
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Sidebar - Preview Section */}
                    <div className='xl:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
                        <h2 className='text-xl font-semibold text-slate-700 text-center mb-6'>Live Preview</h2>
                        <div className='bg-slate-100 rounded-lg p-6 min-h-96 flex items-center justify-center'>
                            <p className='text-slate-500 text-center'>Your portfolio preview will appear here as you fill out the form</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form