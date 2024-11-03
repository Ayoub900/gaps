import React from 'react'
import DashboardPage from './Dashboard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/auth'
import { notFound, redirect } from 'next/navigation'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        redirect("/api/auth/signin")
    }

    if (user.role !== "ADMIN") notFound()
    return (
        <>
            <DashboardPage />
        </>
    )
}
