import Image from 'next/image'
import React from 'react'
import Form from './Form'
import Script from 'next/script'

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
        <div className='bg-red-700'>
            <Script id="facebook-pixel" strategy="lazyOnload">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '8973872249317652');
                    fbq('track', 'PageView');
                `}
            </Script>
            <div className='py-4 flex justify-center w-full bg-white'>
                <h1 className='text-xl mx-auto font-semibold text-red-600'>ترحب بكم ASB-Academy مؤسسة
                </h1>
            </div>

            <div className='relative flex flex-col items-center'>
                <Image className='absolute -z-0 top-0 right-0 object-cover' src={'/lp_1_bg.png'} fill alt='bg' />

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

                <Image className='object-contain z-0' src={'/lp_1_1.png'} width={400} height={200} alt='bg' />

                <p className='text-xl text-white text-center font-semibold z-0 p-4'>
                    يمكنك الحصول على دبلوم دولي<br />
                    ASB-Academy معتمد من <br />
                    في مختلف التخصصات بنظام VAE<br />
                </p>

                <h1 className='text-xl mx-auto font-semibold text-white'>مؤسسة ASB-Academy ترحب بكم</h1>

                <Form lp='lp_2' />

                <Image className='object-contain z-0 p-4' src={'/asba_diploma.png'} width={500} height={300} alt='diplome' />
            </div>
        </div>
    )
}
