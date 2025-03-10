import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <div className='min-h-[50vh] gap-4 justify-around p-4 md:px-24 md:py-12 flex flex-col md:flex-row bg-red-800'>
                <div className='flex flex-col justify-center items-center'>
                    <Image src={'/logo_2.png'} width={200} height={200} alt='logo' />
                    <h1 className="text-4xl font-semibold text-white">ASB Academy</h1>
                    <p className='text-white/70 text-center '> Support@asbacademy.co.uk
                    </p>
                </div>
                <div className='flex flex-col justify-center '>
                    <h1 className="text-2xl font-semibold text-white mb-2">Usefull links</h1>
                    <div className='px-4 flex flex-col'>
                        <Link className='text-white/70 underline p-2' href={'/'}>Home</Link>
                        <Link className='text-white/70 underline p-2' href={'/about'}>About Us</Link>
                        <Link className='text-white/70 underline p-2' href={'/institutions-acc'}>Accreditation Of Institutions</Link>
                        <Link className='text-white/70 underline p-2' href={'/instructors-acc'}>Accreditation Of Instructors</Link>
                        <Link className='text-white/70 underline p-2' href={'/international-diploma'}>International Diploma</Link>
                        <Link className='text-white/70 underline p-2' href={'https://www.ga-skills.org.uk/verification'}>Verification</Link>
                        {/* <Link className='text-white/70 underline p-2' href={'/verification'}>Verifaction</Link> */}
                    </div>
                </div>
            </div>
            <div className='flex justify-center bg-red-950 p-4'>
                <p className='text-white/80 '>&copy; 2024 ASBA. All rights Reserved.</p>
            </div>
        </>
    )
}