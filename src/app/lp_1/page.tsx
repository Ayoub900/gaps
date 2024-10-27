import Image from 'next/image'
import React from 'react'
import Form from './Form'

interface lp1PageProps {
    searchParams: {
        success: string,
        error: string,
    },
}

export default function page({
    searchParams: { success, error },
}: lp1PageProps) {
    return (
        <div className='flex flex-col items-center'>

            {success && success === "1" ?
                <div className="w-2xl z-0 mx-auto py-8 px-4 bg-green-600 text-white text-2xl font-bold">
                    لقد تم إرسال طلبك بنجاح!
                </div>
                : (error && error === "1" &&
                    <div className="w-2xl z-0 mx-auto py-8 px-4 bg-red-600 text-white text-2xl font-bold">
                        لقد حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!
                    </div>
                )
            }
            <Image className='object-cover w-full' src={'/lp_1_small.png'} width={1440} height={1000} alt='hero' />

            <Form lp='lp_1' />

            <Image className='object-contain z-0 p-4' src={'/lp_diplome.png'} width={500} height={300} alt='diplome' />
        </div>
    )
}
