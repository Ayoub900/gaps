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
            className="w-full max-w-2xl mx-auto bg-white rounded-xl space-y-5"
        >
            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold text-[#050c45] mb-1">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="h-12 rounded-md border border-gray-300 bg-white px-4 text-base outline-none transition placeholder:text-gray-400 focus:border-[#e49400] focus:ring-2 focus:ring-[#e49400]/20"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="country" className="text-sm font-semibold text-[#050c45] mb-1">
                    Country
                </label>
                <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    placeholder="Your country"
                    className="h-12 rounded-md border border-gray-300 bg-white px-4 text-base outline-none transition placeholder:text-gray-400 focus:border-[#e49400] focus:ring-2 focus:ring-[#e49400]/20"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm font-semibold text-[#050c45] mb-1">
                    Phone
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    className="h-12 rounded-md border border-gray-300 bg-white px-4 text-base outline-none transition placeholder:text-gray-400 focus:border-[#e49400] focus:ring-2 focus:ring-[#e49400]/20"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-semibold text-[#050c45] mb-1">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className="h-12 rounded-md border border-gray-300 bg-white px-4 text-base outline-none transition placeholder:text-gray-400 focus:border-[#e49400] focus:ring-2 focus:ring-[#e49400]/20"
                />
            </div>

            <FormSubmitButton className="h-12 w-full rounded-md text-base font-semibold">Send</FormSubmitButton>
        </form>

    )
}
