import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LoginForm from './LoginForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function page() {
    const session = await getServerSession(authOptions)
    if (session) {
        revalidatePath("/")
        redirect("/")
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="md:w-[350px] mx-12 md:mx-auto">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Type your Credentials to proceed</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
