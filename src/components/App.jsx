import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from './AuthContext'
function App() {
  return (
    <>
      <AuthContext>
        <Outlet />
      </AuthContext>
    </>
  )
}

export default App