import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Telescope, Radio, ChartColumnStacked, BadgePlus, Image, LocateFixed } from 'lucide-react';
import { motion, spring } from 'framer-motion';
import Marqueeslider from './Marqueeslider';
import { useInView } from 'react-intersection-observer';



function Home() {

    const navigate = useNavigate();
    const [menueShow, setMenueShow] = useState(false)

    const [homeRef, homeInView] = useInView({ threshold: 0.5 });
    const [featuresRef, featuresInView] = useInView({ threshold: 0.5 });
    const [howtoRef, howtoView] = useInView({ threshold: 0.5 });
    const [contactusRef, contactusView] = useInView({ threshold: 0.5 });

    const activeSection = homeInView ? 'home' :
        featuresInView ? 'features' :
            howtoView ? 'howto' :
                contactusView ? 'contact' :
                    'home'

    function handlePortfolio() {
        navigate('/username')
    }

    return (

        <div className='min-h-screen '>


            {/*NavBar*/}
            <motion.nav initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ type: "tween", duration: 1, ease: "easeOut" }} className=' shadow-2xl shadow-purple-600  fixed z-10 top-5 max-w-4xl mx-auto left-5 right-5  rounded-xl  bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20   py-5 px-5 flex text-white justify-between  items-center '>
                <div className='transition-all hover:scale-110 duration-300 ease-in-out  cursor-pointer'>
                    <h1 className='text-sm md:text-lg md:font-bold '>Portify</h1>
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
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer  ${activeSection === "home" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'} `}>Home</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer ${activeSection === "features" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>Features</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2    cursor-pointer ${activeSection === "howto" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>How to</motion.li>
                            <motion.li initial={{ color: "#C4C4C4", textShadow: "0px 0px 0px rgba(255, 255, 255, 0)" }} whileHover={{ scale: 1.1, color: "#F7F7F7", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }} transition={{ type: "tween", duration: 0.3, ease: "easeOut" }} className={`px-4 py-2   cursor-pointer ${activeSection === "contact" ? "border-b-2 border-purple-500 text-white font-bold text-lg" : 'text-slate-800'}  `}>Contact Us</motion.li>
                        </ul>
                    </motion.div>
                </div>
                <div className='group '>

                    <button className='cursor-pointer group-hover:shadow-2xl transition duration-300 group-hover:shadow-purple-600/80 h-8 w-22 md:h-10 md:w-32 p-[1.5px] pt-[1px] flex justify-center items-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500'>

                        <div className='h-full w-full text-sm font-thin flex p-1 justify-center items-center rounded-full bg-gradient-to-r from-gray-600 to-gray-800 group-hover:from-gray-500 group-hover:to-gray-600 group-hover:transition group-hover:duration-300 '><span> <img className='h-3 w-3 md:h-5 md:w-5 md:mr-5 mr-2' src='google.png' /></span>Sign In</div>
                    </button>
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
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Home</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Features</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">How to</motion.li>
                                <motion.li whileHover={{ scale: 1.1, color: "#1B9469" }} transition={{ type: spring, stiffness: 300, damping: 5 }} className="px-4 py-2 cursor-pointer text-white/80 ">Contact Us</motion.li>
                            </ul>
                        </motion.div>
                    )
                    }
                </div>




            </motion.nav>
            <section
                ref={homeRef}
                id='home'
                className='heropattern flex flex-col justify-center items-center min-h-screen object-cover bg-center  '

            >

                <div className='flex flex-col justify-center text-center max-w-3xl md:max-w-4xl lg:max-w-7xl '>
                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: -150, y: 150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/50 font-extrabold text-4xl md:text-7xl lg:text-9xl transition-all ease-in-out duration-200"
                    >
                        Stop Searching,
                    </motion.h1>

                    <motion.h1
                        viewport={{ once: true }}
                        initial={{ x: 150, y: -150 }}
                        whileInView={{ x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="text-white/90 mt-1 font-extrabold text-4xl md:text-7xl lg:text-9xl drop-shadow-2xl drop-shadow-white/40 transition-all ease-in-out duration-300"
                    >
                        Start{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            Creating!
                        </span>
                    </motion.h1>
                    <div className='mt-10 text-white/60 text-md md:text-xl lg:text-2xl font-md flex flex-col justify-center text-center text-wrap max-w-3xl md:max-w-4xl lg:max-w-7xl px-5'>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }} className=' '>Skip the code. Portify, your Personal Portfolio <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-200'>Designer,</span></motion.p>
                        <motion.p initial={{ opacity: 0, y: 100 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "tween", delay: 0.5, duration: 0.5 }}>Builds a stunning showcase for your skills fast. Impress, don’t <span className='bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transition-all ease-in-out duration-300'>stress!</span></motion.p>
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
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                                    viewport={{ amount: 0.5, once: true }} className='hidden md:block shadow-2xl shadow-purple-300 rounded-sm w-full h-auto' src='imgur.png' />
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
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                                    viewport={{ amount: 0.5, once: true }} className='hidden md:block shadow-2xl shadow-purple-300 rounded-sm w-full h-auto' src='url.png' />
                            </div>

                        </div>
                    </motion.div>


                </div>
            </section>
            <section ref={contactusRef} className="contactus min-h-screen flex flex-col justify-center items-center bg-gray-100 p-10" id="contactus">

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "tween", duration: 1 }}
                    viewport={{ amount: 0.5 }}
                    className="bg-black/5 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden w-full md:max-w-4xl lg:max-w-7xl">
                    <img
                        src="portifylogo.png"
                        alt="PORTIFY"
                        className="mb-6 w-full md:max-w-4xl  lg:max-w-7xl "
                    />
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSen2gvCScPKJF_acspwP1z4HspMT1j6DXKCIEBUddgzvjzXQQ/viewform?embedded=true"
                        style={{ width: "100%", height: "750px", border: "none" }}
                        title="Contact Form"
                    >
                        Loading…
                    </iframe>
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