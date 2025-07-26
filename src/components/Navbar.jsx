import React, { useEffect, useState } from 'react'
import Logout from './Logout'

function Home() {
    const [loginMessage, setLogInMessage] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setLogInMessage(true);
        }, 500)

        setTimeout(() => {
            setLogInMessage(false)
        }, 3000)
    }, [])
    return (
        <div className='relative'>
            <div className={`absolute rounded-md  right-10 top-0 bg-green-400 px-2 py-1 transition-all duration-300 ${loginMessage ? "opacity-100 -translate-x-20" : "opacity-0 translate-x-0"}`}>
                <h1>Login Successfull</h1>
            </div>
            <Logout />


        </div>
    )
}

export default Navbar