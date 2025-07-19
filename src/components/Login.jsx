import React, { useContext, useEffect } from 'react'
import { UserContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const { user, loading } = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user, loading])
    function handleLogin() {
        window.open('http://localhost:5001/auth/google', "_self");
    }


    return (
        <div>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    )
}

export default Login