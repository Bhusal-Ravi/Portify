import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthContext'

function Logout() {
    const [backendMessage, setBackendMessage] = useState(null)
     const appUrl=import.meta.env.VITE_BACKEND_API
    const [showMessage, setShowMessage] = useState(false)
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            const response = await fetch(`${appUrl}/auth/logout`, {
                method: "POST",
                credentials: 'include'
            })

            const result = await response.json();

            if (response.ok) {
                setBackendMessage({ message: result.message, error: 0 })
                setTimeout(() => {
                    setShowMessage(true)
                }, 500)

                setTimeout(() => {
                    logout();
                    navigate('/')
                    setShowMessage(false)
                    setTimeout(() => {
                        setBackendMessage(null)
                    }, 500)

                }, 1000)

            }

        } catch (error) {
            console.log("LogoutError", error)
            setBackendMessage({ message: "Login Failed", error: 1 })
            setTimeout(() => {
                setShowMessage(true)
            }, 500)

            setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    setBackendMessage(null);
                }, 500);
            }, 3000);
        }
    }
    return (

        <div className='relative'>
            {backendMessage && (
                <div
                    className={`
            transition-all duration-500 ease-in-out absolute right-10 top-0 px-4 py-2 rounded-md
            ${showMessage ? "opacity-100 -translate-x-20" : "opacity-0 -translate-x-0"}
            ${backendMessage?.error === 0 ? "bg-green-400" : "bg-red-400"}
          `}
                >
                    <h1>{backendMessage.message}</h1>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout