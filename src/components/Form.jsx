import React, { useEffect, useState } from 'react'
import { Trash, Plus, ExternalLink } from 'lucide-react';
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
    const [backendMessage, setBackendMessage] = useState("")

    async function onSubmit(data) {
        try {
            console.log(data)
            const response = await fetch(`http://localhost:5001/api/setportfolio/${url}`, {
                method: 'POST',
                credentials: "include",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            })

            const result = await response.json();
            console.log(result)

            setBackendMessage(result.message)


        } catch (error) {
            console.log(error)
        }
    }


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
    const [socialForm, setSocialForm] = useState([])
    const [skillForm, setSkillForm] = useState([])






    const { register, control, watch, handleSubmit, formState: { errors } } = useForm({
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


    {/*Watch*/ }
    const username = watch("username")
    const description = watch("description")
    const projects = watch("projects");
    const socials = watch("social")
    const skills = watch("skills")
    const tag = watch("tag")

    function handleProjectAppend() {
        console.log("append")
        appendProject({ title: "", description: "", link: "" });
    }
    function handleSocialAppend(social) {
        console.log("Appending social:", social);
        if (!socialForm.includes(social.label)) {
            setSocialForm((prev) => [...prev, social.label])
            appendSocial({ title: social.label, link: "" })
        }
    }

    function handleSkillAppend(skill) {
        console.log(skill);
        if (!skillForm.includes(skill.label)) {
            setSkillForm((prev) => [...prev, skill.label]);
            appendSkill({ title: skill.label })
        }
    }
    function handleProjectRemove(index) {
        removeProject(index)
    }



    function formatUrl(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://"))
            return `http://${url}`

        return url
    }
    function checkSocialUrl(link, items) {
        const title = items.title.toLowerCase();
        const lowerLink = link.toLowerCase();

        if (lowerLink.includes(title)) {
            return true;
        } else return false
    }

    function checkProjectUrl(link) {
        if (link.includes("https") || link.includes("http")) {
            return true
        } else return false
    }


    function profileUrlCheck(value) {
        if (value.includes("imgur.com")) {
            return true
        } else return false
    }





    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-slate-900 via-indigo-400 to-slate-900 flex flex-col justify-start items-center py-8 px-4'>
            <div className='max-w-7xl w-full'>
                {/* Header Section */}
                <div className='text-center mb-8 flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold text-white mb-3'>Create Your Portfolio</h1>

                    <div className='bg-slate-800/40 backdrop-blur-3xl p-2 w-fit max-w-[600px] flex justify-center  items-center rounded-xl '>
                        <p className='text-white text-lg '>
                            Your portfolio will be available at: <span className='text-emerald-600 font-semibold'>www.xyz.com/{url}</span>
                        </p>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className='grid grid-cols-1 xl:grid-cols-7 gap-6'>

                    {/* Left Sidebar - Selection Panel */}
                    <div className='xl:col-span-1 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50 rounded-lg shadow-lg transition-all duration-400 hover:shadow-blue-500 p-4'>
                        <h2 className='text-lg font-semibold text-white  drop-shadow-black mb-4 text-center'>Select Items</h2>

                        {/* Socials Section */}
                        <div className='bg-slate-600/50 p-4 rounded-lg mb-6 shadow-md transition-all duration-400 hover:scale-105 hover:shadow-white'>
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
                                            {items[items.label]}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className='bg-slate-600/50 p-4 rounded-lg shadow-md transiton-all duration-400 hover:scale-105 hover:shadow-white'>
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
                                            {items[items.label]}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center - Form Section */}
                    <div className='xl:col-span-3 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50  rounded-lg shadow-lg  transition-all duration-400 hover:shadow-blue-500  p-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

                            {/* About You Section */}
                            <div className='bg-slate-600/50 transition-all duration-400 hover:scale-105 hover:shadow-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-bold text-white text-center mb-6'>About You</h2>

                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-white font-medium mb-2'>Your Full Name</label>
                                        <input
                                            type='text'
                                            placeholder='Bruce Wayne'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                            {...register("username", {
                                                required: "This field is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name must be at least 2 characters"
                                                }
                                            })}
                                        />
                                        {errors.username && (
                                            <div className='mt-2'>
                                                <span className='font-thin text-md text-red-400'>
                                                    {errors.username.message}
                                                </span>
                                            </div>
                                        )}
                                        <label className='block text-white font-medium mb-2 mt-2'>Give Yourself A Title </label>
                                        <input
                                            type='text'
                                            placeholder='Full Stack Developer...'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                            {...register("tag", {
                                                required: "This field is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "tag must be at least 2 characters"
                                                }
                                            })}
                                        />
                                        {errors.tag && (
                                            <div className='mt-2'>
                                                <span className='font-thin text-md text-red-400'>
                                                    {errors.tag.message}
                                                </span>
                                            </div>
                                        )}

                                        <label className='block text-white font-medium mb-2 mt-2'>Image Link</label>
                                        <input
                                            type='text'
                                            placeholder='Upload Your Image in imgur.com -> Provide the link to the image'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                            {...register("profileimg", {
                                                required: "This field is required",
                                                validate: (value) => profileUrlCheck(value) || "please provide a valid imgur link"
                                            })}
                                        />
                                        {errors.profile && (
                                            <div className='mt-2'>
                                                <span className='font-thin text-md text-red-400'>
                                                    {errors.profile.message}
                                                </span>
                                            </div>
                                        )}

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
                                <div className='bg-slate-600/50 rounded-lg p-6 shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-white'>
                                    <h2 className='text-xl font-bold text-white text-center mb-6'>Social Links</h2>
                                    <div className='space-y-4'>
                                        {socialFields.map((items, index) => (
                                            <div key={index} className='bg-slate-700 p-4 rounded-lg'>
                                                <div className='flex items-center justify-between mb-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='text-white text-lg'>{socialicons.map((item) => item[items.title])}</span>
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
                                                    {...register(`social.${index}.link`, {
                                                        required: "This field is required",
                                                        validate: (value) => checkSocialUrl(value, items) || "Please enter a valid URL"

                                                    })}

                                                />
                                                {errors.social?.[index]?.link && (
                                                    <div className='mt-2'>
                                                        <span className='font-thin text-red-400 text-md'>
                                                            {errors.social[index].link.message}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Section */}
                            {skillFields.length > 0 && (
                                <div className='bg-slate-600/50 rounded-lg p-6 shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-white'>
                                    <h2 className='text-xl font-bold text-white text-center mb-6'>Your Skills</h2>
                                    <div className='flex flex-wrap justify-center gap-3'>
                                        {skillFields.map((item, index) => (
                                            <div
                                                key={index}
                                                className='bg-slate-800 rounded-full text-white py-3 px-4 flex items-center gap-3 hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg'
                                            >
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-lg'>{skillicons.map((items) => items[item.title])}</span>
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
                            <div className='bg-slate-600/50 rounded-lg p-6 shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-white'>
                                <h2 className='text-xl font-bold text-white text-center mb-6'>Projects</h2>

                                <div className='space-y-6'>
                                    {projectsFileds.map((item, index) => (
                                        <div key={index} className='bg-slate-700 p-5 rounded-lg'>
                                            <div className='flex items-center justify-between mb-4'>
                                                <h3 className='text-lg font-thin text-white'>Project {index + 1}</h3>
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
                                                        {...register(`projects.${index}.title`, { required: "This field is required", minLength: { value: 5, message: "Minimum length is 5" } })}
                                                    />
                                                </div>


                                                {errors.projects?.[index]?.title && (
                                                    <div className='mt-2'>
                                                        <span className='text-md  font-thin text-red-400'>
                                                            {errors.projects[index].title.message}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Project ScreenShot Link</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Upload Screen On Imgur(Link Input)...'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                        {...register(`projects.${index}.img`)}
                                                    />
                                                </div>


                                                {errors.projects?.[index]?.img && (
                                                    <div className='mt-2'>
                                                        <span className='text-md  font-thin text-red-400'>
                                                            {errors.projects[index].img.message}
                                                        </span>
                                                    </div>
                                                )}

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Project Link</label>
                                                    <input
                                                        type='text'
                                                        placeholder='https://github.com/yourproject'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                        {...register(`projects.${index}.link`, { required: "This field is required", minLength: { value: 2, message: "Minimum length is 2" }, validate: (value) => checkProjectUrl(value) || "Please enter complete url including [https/http] for example [ https://www.xyz.com ]" })}
                                                    />
                                                    {errors.projects?.[index]?.link && (
                                                        <div className='mt-2'>
                                                            <span className='text-md  font-thin text-red-400'>
                                                                {errors.projects[index].link.message}
                                                            </span>
                                                        </div>
                                                    )}
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

                    <div className='xl:col-span-3 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50  rounded-lg shadow-sm  p-6'>
                        <h2 className='text-xl text-white font-semibold   text-center mb-6'>Live Preview</h2>
                        <div className='bg-slate-100/  rounded-lg p-6 h-full flex flex-col justify-start'>

                            <div className='flex flex-col'>
                                {username ? (
                                    <div className='bg-slate-700/50 group/main transition-colors duration-700 hover:bg-slate-800 flex flex-col items-center font-semibold rounded-md px-4 py-4 w-full text-white'>

                                        {/* Row: Image + Name */}
                                        {username && (
                                            <div className='flex flex-col items-center mb-4'>
                                                <div className='h-25 w-25 flex justify-center  border-2 border-emerald-400 shadow-lg transition-all duration-700  group-hover/main:shadow-emerald-800 rounded-full items-center mr-5 mb-2 overflow-hidden'>
                                                    <img
                                                        className='h-20 w-20  rounded-full object-cover transition-all duration-700 group-hover/main:scale-115'
                                                        src='https://i.imgur.com/g3RTCiv.jpeg'
                                                        alt='Profile'
                                                    />
                                                </div>
                                                <h1 className='transition-all duration-700 text-white group-hover/main:text-emerald-400 group-hover/main:scale-115 text-lg'>
                                                    <span>Hi, I'm <span className='text-emerald-400'>{username}</span></span>
                                                </h1>
                                                <p className='font-extralight text-sm text-white/70 transition-all duration-700 group-hover/main:text-emerald-400/70'>{tag}</p>
                                            </div>
                                        )}

                                        {/* Socials Below */}
                                        {socials.length > 0 && (
                                            <div className='flex flex-col justify-center items-center flex-wrap gap-2'>
                                                <h1 className='font-light mr-2 text-emerald-400'>Connect With Me</h1>
                                                <div className='flex gap-4'>
                                                    {socials.length > 0 &&

                                                        socials.map((items, index) => (
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
                                                {description || (
                                                    <span className='text-slate-400 italic'>No description provided</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ) : (<div className='flex min-h-screen justify-center items-center'><p className='font-semibold text-black/50 text-sm '>Live preview of your portfolio will appear here as you update the form</p></div>)}
                            </div>




                            {/*Skills*/}
                            {skills.length > 0 && (
                                <div className='bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 group flex flex-col justify-center items-center mt-4 p-5 group/main rounded-md'>
                                    <h1 className='font-bold text-lg text-white mb-2 transition-all duration-400 group-hover:text-emerald-400'>Skills</h1>
                                    <div className='flex justify-center items-center flex-wrap gap-2'>

                                        {skills.length > 0 &&
                                            skills.map((items, index) => (
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
                            {projects.length > 0 && (
                                <div className='bg-gradient-to-br from-slate-900 via-indigo-400 group to-slate-900 mt-5 p-2 flex flex-col justify-center items-center rounded-md'>
                                    <h1 className='font-bold text-white text-lg transition-all duration-700 group-hover:text-emerald-400'>Projects</h1>
                                    {projects.length > 0 &&
                                        projects.map((items, index) => (
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
            </div>

        </div>




    )
}

export default Form