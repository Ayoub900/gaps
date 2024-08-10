import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './styles/navbar.css'
import PhoneNavbar from './PhoneNavbar'

export default async function Navbar() {

    return (
        <>
            <div className='bg-white py-2 px-4 max-w-7xl hidden md:flex flex-row justify-between'>
                <Link className='flex items-center ' href={'/'}>
                    <Image className='max-h-[65px] max-w-[65px] lg:max-h-[80px] lg:max-w-[80px]' src={'/logo_4.png'} alt='logo' width={120} height={120} />
                    <h1 className='leading-[24px] text-3xl font-bold text-red-bg-red-950'>
                        ASB Academy
                    </h1>
                </Link>
                <div className=' flex-row hidden md:flex items-center gap-4 text-black font-semibold'>
                    <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/'}>Home</Link>
                    <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/about'}>About Us</Link>
                    <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/institutions-acc'}>Institutions Accreditation</Link>
                    <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/instructors-acc'}>Instructors Accreditation</Link>
                    <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/international-diploma'}>International Diploma</Link>
                    {/* <Link className='hover:text-red-600 transition-all duration-300 p-4' href={'/about'}>Verifaction</Link> */}
                </div >
            </div >
            <div className='flex md:hidden flex-row justify-between px-4 items-center relative'>
                <Link className='flex items-center ' href={'/'}>
                    <Image className='max-h-[65px] max-w-[65px] lg:max-h-[80px] lg:max-w-[80px]' src={'/logo_4.png'} alt='logo' width={120} height={120} />
                    <h1 className='leading-[14px] text-xl font-bold text-red-bg-red-950'>
                        ASB Academy
                    </h1>
                </Link>
                <PhoneNavbar />
            </div>
        </>
    )
}