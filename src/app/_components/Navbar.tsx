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
                    <Image className='max-h-[65px] max-w-[65px] lg:max-h-[80px] lg:max-w-[80px]' src={'/logo_gaps5.png'} alt='logo' width={120} height={120} />
                    <h1 className='leading-6 text-2xl font-bold text-red-bg-red-950'>
                        G.A.P.S<br />Academy
                    </h1>
                </Link>
                <div className=' flex-row hidden md:flex items-center gap-1 text-black font-semibold'>
                    <Link className='hover:text-[#e49400] transition-all duration-300 p-4' href={'/'}>Home</Link>
                    <Link className='hover:text-[#e49400] transition-all duration-300 p-4' href={'/posts/686a566d0cb9966c44354e0b'}>Certification</Link>
                    <Link className='hover:text-[#e49400] transition-all duration-300 p-4' href={'/international-diploma'}>International Diploma</Link>
                    <Link className='hover:text-[#e49400] transition-all duration-300 p-4' href={'/verification'}>Verification</Link>
                    <Link className='hover:text-[#e49400] transition-all duration-300 p-4' href={'/about'}>About Us</Link>
                </div >
            </div >
            <div className='flex md:hidden flex-row justify-between px-4 items-center relative'>
                <Link className='flex items-center ' href={'/'}>
                    <Image className='max-h-[65px] max-w-[65px] lg:max-h-[80px] lg:max-w-[80px]' src={'/logo_gaps5.png'} alt='logo' width={120} height={120} />
                    <h1 className='leading-[14px] text-xl font-bold text-red-bg-red-950'>
                        GAPS Academy
                    </h1>
                </Link>
                <PhoneNavbar />
            </div>
        </>
    )
}