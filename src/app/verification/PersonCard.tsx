import { db } from '@/lib/db/prisma'
import React from 'react'
import Image from 'next/image'

interface CardProps {
    q: string,
}

export default async function PersonCard({ q }: CardProps) {
    function isValidObjectId(id: string): boolean {
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        return objectIdRegex.test(id) || id.toString().includes(".");
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

    if (q.toString().includes(".")) {
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
            {accreditation.type !== "VAE" &&
                <Image placeholder="blur" blurDataURL="data:..." className='mx-auto object-contain' width={700} height={500} alt={"id"} src={accreditation.imageUrl} />
            }
            {accreditation.diploma && accreditation.type !== "I" && accreditation.type !== "VAE" &&
                <p className='p-4 font-semibold'>
                    has completed the necessary training and assessment to demonstrate competence and understanding within this field. The International Education ASB-Academy awards this certificate in recognition of the achievement <span className='text-red-500'>{accreditation.diploma}</span>
                    with all the rights, privileges, and honors thereto
                    pertaining here and elsewhere.
                </p>
            }
            {accreditation.diplomas && accreditation.type === "I" &&
                <p className='p-4 font-semibold'>
                    has earned, the credential of
                    education and diplomat based on the successful completion of the following mondatory courses in the Education and Diplomate Programme:
                    {accreditation.diplomas.length > 0 && accreditation.diplomas.map((d, index) => (
                        <h1 key={index}>- {d}</h1>
                    ))}
                </p>
            }
            {accreditation.diploma && accreditation.type === "VAE" &&
                <>
                    <h1 className='text-5xl text-green-600 font-medium text-center'>Verified</h1>
                    <h1 className='text-xl p-4 font-semibold text-center'>Mr/Ms {accreditation.name}, CIN: {accreditation.cin}</h1>
                    <p className='p-4 font-semibold text-center'>
                        Based on the evaluation committee&apos;s review of all relevant documents pertaining to the student&apos;s experience, he has been awarded a <span className='text-red-500'>{accreditation.diploma}</span>
                    </p>
                </>
            }
        </div>
    )
}