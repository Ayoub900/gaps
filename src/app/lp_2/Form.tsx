import FormSubmitButton from '@/app/_components/ui/FormSubmitButton';
import { db } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

export default function Form({ lp }: { lp: string }) {
    const handleSubmit = async (formData: FormData) => {
        "use server"

        const name = formData.get("name")?.toString();
        const phone = formData.get("phone")?.toString();
        const field = formData.get("field")?.toString();
        const hasDiplomas = formData.get("hasDiplomas")?.toString();
        const hasExp = formData.get("hasExp")?.toString();

        if (!name || !phone || !field || !hasDiplomas || !hasExp) {
            redirect("?error=1")
        }

        let application = null

        try {
            const dbApplication = await db.lpForm.create({
                data: {
                    name,
                    phone,
                    field,
                    hasDiplomas,
                    hasExp,
                    lp
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
        <form action={handleSubmit} className='flex z-0 text-right p-4 text-white text-lg font-semibold w-full max-w-2xl mx-auto flex-col space-y-6'>
            <label className='flex flex-col' >الاسم الكامل<br />
                <input className='p-3 rounded-md border outline-none text-black' name='name' type="text" required />
            </label>
            <label className='flex flex-col' >ما هو مجال عملك؟<br />
                <input className='p-3 rounded-md border outline-none text-black' name='field' type="text" required />
            </label>
            <label className='flex flex-row gap-8 justify-end' ><br />
                <label className='flex gap-2'><input type="radio" name='hasDiplomas' value={'no'} />لا</label>
                <label className='flex gap-2'><input type="radio" name='hasDiplomas' value={'yes'} />نعم</label>
                هل تتوفر على شواهد في المجال؟
            </label>
            <label className='flex flex-row gap-8 justify-end' ><br />
                <label className='flex gap-2'><input type="radio" name='hasExp' value={'no'} />لا</label>
                <label className='flex gap-2'><input type="radio" name='hasExp' value={'yes'} />نعم</label>
                هل تتوفر على خبرة في المجال؟
            </label>
            <label className='flex flex-col' >رقم الهاتف<br />
                <input className='p-3 rounded-md border outline-none text-black' name='phone' type="text" required />
            </label>
            <FormSubmitButton>ارسل</FormSubmitButton>
        </form>
    )
}