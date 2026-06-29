import Form from './Form'

export default function ContactPage({ searchParams }: { searchParams: { success?: string; error?: string } }) {
    const success = searchParams.success
    const error = searchParams.error

    return (
        <>
            {/* Hero Section */}
            <section className="flex min-h-[220px] flex-col items-center justify-center bg-[#050c45] px-4 md:px-24 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white/95 mb-2">Contact Us</h1>
                <p className="text-white/80 text-lg">We’d love to hear from you</p>
            </section>

            {/* Main Content */}
            <section className="min-h-screen bg-[#f8fafc] px-4 py-16 md:px-24">
                <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] items-start">
                    {/* Contact Info */}
                    <div className="space-y-8 rounded-lg border border-[#050c45]/10 bg-white p-6 shadow-sm">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Get in touch</p>
                            <h2 className="mt-2 text-3xl font-bold text-[#050c45]">We are here to help</h2>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-[#050c45] mb-2">Email</h2>
                            <p className="text-gray-700 text-lg">
                                <a href="mailto:info@gaps-academy.org" className="hover:underline">
                                    academygaps@gmail.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#050c45] mb-2">Address</h2>
                            <address className="not-italic text-gray-700 text-lg leading-relaxed">
                                71–75 Shelton Street<br />
                                Covent Garden, London WC2H 9JQ<br />
                                United Kingdom
                            </address>
                        </div>
                    </div>

                    {/* Form / Message */}
                    <div className="w-full rounded-lg border border-[#050c45]/10 bg-white p-6 shadow-sm">
                        {success === "1" ? (
                            <div className="bg-green-100 border border-green-400 text-green-800 rounded-md p-6 text-center text-lg font-medium shadow-sm">
                                Your application has been sent successfully!
                            </div>
                        ) : error === "1" ? (
                            <div className="bg-red-100 border border-red-400 text-red-800 rounded-md p-6 text-center text-lg font-medium shadow-sm">
                                Something has gone wrong, please try again later!
                            </div>
                        ) : (
                            <Form title="Contact Us Page" />
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
