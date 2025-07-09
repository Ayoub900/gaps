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

        <div className='flex flex-col justify-center gap-4 bg-white mx-auto min-w-[300px] w-full max-w-[560px] shadow-lg '>

            {accreditation.diploma && accreditation.type === "EDU" &&
                <>
                    <h1 className='text-5xl text-green-600 font-medium text-center'>Verified</h1>
                    <h1 className='text-xl p-4 font-semibold text-center'>Mr/Ms {accreditation.name}, CIN: {accreditation.cin}</h1>
                    <p className='p-4 font-semibold text-center'>
                        Based on the minutes of the Examination and Evaluation Committee, and following the successful completion of the intensive training program, the candidate has been awarded a <span className='text-red-500'>{accreditation.diploma}</span> .
                    </p>
                </>
            }
        </div>
    )
}