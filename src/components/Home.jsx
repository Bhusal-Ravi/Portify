import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Telescope, Radio, ChartColumnStacked, BadgePlus, Image, LocateFixed } from 'lucide-react';
import { motion, spring, AnimatePresence } from 'framer-motion';
import Marqueeslider from './Marqueeslider';
import { useInView } from 'react-intersection-observer';
import Login from './Login';
import { set } from 'react-hook-form';



function Home() {

    const navigate = useNavigate();
     const appUrl=import.meta.env.VITE_BACKEND_API
    const [menueShow, setMenueShow] = useState(false)
    const [notification, setNotification] = useState({ message: "", error: false, status: false })
    const [messageSending, setMessageSending] = useState(false)

    const [homeRef, homeInView] = useInView({ threshold: 0.5 });
    const [featuresRef, featuresInView] = useInView({ threshold: 0.5 });
    const [howtoRef, howtoView] = useInView({ threshold: 0.5 });
    const [contactusRef, contactusView] = useInView({ threshold: 0.5 });

    const activeSection = homeInView ? 'home' :
        featuresInView ? 'features' :
            howtoView ? 'howto' :
                contactusView ? 'contact' :
                    ''

    function handlePortfolio() {
        navigate('/userprofile')
    }

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    async function sendMail(data) {
        try {
            setMessageSending(true)
            const response = await fetch(`${appUrl}/api/mail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            console.log(result)
            setNotification({ message: result.message, status: true, error: result.error })
            setMessageSending(false)


            setTimeout(() => {
                setNotification({ message: "", status: false, error: result.error })
            }, 2000)



        } catch (error) {
            console.log(error)
        }
    }

    function handleContactSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;

        console.log({ name, email, message });
        const final = { name: name, email: email, message: message }

        sendMail(final)

        form.reset();



    };

    return (

        <div className='min-h-screen '>

            <AnimatePresence>
                {notification.status && (
                    <motion.div
                        key={notification.message}
                        className={`fixed z-100  top-5 left-5 ${notification.error === false ? "bg-emerald-400" : "bg-rose-400"} text-white text-lg font-bold rounded-full py-2 px-5`}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ type: "tween", duration: 0.5 }}
                    >
                        <p>{notification.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            {/*NavBar*/}
            <motion.nav initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "tween", duration: 1, ease: "easeOut" }} className=' shadow-2xl shadow-purple-600  fixed z-10 top-5 max-w-4xl mx-auto left-5 right-5  rounded-xl  bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20   py-5 px-5 flex text-white justify-between  items-center '>
                <div className='relative transition-all hover:scale-110 duration-300 ease-in-out  cursor-pointer'>
                    <div className='absolute -z-10 inset-0 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 blur-lg animate-pulse'></div>

                    <div><h1 className=' relative text-sm md:text-lg md:font-bold '>Portify</h1></div>
                </div>
                {/*Medium Screen Nav*/}
                <div className='hidden md:flex '>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 50, damping: 50 }}
                        className=' rounded-lg   '
                    >
                        <ul className="list-none flex text-gray-800">
                            <motion.li onClick={() => scrollToSection('home')} initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer  ${activeSection === "home" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'} `}>Home</motion.li>

                            <motion.li onClick={() => scrollToSection('features')} initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer ${activeSection === "features" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>Features</motion.li>

                            <motion.li onClick={() => scrollToSection('howto')} initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2    cursor-pointer ${activeSection === "howto" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>How to</motion.li>

                            <motion.li onClick={() => scrollToSection('contactus')} initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer ${activeSection === "contact" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>Contact Us</motion.li>





                        </ul>
                    </motion.div>
                </div>
                <div className='group '>

                    <Login />

                </div>

                {/*NMobile Nav*/}
                <div className='mr-10 md:hidden '>
                    {!menueShow ?
                        (<Menu className='h-5 w-5  relative cursor-pointer hover:scale-105 transition-all duration-300' onClick={() => setMenueShow((prev) => !prev)} />) :

                        (<X className=' h-5 w-5relative cursor-pointer hover:scale-105 transition-all duration-300' onClick={() => setMenueShow((prev) => !prev)} />)

                    }


                    {menueShow && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            className='absolute top-full right-6 mt-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-3xl border border-white/20 rounded-lg shadow-lg min-w-[150px] py-2'
                        >
                            <ul className="list-none text-white/80">
                                <motion.li onClick={() => scrollToSection('home')} whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Home</motion.li>
                                <motion.li onClick={() => scrollToSection('features')} whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Features</motion.li>
                                <motion.li onClick={() => scrollToSection('howto')} whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">How to</motion.li>
                                <motion.li onClick={() => scrollToSection('contactus')} whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Contact Us</motion.li>
                            </ul>
                        </motion.div>
                    )
                    }
                </div>




            </motion.nav>
            <section
                ref={homeRef}
                id='home'
                className='heropattern flex flex-col justify-center items-center min-h-screen object-cover bg-center pt-20'

            >

                <div className='flex flex-col justify-center text-center max-w-3xl md:max-w-4xl lg:max-w-7xl '>
                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: -150, y: 150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/50 font-extrabold text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl transition-all ease-in-out duration-200"
                    >
                        Stop Searching,
                    </motion.h1>

                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: 150, y: -150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/90 mt-1 font-extrabold text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl drop-shadow-2xl drop-shadow-white/40 transition-all ease-in-out duration-300"
                    >
                        Start{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            Creating!
                        </span>
                    </motion.h1>
                    <div className='mt-10 text-white/60 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-md flex flex-col justify-center text-center text-wrap max-w-3xl md:max-w-4xl lg:max-w-7xl px-5'>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }} className=' '>Skip the code. Portify, your Personal Portfolio <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-200'>Designer,</span></motion.p>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }}>Builds a stunning showcase for your skills fast. Impress, don't <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-300'>stress!</span></motion.p>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }} className='flex gap-5 justify-center items-center'>
                    <button onClick={handlePortfolio} className='text-white/80 cursor-pointer text-sm font-bold  mt-15 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 rounded-md h-13 w-40 p-[2px] flex items-center justify-center group hover:shadow-lg hover:shadow-purple-500/50'><span className=' group-hover:text-white bg-gradient-to-r from-slate-900  to-slate-900 group-hover:from-gray-800 group-hover:to-gray-900 w-full h-full rounded-md flex justify-center items-center'><Zap className='mr-3' />Try For Free</span></button>
                    <button className='text-white/80 hover:text-white cursor-pointer text-sm font-bold  mt-15 bg-white/10 border-white border-2 rounded-md h-13 w-40 p-[2px] flex items-center justify-center group hover:shadow-lg hover:shadow-white/50'><span className='flex justify-center items-center '><Telescope className='mr-3' />Explore</span></button>
                </motion.div>

            </section>

            <section ref={featuresRef} id='features' className='min-h-screen   bg-black'>
                <div className='overflow-x-hidden mb-10'>
                    <Marqueeslider />
                </div>
                <div className='mx-auto p-2  max-w-3xl md:max-w-4xl lg:max-w-7xl'>
                    <div className=' flex justify-center  '>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ amount: 0.5 }}
                            className='text-white mr-2 flex flex-col justify-center items-center'>
                            <h1 className='font-extrabold text-3xl transition-all ease-in-out md:text-5xl lg:text-7xl bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>Personalized <span className='text-white/70 '>PortFoio</span></h1>
                            <div className='mt-10 ml-5 flex transition-all ease-in-out justify-center md:items-start lg:items-center lg:justify-between items-center  '>
                                <div className='p-5 md:w-1/3 lg:2/4 transition-all ease-in-out md:border-r-2 border-blue-900 mr-5'>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 1 }}
                                        viewport={{ amount: 0.5, once: true }}
                                    >
                                        <div className='flex items-center justify-left'>
                                            <Radio className='mr-2' />
                                            <h1 className='text-xl font-bold'>Live <span className='text-white/80 font-medium'>Preview</span></h1>

                                        </div>


                                        <p className='text-white/60 transition-all ease-in-out text-lg md:text-md lg:text-lg '>See your changes instantly with live preview.
                                            As you fill out the form, watch your input update in real-time.
                                            Make edits confidently and visualize results immediately.</p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 1 }}
                                        viewport={{ amount: 0.9, once: true }}>
                                        <div className='flex items-center mt-10 justify-left'>

                                            <ChartColumnStacked className='mr-2' />
                                            <h1 className='text-xl font-bold'>Different <span className='text-white/80 font-medium'>Categories</span></h1>

                                        </div>


                                        <p className='text-white/60 transition-all ease-in-out text-lg md:text-md lg:text-lg'>Includes different categories like Skills, Projects, and Social.
                                            Organize your information clearly by category.
                                            Easily manage each section for a complete profile.</p>

                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 1 }}
                                        viewport={{ amount: 0.9, once: true }}>
                                        <div className='flex items-center mt-10 justify-left'>

                                            <BadgePlus className='mr-2' />
                                            <h1 className='text-xl font-bold'>Regular <span className='text-white/80 font-medium'>Updates</span></h1>

                                        </div>


                                        <p className='text-white/60 transition-all ease-in-out md:text-md text-lg lg:text-lg'>Stay informed with regular updates.
                                            Receive the latest changes and improvements automatically.
                                            Keep your information fresh and up-to-date</p>
                                    </motion.div>
                                </div>
                                <div className=' md:w-2/3 transition-all ease-in-out lg:w-2/4'>
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 1, type: "spring", stiffness: 300, damping: 15 }}
                                        viewport={{ amount: 0.5, once: true }} className='hidden md:block shadow-2xl shadow-blue-900 rounded-sm w-full h-auto' src='input.png' />
                                </div>
                            </div>
                        </motion.div>


                    </div>
                </div>
            </section>

            <section ref={howtoRef} className='howtopattern min-h-screen flex justify-center items-center  object-cover' id='howto'>
                <div className='lg:max-w-7xl md:max-w-4xl max-w-3xl'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ amount: 0.5 }}
                        className='text-white mr-2 flex flex-col justify-center items-center'>
                        <h1 className='font-extrabold text-3xl transition-all ease-in-out md:text-5xl lg:text-7xl bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>How <span className='text-white/70 '>To</span></h1>
                        <div className='mt-10 mb-10 ml-5 flex transition-all ease-in-out justify-center md:items-start lg:items-center lg:justify-between items-center  '>
                            <div className=' md:w-2/3 transition-all ease-in-out lg:w-3/5'>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                                    viewport={{ amount: 0.5, once: true }} className='hidden md:block shadow-2xl shadow-purple-300 rounded-sm w-full h-auto max-w-md mx-auto' src='imgur.png' />
                            </div>
                            <div className='p-5 md:w-1/3 lg:w-2/5 transition-all ease-in-out md:border-l-2 border-blue-900 ml-10'>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ amount: 0.5, once: true }}
                                >
                                    <div className='flex items-center justify-end '>
                                        <Image className='mr-2' />
                                        <h1 className='text-xl text-right font-bold'>Photo <span className='text-white/80 font-medium'>Style</span></h1>

                                    </div>


                                    <p className='text-white transition-all text-right ease-in-out text-lg md:text-md lg:text-lg '>
                                        Upload your personal picture and project banner to Imgur.
                                        Share the image URLs.
                                        These will be used for your portfolio images.</p>
                                </motion.div>

                            </div>

                        </div>

                        <div className='mt-20 ml-5 flex transition-all ease-in-out justify-center md:items-start lg:items-center lg:justify-between items-center  '>

                            <div className='p-5 md:w-1/3 lg:w-2/5 transition-all ease-in-out md:border-r-2 border-blue-900 mr-10'>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ amount: 0.5, once: true }}
                                >
                                    <div className='flex items-center justify-start '>
                                        <LocateFixed className='mr-2' />
                                        <h1 className='text-xl text-left font-bold'>Portify <span className='text-white/80 font-medium'>Address</span></h1>

                                    </div>


                                    <p className='text-white transition-all text-left ease-in-out text-xl md:text-md lg:text-lg '>
                                        Your portfolio will be available under your username tag.
                                        For example: www.portify.com/ravi.</p>
                                </motion.div>

                            </div>
                            <div className=' md:w-2/3 transition-all ease-in-out lg:w-3/5'>
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                                    viewport={{ amount: 0.5, once: true }} className='hidden md:block shadow-2xl shadow-purple-300 rounded-sm w-full h-auto max-w-md mx-auto' src='url.png' />
                            </div>

                        </div>
                    </motion.div>


                </div>
            </section>
            <section ref={contactusRef} className="contactus relative min-h-screen flex flex-col justify-center items-center bg-gray-100 p-10 md:pt-[1px]   lg:pt-[250px]" id="contactus">
                <svg xmlns="http://www.w3.org/2000/svg" className=' z-5 absolute top-0 left-0' viewBox="0 0 1440 320"><path fill="#cf50b1" fill-opacity="1" d="M0,192L17.1,165.3C34.3,139,69,85,103,64C137.1,43,171,53,206,80C240,107,274,149,309,165.3C342.9,181,377,171,411,149.3C445.7,128,480,96,514,96C548.6,96,583,128,617,128C651.4,128,686,96,720,74.7C754.3,53,789,43,823,74.7C857.1,107,891,181,926,218.7C960,256,994,256,1029,218.7C1062.9,181,1097,107,1131,69.3C1165.7,32,1200,32,1234,32C1268.6,32,1303,32,1337,53.3C1371.4,75,1406,117,1423,138.7L1440,160L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"></path></svg>

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "tween", duration: 1 }}
                    viewport={{ amount: 0.5 }}
                    className="bg-black/5 z-2 relative backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden w-full md:max-w-4xl lg:max-w-7xl">
                    <h1
                        className="mb-6 absolute top-5 left-5 text-2xl font-bold text-white "
                    >Porfity</h1>
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-3xl font-bold mb-4 text-center text-purple-400">Contact Us</h2>
                        <p className="text-center text-gray-300 mb-8">
                            Have a question or want to collaborate? Send us a message!
                        </p>

                        <form onSubmit={handleContactSubmit} className="bg-gray-900 p-10 rounded-xl shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-200" htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required="true"
                                            placeholder="Your Name"
                                            className="w-full p-4 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-200" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required="true"
                                            placeholder="Your Email"
                                            className="w-full p-4 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-semibold text-gray-200" htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        required="true"
                                        rows={8}
                                        placeholder="Type your message..."
                                        className="w-full p-4 rounded-lg bg-black text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        style={{ height: 'calc(100% - 2rem)' }}
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-8 flex justify-center animate-center cursor-pointer text-white bg-purple-600 hover:bg-purple-700 active:bg-purple-800 font-semibold py-4 px-6 rounded-lg shadow-md transition-colors text-lg"
                            >
                                Send Message
                                {messageSending && (<span className='ml-5 h-6 w-6 inline-block transition-all animate-spin rounded-full border-2 border-transparent border-t-white'></span>)}
                            </button>
                        </form>
                    </div>

                </motion.div>
            </section>

            <section id='footer'>

                <footer className="bg-gray-900 text-gray-300 pt-10">
                    <div className="max-w-7xl mx-auto px-6 text-center">

                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            Portify
                        </h2>
                        <p className="mt-3 text-sm max-w-xl mx-auto">
                            Create professional portfolios with ease. Showcase your skills, projects, and achievements in style.
                        </p>
                    </div>


                    <div className="h-1 mt-8 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500"></div>


                    <div className="py-4 text-center text-sm">
                        © {new Date().getFullYear()} Portify. All rights reserved.
                    </div>
                </footer>


            </section>
        </div >
    )
}

export default Home