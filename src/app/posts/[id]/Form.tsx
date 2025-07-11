import FormSubmitButton from '@/app/_components/ui/FormSubmitButton';
import { db } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

export default function Form({ title }: { title: string }) {
    const handleSubmit = async (formData: FormData) => {
        "use server"

        const name = formData.get("name")?.toString();
        const phone = formData.get("phone")?.toString();
        const country = formData.get("country")?.toString();
        const email = formData.get("email")?.toString();

        if (!name || !phone || !country || !email) {
            redirect("?error=1")
        }

        let application = null

        try {
            const dbApplication = await db.application.create({
                data: {
                    name,
                    phone,
                    country,
                    email,
                    title
                }
            })

            if (dbApplication) {
                application = dbApplication
            }

        } catch (error) {
            console.log(error)
            redirect("?error=1")
        }

        if (!application) {
            redirect("?error=1")
        }

        redirect("?success=1")

    }
    return (
        <form
            action={handleSubmit}
            className="flex w-full max-w-2xl p-4 mx-auto flex-col space-y-6"
        >
            <label htmlFor="name" className="flex flex-col font-medium text-gray-700">
                Full Name:
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e49400]"
                />
            </label>

            <label htmlFor="country" className="flex flex-col font-medium text-gray-700">
                Country:
                <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    placeholder="Your country"
                    className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e49400]"
                />
            </label>

            <label htmlFor="phone" className="flex flex-col font-medium text-gray-700">
                Phone:
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e49400]"
                />
            </label>

            <label htmlFor="email" className="flex flex-col font-medium text-gray-700">
                Email:
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className="p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e49400]"
                />
            </label>

            <FormSubmitButton>Apply</FormSubmitButton>
        </form>

    )
}