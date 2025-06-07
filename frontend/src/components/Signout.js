import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Signout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
        navigate('/Signin')
    // }, [])
}, [navigate]); // ✅ Add this for terminal warning

    return (
        <div>

        </div>
    )
}

export default Signout
