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
        <form action={handleSubmit} className='flex w-full max-w-2xl p-4 mx-auto flex-col space-y-4'>
            <label className='flex flex-col' htmlFor="name">Full Name:
                <input className='p-3 border border-gray-400' name='name' type="text" required />
            </label>
            <label className='flex flex-col' htmlFor="name">Country:
                <input className='p-3 border border-gray-400' name='country' type="text" required />
            </label>
            <label className='flex flex-col' htmlFor="name">Phone:
                <input className='p-3 border border-gray-400' name='phone' type="text" required />
            </label>
            <label className='flex flex-col' htmlFor="name">Email:
                <input className='p-3 border border-gray-400' name='email' type="text" required />
            </label>
            <FormSubmitButton>Apply</FormSubmitButton>
        </form>
    )
}