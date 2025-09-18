import React, { useEffect, useState } from 'react'
import { Trash, Plus, ExternalLink, CircleCheckBig } from 'lucide-react';
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
import { motion, spring, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';


function Formedit() {
    const { editurl } = useParams();
     const appUrl=import.meta.env.VITE_BACKEND_API
    const [backendMessage, setBackendMessage] = useState("")
    const [formData, setFormData] = useState({});
    const [notification, setNotification] = useState({ message: "", status: false, error: false })
    const [profilePicture,setPorfilePicture]= useState([]);
    const [projectPicture,setProjectPicture]= useState([])
    const [theme,setTheme]= useState("")

    async function onSubmit(data) {
        try {
            console.log(data)
            const response = await fetch(`${appUrl}/api/portfoliocard/update/${editurl}`, {
                method: 'POST',
                credentials: "include",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            })

            const result = await response.json();
            if (result) {
                setNotification({ message: result.message, status: true, error: result.error })
                setTimeout(() => {
                    setNotification({ message: "", status: false })
                }, 2000)
            }
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

    const { register, control, watch, reset, setValue, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            tag: "",
            description: "",
            profileimg: "",
            projects: [],
            social: [],
            skills: [],
            experience: [],
            theme: 'default'
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

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: "experience"
    });

    const username = watch("username")
    const description = watch("description")
    const projects = watch("projects");
    const socials = watch("social")
    const skills = watch("skills")
    const tag = watch("tag")
    const experience = watch("experience")

    const profilepicRef= useRef();

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
        if (value) {
            return true
        } else return false
    }

    async function handleFileSubmit(e,imageType){
        try{
        const file= e.target.files[0];
        if(!file) return

        const formData= new FormData();
        formData.append("profileimage",file);

        const response= await fetch(`${appUrl}/api/imageupload`,{
            method:'POST',
            body:formData,
        });

        const result =await response.json();

        setBackendMessage(result.message)
        if(result.error===false){
            setPorfilePicture(result.url)
            setValue("profileimg", result.url)
        }
       
        if(result.error===true){
             e.target.value='';
        }
        
        console.log(result)

        }catch(error){
            console.log(error)
        }
    }

    async function handleProjectFileSubmit(e,index){
        try{
                const file= e.target.files[0];
                if(!file)return
                const formData= new FormData();
                formData.append('projectimage',file)

                const response= await fetch(`${appUrl}/api/projectimage`,{
                    method:'POST',
                    body:formData
                })
        const result =await response.json();

        setBackendMessage(result.message)
        if(result.error===false){
            setValue(`projects.${index}.img`,result.url)
        }
       
        if(result.error===true){
             e.target.value='';
        }
        
        console.log(result)

        }catch(error){
            console.log(error)
        }
    }

    function handleThemeSelect(value){
        setTheme(value);
        setValue("theme",value)
    }

    async function handleFormData() {
        try {
            const response = await fetch(`${appUrl}/api/portfoliocard/formdetail/${editurl}`)
            const result = await response.json();

            if (result.error === false) {
                setFormData(result.data)
                reset(result.data);
                // Set theme from existing data
                if (result.data.theme) {
                    setTheme(result.data.theme);
                    
                }
                 if (result.data.profileimg) {
                setPorfilePicture(result.data.profileimg);
                setValue("profileimg", result.data.profileimg);
            }
                console.log(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFormData()
    }, [])

    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-slate-900 via-indigo-400 to-slate-900 flex flex-col justify-start items-center py-8 px-4'>
            <div className='max-w-7xl w-full'>
                <div className='text-center mb-8 flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold text-white mb-3'>Edit Portfolio</h1>

                    <div className='bg-slate-800/40 backdrop-blur-3xl p-2 w-fit max-w-[600px] flex justify-center  items-center rounded-xl '>
                        <p className='text-white text-lg '>
                            Your portfolio will be available at: <span className='text-emerald-600 font-semibold'>www.xyz.com/{editurl}</span>
                        </p>
                    </div>
                </div>

                <div className='flex flex-col justify-center bg-white/20 p-2 rounded-md items-center mt-5 mb-10'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-semibold text-white '>Choose Themes</h1>
                    <p className='text-sm text-white'>You can view the themes on HomePage, Select one as you like</p>
                    <div className='mt-5 justify-center items-center flex '>
                       
                        <div className='relative mr-3 h-30 w-50'>
                        {theme==="default" &&
                        (<div className={`absolute w-full h-full inset-0 z-10 bg-black/20 rounded-md `}></div>
                        )}
                        {theme==="default" && (
                            <div className='absolute right-1 top-1 text-emerald-400 '>
                            <CircleCheckBig/>
                        </div>)}
                        <button className='cursor-pointer h-30 w-50 hover:scale-105 transition-all duration-300' onClick={()=>handleThemeSelect("default")}>
                        <img src='/default_theme.png' className='h-30 w-50 object-cover rounded-lg'/>
                        </button>
                        </div>

                         <div className='relative h-30 w-50'>
                        {theme==="proximity" &&
                        (<div className={`absolute w-full h-full inset-0 z-10 bg-black/20 rounded-md `}></div>
                        )}
                        {theme==="proximity" && (
                            <div className='absolute right-1 top-1 text-emerald-400 '>
                            <CircleCheckBig/>
                        </div>)}
                        <button className='cursor-pointer h-30 w-50 hover:scale-105 transition-all duration-300' onClick={()=>handleThemeSelect("proximity")}>
                        <img src='/proximity.jpeg' className='h-30 w-50 object-cover rounded-lg'/>
                        </button>
                        </div>
                    </div>
</div>
<div className='bg-white-30'>

</div>
                </div>

                <AnimatePresence>
                    {
                        notification.status &&
                        (<motion.div
                            className={`fixed  top-5 left-1/2 transform -translate-x-1/2 ${notification.error === false ? "bg-emerald-400" : "bg-rose-400"} text-white text-lg font-bold rounded-full py-2 px-5`}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            transition={{ type: "tween", duration: 0.5 }}
                        >
                            <p>{notification.message}</p>
                        </motion.div>
                        )
                    }
                </AnimatePresence>

                <div className='grid grid-cols-1 xl:grid-cols-7 gap-6'>

                    <div className='xl:col-span-1 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50 rounded-lg shadow-lg transition-all duration-400 hover:shadow-blue-500 p-4'>
                        <h2 className='text-lg font-semibold text-white  drop-shadow-black mb-4 text-center'>Select Items</h2>

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

                        <div className='bg-slate-600/50 p-4 mt-10 rounded-lg shadow-md transiton-all duration-400 hover:scale-105 hover:shadow-white'>
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

                    <div className='xl:col-span-3 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50  rounded-lg shadow-lg  transition-all duration-400 hover:shadow-blue-500  p-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' encType='multipart/form-data'>

                                <div className='flex p-5 rounded-md bg-slate-600/50 flex-col justify-center items-center'>
                                    <h1 className='font-bold text-xl text-white'>Selected Theme</h1>
                                   <div className='flex mt-2 flex-row justify-center items-center'>
                                    {/* Default Theme Radio */}
        <div className='flex items-center'>
            <input 
                type='radio' 
                id='default-theme'
                name='theme' 
                value='default'
                {...register("theme", { required: true })}
                className='mr-2'
            />
            <label htmlFor='default-theme' className='text-white'>Default</label>
        </div>

        {/* Proximity Theme Radio */}
        <div className='flex items-center ml-2'>
            <input 
                type='radio' 
                id='proximity-theme'
                name='theme' 
                value='proximity'
                {...register("theme", { required: true })}
                className='mr-2'
            />
            <label htmlFor='proximity-theme' className='text-white'>Proximity</label>
        </div>
                               </div>
                                </div>

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
                                        
                                        <div className='flex flex-col bg-black/10 p-5  rounded-md'>
                                        <input
                                            type='text'
                                            ref={profilepicRef}
                                            value={profilePicture}
                                            placeholder='Upload Your Profile Picture Below, We will handle the rest'
                                            className='w-full p-3 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                            {...register("profileimg", {
                                                required: "This field is required",
                                                validate: (value) => profileUrlCheck(value) || "please provide a valid imgur link"
                                            })}
                                        />
                                       <div>
                                        <input
                                            type='file'
                                            accept="image/png, image/jpeg, image/jpg"
                                            name='profileimage'
                                            className='w-1/2 mt-5 cursor-pointer file:p-2 bg-slate-800 rounded-lg file:mr-10 text-white font-bold flex justify-center items-center file:bg-blue-500 file:cursor-pointer hover:file:bg-blue-700 file:text-white file:rounded-md '
                                            onChange={handleFileSubmit}
                                        />
                                       </div>
                                        </div>

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

                            <div className='bg-slate-600/50 rounded-lg p-6 shadow-sm transition-all duration-400 hover:scale-105 hover:shadow-white'>
                                <h2 className='text-xl font-bold text-white text-center mb-6'>Experience</h2>
                                <div className='space-y-6'>
                                    {experienceFields.map((item, index) => (
                                        <div key={index} className='bg-slate-700 p-5 rounded-lg'>
                                            <div className='flex items-center justify-between mb-4'>
                                                <h3 className='text-lg font-thin text-white'>Experience {index + 1}</h3>
                                                <button
                                                    type='button'
                                                    onClick={() => removeExperience(index)}
                                                    className='text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110'
                                                >
                                                    <Trash className='w-5 h-5' />
                                                </button>
                                            </div>

                                            <div className='space-y-4'>
                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Job Title</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Software Engineer'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg'
                                                        {...register(`experience.${index}.title`, { required: "This field is required" })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Company</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Company Name'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg'
                                                        {...register(`experience.${index}.company`, { required: "This field is required" })}
                                                    />
                                                </div>

                                                <div className='grid grid-cols-2 gap-4'>
                                                    <div>
                                                        <label className='block text-white font-medium mb-2'>Start Date</label>
                                                        <input
                                                            type='text'
                                                            placeholder='Jan 2020'
                                                            className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg'
                                                            {...register(`experience.${index}.startdate`)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className='block text-white font-medium mb-2'>End Date</label>
                                                        <input
                                                            type='text'
                                                            placeholder='Dec 2022 or Present'
                                                            className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg'
                                                            {...register(`experience.${index}.endDate`)}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Location</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Remote / City'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg'
                                                        {...register(`experience.${index}.location`)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className='block text-white font-medium mb-2'>Highlights</label>
                                                    <textarea
                                                        placeholder='Key achievements...'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg resize-none'
                                                        rows={3}
                                                        {...register(`experience.${index}.highlight`)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='flex justify-center mt-6'>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                appendExperience({ title: "", company: "", startdate: "", endDate: "", location: "", highlight: "" })
                                            }
                                            className='bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                                        >
                                            <Plus className='w-8 h-8' />
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                                                <div className='bg-black/10 p-5 rounded-md  flex flex-col'>
                                                    <label className='block text-white font-medium mb-2'>Project ScreenShot Link</label>
                                                    <input
                                                        type='text'
                                                        key={index}
                                                        placeholder='Upload Project ScreenShot Below'
                                                        className='w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400 transition-all duration-200'
                                                        {...register(`projects.${index}.img`)}
                                                    />
                                                      <input
                                                        type='file'
                                                        accept='image/jpeg image/png image/jpg'
                                                         className='w-1/2 mt-5 cursor-pointer file:p-2 bg-slate-800 rounded-lg file:mr-10 text-white font-bold flex justify-center items-center file:bg-blue-500 file:cursor-pointer hover:file:bg-blue-700 file:text-white file:rounded-md '
                                                        key={index}
                                                        onChange={(e)=>handleProjectFileSubmit(e,index)}

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

                            <div className='flex justify-center pt-4'>
                                <button
                                    type='submit'
                                    className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                                >
                                    Update Portfolio
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className='xl:col-span-3 bg-gradient-to-r  from-blue-800/50 via-indigo-400-800/50 to-blue-900/50  rounded-lg shadow-sm  p-6'>
                        <h2 className='text-xl text-white font-semibold   text-center mb-6'>Live Preview</h2>
                        <div className='bg-slate-100/  rounded-lg p-6 h-full flex flex-col justify-start'>

                            <div className='flex flex-col'>
                                {username ? (
                                    <div className='bg-slate-700/50 group/main transition-colors duration-700 hover:bg-slate-800 flex flex-col items-center font-semibold rounded-md px-4 py-4 w-full text-white'>

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

                            {experience.length > 0 && (
                                <div className='bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 group flex flex-col justify-center items-center mt-4 p-5 group/main rounded-md'>
                                    <h1 className='font-bold text-lg text-white mb-2 transition-all duration-400 group-hover:text-emerald-400'>Experience</h1>
                                    <div className='flex flex-col gap-4 w-full'>
                                        {experience.map((exp, index) => (
                                            <div key={index} className='bg-slate-800/70 w-full rounded-lg p-4 shadow-md transition-all duration-700 hover:shadow-emerald-400'>
                                                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                                                    <div>
                                                        <h2 className='text-white font-semibold text-lg'>{exp.title || "Untitled Role"}</h2>
                                                        <p className='text-emerald-400 text-sm font-light'>{exp.company || "Company"}</p>
                                                    </div>
                                                    <p className='text-sm text-white/70 mt-2 md:mt-0'>
                                                        {exp.startdate} - {exp.endDate || "Present"}
                                                    </p>
                                                </div>

                                                {exp.location && <p className='text-xs text-slate-300 italic mt-1'>{exp.location}</p>}

                                                {exp.highlight && (
                                                    <ul className='list-disc list-inside text-white/80 text-sm mt-2 space-y-1'>
                                                        {Array.isArray(exp.highlight)
                                                            ? exp.highlight.map((point, i) => (
                                                                <li key={i} className='transition-all duration-700 group-hover/main:text-emerald-400'>
                                                                    {point}
                                                                </li>
                                                            ))
                                                            : <li className='transition-all duration-700 group-hover/main:text-emerald-400'>{exp.highlight}</li>}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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

                            {projects.length > 0 && (
                                <div className='bg-gradient-to-br from-slate-900 via-indigo-400 group to-slate-900 mt-5 p-2 flex flex-col justify-center items-center rounded-md'>
                                    <h1 className='font-bold text-white text-lg transition-all duration-700 group-hover:text-emerald-400'>Projects</h1>
                                    {projects.length > 0 &&
                                        projects.map((items, index) => (
                                            <div key={index} className=' relative group/main m-3 bg-slate-700/50 transition-all duration-700 hover:bg-slate-800 flex  flex-col justify-center items-center overflow-hidden rounded-md w-full p-3'>
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

export default Formedit