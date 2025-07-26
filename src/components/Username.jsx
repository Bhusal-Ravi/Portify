import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            console.log()

            if (result.error) {
                setError(result.message);
            } else {
                setError(false);
                setSuccess({ status: true, message: `UserName Set Successully` });
                setTimeout(() => navigate('/form'), 2000);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function handleUserName(e) {
        setUserName({ url: e.target.value })
    }
    function handleSubmit() {
        checkUserName()
    }

    return (
        <div className='flex  min-h-screen  max-w-4xl mx-auto justify-center items-center '>

            <div className='bg-gradient-to-r from-slate-600 to-indigo-700 w-full  h-100 rounded-md'>
                <div className='flex flex-col items-center justify-center mt-5'>
                    <h1 className='font-bold text-2xl text-white  '>Choose A UserName</h1>
                    <p className='text-white/50 font-thin '>UserName Must be unique and in lowercase</p>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type='text'
                            value={userName.url}
                            onChange={handleUserName}
                            placeholder='Enter UserName'
                            className='bg-white/40 text-white font-bold mt-10 flex  w-2xl h-20 rounded-md px-5 shadow-sm '
                        />
                        <button onClick={handleSubmit} className='mt-4 text-white rounded-md bg-emerald-600 px-5 cursor-pointer py-1 shadow-sm shadow-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-lg '>Submit</button>
                        {error && <p className='bg-rose-600 text-white rounded-md px-2 py-1 font-semibold mt-5'>{error}</p>}
                        {success.status && <div className='flex justify-center items-center mt-5'><p className='bg-green-600 text-white rounded-md px-2 py-1 font-semibold '>{success.message}</p><span className='w-5 h-5 rounded-full border-2 border-t-transparent animate-spin border-emerald-400 ml-2'></span></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Username