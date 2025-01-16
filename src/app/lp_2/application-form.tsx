import FormSubmitButton from '@/app/_components/ui/FormSubmitButton';
import { db } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

export default function ApplicationForm({ lp }: { lp: string }) {
    const handleSubmit = async (formData: FormData) => {
        "use server";

        const name = formData.get("name")?.toString();
        const phone = formData.get("phone")?.toString();
        const field = formData.get("field")?.toString();
        const hasDiplomas = formData.get("hasDiplomas")?.toString();
        const hasExp = formData.get("hasExp")?.toString();

        if (!name || !phone || !field || !hasDiplomas || !hasExp) {
            redirect("?error=1");
        }

        let application = null;

        try {
            const dbApplication = await db.lpForm.create({
                data: {
                    name,
                    phone,
                    field,
                    hasDiplomas,
                    hasExp,
                    lp,
                },
            });

            if (dbApplication) {
                application = dbApplication;
            }
        } catch (error) {
            console.log(error);
            redirect("?error=1");
        }

        if (!application) {
            redirect("?error=1");
        }

        redirect("?success=1");
    };

    return (
        <form
            action={handleSubmit}
            className="flex flex-col text-right p-6 bg-white rounded-lg shadow-md text-gray-700 text-lg font-medium w-full max-w-2xl mx-auto space-y-8"
            dir="rtl"
        >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                استمارة التقديم
            </h2>

            <label className="flex flex-col gap-2">
                <span className="text-gray-600">الاسم الكامل</span>
                <input
                    className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    name="name"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    required
                />
            </label>

            <label className="flex flex-col gap-2">
                <span className="text-gray-600">ما هو مجال عملك؟</span>
                <input
                    className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    name="field"
                    type="text"
                    placeholder="على سبيل المثال: إدارة أعمال"
                    required
                />
            </label>

            <div className="flex flex-col gap-2">
                <span className="text-gray-600">هل تتوفر على شواهد في المجال؟</span>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="hasDiplomas"
                            value="yes"
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                        نعم
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="hasDiplomas"
                            value="no"
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                        لا
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-gray-600">هل تتوفر على خبرة في المجال؟</span>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="hasExp"
                            value="yes"
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                        نعم
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="hasExp"
                            value="no"
                            className="focus:ring-2 focus:ring-blue-500"
                        />
                        لا
                    </label>
                </div>
            </div>

            <label className="flex flex-col gap-2">
                <span className="text-gray-600">رقم الهاتف</span>
                <input
                    className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                    name="phone"
                    type="text"
                    placeholder="أدخل رقم هاتفك"
                    required
                />
            </label>

            <div className="flex justify-center">
                <FormSubmitButton className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    ارسل
                </FormSubmitButton>
            </div>
        </form>
    );
}
