import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SignupForm from './SignupForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { revalidatePath } from "next/cache"

interface Props {
    searchParams: {
        callbackUrl: string
    }
}

export default function SignupPage({ searchParams: { callbackUrl = encodeURIComponent("/") } }: Props) {
    return (
        <div className=" w-full min-h-screen flex justify-center items-center">
            <SignUp callbackUrl={callbackUrl} />
        </div>
    )
}

interface SignupProps {
    callbackUrl: string,
}

async function SignUp({ callbackUrl }: SignupProps) {
    notFound()
    const session = await getServerSession(authOptions)
    if (session) {
        revalidatePath("/")
        redirect("/profile")
    }
    return (
        <Card className="w-full md:w-[500px] mx-4 md:mx-auto my-12">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create a free account by submiting the form</CardDescription>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm'>Have an account? <Link className='underline' href={"/login?callbackUrl=" + callbackUrl} >Log in</Link> </p>
            </CardFooter>
        </Card>
    )
}