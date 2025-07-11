import { db } from '@/lib/db/prisma'
import React from 'react'
import Image from 'next/image'

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
            <div className='flex flex-col justify-center'>
                <h1 className='mx-auto'>invalid query!</h1>
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
            <div className='flex flex-col justify-center'>
                <h1 className=' mx-auto'>Id does not excist!</h1>
            </div>
        )
    }
    return (

        <div className="flex flex-col justify-center items-center gap-8 bg-white mx-auto min-w-[300px] w-full max-w-[560px] shadow-xl rounded-2xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-green-600 text-center tracking-wide">
                Verified Candidate
            </h1>

            <div className="w-full text-[#050c45] space-y-3">
                <div className="flex flex-col text-center">
                    <span className="text-sm text-gray-500">Full Name</span>
                    <span className="text-xl font-semibold">Mr/Ms {accreditation.name}</span>
                </div>
                <div className="flex flex-col text-center">
                    <span className="text-sm text-gray-500">National ID (CIN)</span>
                    <span className="text-lg font-medium">{accreditation.cin}</span>
                </div>
                <div className="flex flex-col text-center">
                    <span className="text-sm text-gray-500">Certification Status</span>
                    <span className="text-green-700 font-semibold">Successfully completed and certified</span>
                </div>
            </div>

            <div className="w-full border-l-4 border-[#e49400] bg-gray-50 p-4 text-gray-700 text-center leading-relaxed rounded-lg shadow-inner">
                <p className="font-semibold mb-2 text-[#050c45]">Details of Certification:</p>
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