import React from 'react'
import DashboardPage from './Dashboard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/auth'
import { notFound, redirect } from 'next/navigation'

interface DashboardRouteProps {
    searchParams: { page?: string }
}

function getCurrentPage(page?: string) {
    const parsedPage = Number.parseInt(page || '1', 10)
    return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
}

export default async function page({ searchParams }: DashboardRouteProps) {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        const callbackUrl = "/dashboard"
        redirect("/login?callbackUrl=" + encodeURIComponent(callbackUrl))
    }

    if (user.role !== "ADMIN") notFound()
    return (
        <>
            <DashboardPage page={getCurrentPage(searchParams.page)} />
        </>
    )
}
