import Image from 'next/image'
import Script from 'next/script'
import ApplicationForm from './application-form'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle } from 'lucide-react'

interface PageProps {
    searchParams: { success?: string; error?: string }
}

export default function Page({ searchParams: { success, error } }: PageProps) {
    return (
        <main className="min-h-screen bg-gray-50 z-100" dir="rtl">
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

            {/* Hero Section */}
            <div className="relative">
                <div className="flex items-center justify-center">
                    <div className="text-red-700 text-center space-y-4 p-6">
                        <h1 className="text-4xl text-red-600/70 md:text-5xl font-bold">شركاء نحو النجاح</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            نقدم لك فرصة الحصول على دبلوم دولي معتمد في مجال تخصصك
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Status Messages */}
                {success === "1" && (
                    <Alert className="mb-6 bg-green-50 text-green-900 border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-right mr-2">
                            لقد تم إرسال طلبك بنجاح!
                        </AlertDescription>
                    </Alert>
                )}

                {error === "1" && (
                    <Alert className="mb-6 bg-red-50 text-red-900 border-red-200">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="text-right mr-2">
                            لقد حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!
                        </AlertDescription>
                    </Alert>
                )}

                {/* Main Content */}
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-gray-900">
                            مؤسسة ASB-Academy ترحب بكم
                        </h2>
                        <p className="text-xl text-gray-600">
                            يمكنك الحصول على دبلوم دولي
                            <br />
                            معتمد من ASB-Academy
                            <br />
                            في مختلف التخصصات بنظام VAE
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Image
                            src="/asba_diploma.png"
                            width={500}
                            height={300}
                            alt="ASB Academy Diploma"
                            className="object-contain"
                        />
                    </div>

                    <div className="space-y-6 text-gray-800 text-right">
                        <h3 className="text-2xl font-semibold">حول الدبلوم</h3>
                        <p>
                            يقدم لك هذا الدبلوم فرصة فريدة لتوثيق خبراتك المهنية
                            <br />
                            وتحقيق طموحاتك في مجال عملك.
                        </p>
                        <h3 className="text-2xl font-semibold">كيف تعمل المنصة؟</h3>
                        <p>
                            يمكنك ملء استمارة التقديم بسرعة وسهولة.
                            <br />
                            سيقوم فريقنا بمراجعة طلبك والاتصال بك قريبًا.
                        </p>
                    </div>

                    <ApplicationForm lp="lp_2" />
                </div>
            </div>
        </main>
    )
}
