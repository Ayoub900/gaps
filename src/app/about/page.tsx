import React from 'react'

export default function page() {
    return (
        <>
            <div className='flex min-h-[220px] flex-col items-center justify-center bg-red-800 px-4 md:px-24 relative'>
                <h1 className='text-5xl font-semibold text-white/95'>About Us</h1>
                <p className='text-white/80'>Discover more about us in this page!</p>
            </div>

            <div className='min-h-screen flex flex-col px-4 md:px-24 relative space-y-4 my-4'>
                <p className=''>
                    <strong className='font-semibold'>Advanced Skills and Business Academy (ASBA)</strong> is an international leading institution dedicated to empowering individuals and organizations by providing internationally recognized accreditations and diplomas for various skills, excluding the medical and pharmaceutical fields, registered in 71-75 Shelton Street Covent Garden London WC2H 9JQ United Kingdom by number 15865484. We believe that continuous education and training are the foundations of success and progress, and we are committed to supporting and developing professional and technical skills for all individuals and organizations.
                </p>
                <h1 className='text-3xl font-semibold '>
                    Our Goals:
                </h1>
                <p className=''>

                    <strong className='font-semibold'>Empowering Individuals:</strong> We strive to help individuals develop and enhance their professional and technical skills by offering recognized diplomas that improve their job market opportunities.
                    <br />
                    <strong>Supporting Organizations:</strong> We aim to empower organizations to improve their employees performance by providing customized accreditation programs that meet changing market needs.
                    <br />

                    <strong className='font-semibold'>Enhancing Quality:</strong> We are dedicated to delivering the highest quality standards in our training and accreditation programs to ensure that our certificate holders are equipped with the best knowledge and skills.
                    <br />

                    <strong className='font-semibold'>Global Expansion:</strong> We aim to strengthen our global presence through strategic partnerships with educational and training institutions worldwide.
                    <br />

                    <strong className='font-semibold'>Promoting Continuous Learning:</strong> We advocate the idea that learning is a continuous process that does not stop at a certain point, contributing to improving the professional and personal life of individuals.
                </p>
                <h1 className='text-3xl font-semibold '>
                    Our Services:
                </h1>
                <p className=''>
                    In addition to providing accreditation and diplomas, we also offer training courses in collaboration with our accredited partners. These courses aim to enhance and develop the technical and professional skills of individuals and organizations, ensuring they meet the changing market demands and increase their chances of success in various fields.
                    Advanced Skills and Business Academy is committed to transparency and integrity in all its dealings and always strives to provide the best services to our global community. We believe that every individual deserves the opportunity to realize their full potential, and we do our utmost to support this noble goal.
                </p>
            </div>
        </>
    )
}
