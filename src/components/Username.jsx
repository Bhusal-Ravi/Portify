import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function Username() {
    const [userName, setUserName] = useState({ url: "" });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState({ status: false })
    const navigate = useNavigate();

    async function checkUserName() {
        try {
            const response = await fetch('http://localhost:5001/api/urlcheck', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userName)
            })
            const result = await response.json()

            if (result.error) {
                setError(result.message);
                setTimeout(() => {
                    setError(null)
                }, 2000)
            } else {
                setError(false);
                setSuccess({ status: true, message: `Username Set Successfully` });
                setTimeout(() => navigate(`/form/${userName.url}`), 2000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function handleUserName(e) {
        setUserName({ url: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        checkUserName()
    }

    return (
        <motion.div

            className='bg-gradient-to-r from-slate-900 to-purple-900 w-full transition-all duration-500 ease-in-out max-w-md md:max-w-2xl lg:max-w-4xl sm:max-h-60 md:max-h-80 lg:max-h-96 p-4 sm:p-5 lg:p-6 rounded-lg shadow-lg'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center'>Choose A Username</h1>
                <p className='text-white/70 text-sm sm:text-base lg:text-lg text-center mt-1 lg:mt-3'>
                    Username must be unique and in lowercase
                </p>

                <form onSubmit={handleSubmit} className='w-full mt-6 lg:mt-8'>
                    <div className='flex flex-col w-full'>
                        <input
                            type='text'
                            value={userName.url}
                            onChange={handleUserName}
                            placeholder='Enter username'
                            className='bg-white/20 text-white placeholder-white/50 font-medium w-full 
                                      h-14 sm:h-16 lg:h-20 rounded-lg px-4 lg:px-6 focus:outline-none focus:ring-2 
                                      focus:ring-purple-500 focus:border-transparent lg:text-lg'
                            required
                        />

                        <button
                            type='submit'
                            className='mt-4 lg:mt-6 text-white rounded-lg bg-emerald-600 w-full 
                                      py-3 sm:py-3 lg:py-4 shadow-sm hover:bg-emerald-700 transition-all 
                                      duration-300 active:scale-95 lg:text-lg'
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className='bg-rose-600   text-white rounded-lg px-3 py-2  lg:px-4 lg:py-3 text-sm lg:text-base
                                      font-medium mt-4 lg:mt-6 w-full text-center'
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                {success.status && (
                    <div className='flex items-center justify-center mt-4 lg:mt-6 space-x-2'>
                        <p className='bg-green-600 text-white rounded-lg px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base font-medium'>
                            {success.message}
                        </p>
                        <span className='w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-t-transparent animate-spin border-emerald-200'></span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Username