import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const { user, loading } = useContext(UserContext)

    const [loggedIn, setLoggedIn] = useState(false)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
            console.log(user)
            setProfile(user)

        }
    }, [user, loading])
    function handleLogin() {
        window.open('http://localhost:5001/auth/google', "_self");
    }


    return (

        <div>
            {loggedIn ? (

                <div className=' relative  cursor-pointer group hidden md:justify-center md:items-center  md:flex md:w-32 bg-white rounded-md'>
                    <div className='absolute inset-0 -z-10 transition-all duration-700 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 blur-md group-hover:animate-pulse'></div>
                    <div className=' relative flex justify-center items-center'>
                        <img className=' mr-2 md:h-10 md:w-10 md:p-[2px] rounded-full object-cover' src={`${profile.avatar}`}></img>

                        <div className=''>
                            <span className='text-black'><span className='bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 bg-clip-text text-transparent  font-semibold'>HI!</span> <span className='font-semibold'>{profile.name.split(' ')[0]}<span className='font-normal'> {profile.name.split(' ')[1] ? "..." : ""}</span></span></span>
                        </div>
                    </div>
                </div>

            ) : (
                <button className='cursor-pointer group-hover:shadow-2xl transition duration-300 group-hover:shadow-purple-600/80 h-8 w-22 md:h-10 md:w-32 p-[1.5px] pt-[1px] flex justify-center items-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500'>

                    <div className='h-full w-full text-sm font-thin flex p-1 justify-center items-center rounded-full bg-gradient-to-r from-gray-600 to-gray-800 group-hover:from-gray-500 group-hover:to-gray-600 group-hover:transition group-hover:duration-300 '><span> <img className='h-3 w-3 md:h-5 md:w-5 md:mr-5 mr-2' src='google.png' /></span>Login</div>
                </button>
            )}
        </div>
    )
}

export default Login