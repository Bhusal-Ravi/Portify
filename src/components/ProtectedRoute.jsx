import React, { useContext } from 'react'
import { UserContext } from './AuthContext'
import { Navigate } from 'react-router-dom'


function ProtectedRoute({ children }) {

    const { user, loading } = useContext(UserContext)

    if (loading) return ( <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                Loading...
            </div>)

    if (!user) { return <Navigate to='/' replace /> }

    return children

}

export default ProtectedRoute