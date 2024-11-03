"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({ name: z.string().min(2, { message: "The Name is required.", }).max(40, { message: "The Name must be less than 40 characters." }), email: z.string().email({ message: "The Email must be a valid Email" }).min(2, { message: "The Email is required.", }), password: z.string().min(8, { message: "The Password must be at least 8 characters.", }).max(40, { message: "The Password must be less than 40 characters." }), confirmPassword: z.string().min(8, { message: "The Password must be at least 8 characters.", }).max(40, { message: "The Password must be less than 40 characters." }), }).superRefine(({ confirmPassword, password }, ctx) => { if (confirmPassword !== password) { ctx.addIssue({ code: "custom", message: "The passwords did not match", path: ['confirmPassword'] }); } });

export default function SignupForm() {
    const [pending, setPending] = useState(false); const [error, setError] = useState("");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setPending(true);
        setError("");

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                // Check if the response is JSON or text
                const errorText = await response.text();
                try {
                    const json = JSON.parse(errorText);
                    setError(json.error || "An unexpected error occurred");
                } catch {
                    setError(errorText || "An unexpected error occurred");
                }
                setPending(false);
                return;
            }

            const json = await response.json();

            if (json.error) {
                setError(json.error || "An unexpected error occurred");
                setPending(false);
                return;
            }

            if (json.email !== data.email) {
                setError("User not found!");
                setPending(false);
                return;
            }

            setPending(false);
            router.push("/");
        } catch (error: any) {
            setPending(false);
            console.log(error.message || "An unexpected error occurred");
            setError(error.message || "An unexpected error occurred");
        }
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3" >
                <div className="w-full gap-2 flex flex-col md:flex-row" >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full" >
                                <FormLabel>Full Name </FormLabel>
                                < FormControl >
                                    <Input className="w-full" required placeholder="John Doe" {...field} />
                                </FormControl>
                                < FormMessage />
                            </FormItem>
                        )
                        }
                    />

                </div>
                < FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email </FormLabel>
                            < FormControl >
                                <Input type="email" required placeholder="yourname@example.com" {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />
                < FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password </FormLabel>
                            < FormControl >
                                <Input type="password" required min={8} max={40} {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />
                < FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password </FormLabel>
                            < FormControl >
                                <Input type="password" required min={8} max={40} {...field} />
                            </FormControl>
                            < FormMessage />
                        </FormItem>
                    )}
                />
                {
                    error && <div className="bg-red-200/50 dark:bg-red-300/50 rounded-md p-3" >
                        <span className="text-red-500 dark:text-red-200" > {error} </span>
                    </div>
                }
                <Button
                    disabled={pending}
                    className={"text-md"}
                >
                    Signup
                </Button>
            </form>
        </Form>
    )
}