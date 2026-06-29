"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react";
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../../components/ui/button"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const FormSchema = z.object({
    email: z.string().email({
        message: "The Email must be a valid Email"
    }).min(2, {
        message: "The Email is required.",
    }),
    password: z.string().min(8, {
        message: "The Password must be at least 8 characters.",
    }).max(40, {
        message: "The Password must be less than 40 characters."
    }),
})

export default function LoginForm() {
    const [pending, setPending] = useState(false)
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setPending(true)
        setError("")
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl,
            });

            if (res?.error) {
                if (res.error === 'CredentialsSignin') {
                    setError('Please check your credentials and try again!')
                } else {
                    setError("Something went wrong. please try again later")
                }
            } else {

                router.push(callbackUrl);
            }

            setPending(false);

        } catch (error: any) {
            setPending(false);
            console.log(error)
            setError('Something went wrong. try again later');
        }

    }

    return (
        <Form {...form}>
            <form method="post" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full !ring-[#e49400] focus:ring-2"
                                    type="email"
                                    required
                                    placeholder="yourname@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>your email address.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full !ring-[#e49400] focus:ring-2"
                                    type="password"
                                    required
                                    minLength={8}
                                    maxLength={40}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Your password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <div className="bg-red-200/50 dark:bg-red-500/50 rounded-md p-3">
                        <span className="text-red-500 dark:text-red-200">{error}</span>
                    </div>
                )}

                <Button type="submit" disabled={pending} className="text-md bg-[#e49400] hover:bg-amber-600 text-white">
                    Login
                </Button>
            </form>
        </Form>

    )
}
