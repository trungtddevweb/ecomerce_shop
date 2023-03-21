import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
    const { isAdmin } = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (!isAdmin) {
            navigate(-1)
        }
    }, [navigate, isAdmin])

    return (
        <div>DashboardPage</div>
    )
}

export default DashboardPage