import { db } from '@/lib/db/prisma'
import React from 'react'
import { BadgeCheck, SearchX } from 'lucide-react'

interface CardProps {
    q: string,
}

export default async function PersonCard({ q }: CardProps) {
    function isValidObjectId(id: string): boolean {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id) || id.toString().includes(".") || id.toString().includes("/");
    }

    const isValid = isValidObjectId(q);

    if (!isValid) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-center text-sm font-semibold text-red-700">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white text-red-600">
                    <SearchX className="h-5 w-5" />
                </div>
                Invalid certificate reference.
            </div>
        )
    }

    let accreditation = null

    if (q.toString().includes(".") || q.toString().includes("/")) {
        accreditation = await db.id.findFirst({
            where: {
                code: q
            }
        })
    } else {
        accreditation = await db.id.findUnique({
            where: {
                id: q
            }
        })
    }
    if (!accreditation) {
        return (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-center text-sm font-semibold text-amber-800">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white text-amber-700">
                    <SearchX className="h-5 w-5" />
                </div>
                ID does not exist.
            </div>
        )
    }
    return (

        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-700">
                    <BadgeCheck className="h-7 w-7" />
                </span>
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Verified</p>
                    <h2 className="mt-1 text-2xl font-extrabold text-[#050c45] md:text-3xl">
                        Verified Candidate
                    </h2>
                </div>
            </div>

            <div className="mt-8 divide-y divide-gray-100 border-y border-gray-100 text-[#050c45]">
                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                    <span className="text-sm font-semibold text-gray-500">Full Name</span>
                    <span className="text-lg font-semibold">Mr/Ms {accreditation.name}</span>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                    <span className="text-sm font-semibold text-gray-500">National ID (CIN)</span>
                    <span className="text-base font-medium">{accreditation.cin}</span>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]">
                    <span className="text-sm font-semibold text-gray-500">Certification Status</span>
                    <span className="font-semibold text-green-700">Successfully completed and certified</span>
                </div>
            </div>

            <div className="mt-6 rounded-lg border-l-4 border-[#e49400] bg-[#f8fafc] p-5 text-sm leading-7 text-gray-700">
                <p className="mb-2 font-semibold text-[#050c45]">Details of Certification:</p>
                <p>Based on the official report of the Examination and Evaluation Committee,</p>
                <p>Following the successful completion of the intensive training program,</p>
                <p>
                    The candidate has been officially awarded a Diploma in
                    <span className="text-[#e49400] font-semibold"> &quot;{accreditation.diploma}&quot;</span>.
                </p>
            </div>
        </div>



    )
}
