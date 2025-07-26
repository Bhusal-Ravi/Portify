import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Home() {

    const navigate = useNavigate();

    function handlePortfolio() {
        navigate('/username')
    }
    return (
        <div className=''>

            <button onClick={handlePortfolio} className='px-2 py-1 cursor-pointer rounded-md bg-blue-800 font-semibold text-white'>Create A Portfolio</button>

        </div>
    )
}

export default Home