import React, { createContext, useEffect, useState } from 'react'



export const UserContext = createContext();


function AuthContext({ children }) {
    const appUrl=import.meta.env.VITE_BACKEND_API
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    async function checkLoginSuccess() {
        try {

            const response = await fetch(`${appUrl}/auth/login/success`, {
                credentials: 'include', // for cookies
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const result = await response.json();
            if (result.error === false) {
                setUser(result.user)
                console.log('User logged in:', result.user)
            } else {
                setUser(null);
                console.log('Not authorized:', result.message)
            }

            setUser(result.user)

        } catch (error) {
            console.error('Auth error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    function logout() {
        setUser(null);
    }

    useEffect(() => {
        checkLoginSuccess();
    }, [])
    return (
        <UserContext.Provider value={{ user, loading, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthContext