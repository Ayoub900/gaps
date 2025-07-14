import React from 'react'

export default function AboutPage() {
    return (
        <>
            <div className="flex min-h-[220px] flex-col items-center justify-center bg-[#050c45] px-6 md:px-24 relative">
                <h1 className="text-5xl font-semibold text-white/95 mb-2">About Us</h1>
                <p className="text-white/80 text-lg text-center max-w-3xl">
                    Empowering individuals through accredited, practical, and global education.
                </p>
            </div>

            <div className="min-h-screen px-6 md:px-24 py-10 max-w-5xl mx-auto space-y-10 text-gray-800">
                <section className="space-y-4">
                    <p className="text-lg leading-relaxed">
                        <strong className="text-[#050c45] font-semibold">GLOBAL ACADEMY OF PROFESSIONAL SKILLS LTD</strong> is a UK-registered educational and training institution, committed to empowering individuals through high-quality academic, professional, and technical learning programs.
                    </p>
                    <p className="text-lg leading-relaxed">
                        We proudly operate under UK SIC codes <strong>85320</strong>, <strong>85410</strong>, <strong>85421</strong>, and <strong>85422</strong>, which officially authorize us to provide a wide range of educational and professional development services.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Company Number: <strong>16579137</strong> &nbsp;|&nbsp; Incorporated: <strong>14 July 2025</strong> &nbsp;|&nbsp; Registered Email: <strong>Academygaps@gmail.com</strong> &nbsp;|&nbsp; Registered Office: <strong>71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom</strong>
                    </p>

                    <ul className="list-disc list-inside pl-2 space-y-1 text-lg text-gray-700">
                        <li>Technical and Vocational Education</li>
                        <li>Post-secondary and Pre-university Training</li>
                        <li>Undergraduate Degree-Level Education</li>
                        <li>Postgraduate-Level Qualifications</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <p className="text-lg leading-relaxed">
                        Founded on the belief that practical skills and accredited learning open doors to global opportunities, <strong className="text-[#050c45] font-semibold">GLOBAL ACADEMY OF PROFESSIONAL SKILLS LTD</strong> delivers internationally-oriented programs tailored to the needs of professionals, students, and career changers alike.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Our core mission is to bridge the gap between academic theory and practical application, offering recognized diplomas, certifications, and pathways to higher education and employment.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-[#050c45]">Our Specializations</h2>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-lg text-gray-700">
                        <li>Vocational and professional diplomas</li>
                        <li>Bachelor’s and Master’s equivalent training programs</li>
                        <li>Distance and blended learning models</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <p className="text-lg leading-relaxed">
                        At <strong className="text-[#050c45] font-semibold">GLOBAL ACADEMY OF PROFESSIONAL SKILLS LTD</strong>, we don’t just teach – we guide, mentor, and empower. Our team of industry experts and educators ensures that every learner receives the tools, support, and accreditation needed to thrive in today’s fast-changing world.
                    </p>
                    <p className="text-lg leading-relaxed">
                        At <strong className="text-[#050c45] font-semibold">GLOBAL ACADEMY OF PROFESSIONAL SKILLS LTD</strong>, we believe that quality is the foundation of excellence in education. That’s why we are committed to aligning with internationally recognized standards, including <strong>ISO 21001</strong> for Educational Organizations Management, <strong>ISO 9001</strong> for overall Quality Management, and <strong>ISO/IEC 40180</strong> for e-Learning Quality. Our goal is to obtain these certifications to ensure a modern, effective, and secure learning experience that meets the highest expectations of our students and their families.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Whether you’re looking to upgrade your career, validate your experience, or start a new educational journey – <strong className="text-[#050c45] font-semibold">GLOBAL ACADEMY OF PROFESSIONAL SKILLS LTD</strong> is your trusted partner in success.
                    </p>
                </section>

            </div>
        </>
    )
}
