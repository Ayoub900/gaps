import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-800 px-4 md:px-24 relative">
        <Image className="object-cover w-full h-screen -z-0" src="/bg.png" fill alt="bg" />
        <div className="z-0 -mt-12 flex flex-col justify-center items-center">
          <Image src="/logo_2.png" width={300} height={300} alt="logo" />
          <h1 className='leading-[14px] mb-4 text-white text-2xl font-semibold text-red-bg-red-950'>
            ASB Academy
          </h1>
          <p className="text-white/80 max-w-5xl text-balance justify-center text-center">
            Advanced Skills and Business Academy is an international leading institution dedicated to empowering individuals and organizations by providing internationally recognized accreditations and diplomas for various skills, excluding the medical and pharmaceutical fields. We believe that continuous education and training are the foundations of success and progress, and we are committed to supporting and developing professional and technical skills for all individuals and organizations.
          </p>
        </div>

        <div className="flex absolute bottom-2 left-2">
          <Image src="/UK-1.png" width={70} height={70} alt="uk" />
          <Image src="/UK-2.png" width={70} height={70} alt="uk" />
        </div>
      </div>

      <div id="accreditation" className="gap-4 mx-auto my-12 flex flex-col justify-center md:flex-row px-4 md:px-24">
        <div className="space-y-4 flex flex-col justify-center">
          <h1 className="text-5xl border-b-2 border-red-600 flex w-full"> Trademark warnings complain<Image className="object-contain h-full" src="/warning.svg" width={50} height={50} alt="warning" /></h1>
          <span className="bg-yellow-400 py-1 text-xl">ASBA doesn&apos;t have any websites except www.asba.org.uk, And we do not have any social media pages, </span>
          <p className="my-4 text-xl">
            Advanced Skills and Business Academy (ASBA) is a registered trademark globally and locally,
            you can find our governmental trademark certificate in about us section.
            You can verify our trademark accreditation holders through our official website or via Trademark@asba.org.uk</p>

          <table className="border-gray-300 text-xl">
            <tr>
              <td className="border border-gray-300 p-4">
                Registration number
              </td>
              <td className="border border-gray-300 p-4">
                UK00015865484<br />
              </td>
            </tr>
          </table>
        </div>
        <Image className="bg-red-800 w-full object-contain" src="/warning.png" width={300} height={300} alt="warning" />
      </div>
      <div id="accreditation" className="gap-4 mx-auto my-12 flex flex-col justify-center md:flex-row px-4 md:px-24">
        <Image className="bg-red-800" src="/logo.png" width={500} height={500} alt="logo" />
        <div className="space-y-4 text-center flex flex-col">
          <div className="flex flex-col w-full border border-red-600">
            <h1 className="p-4 text-center justify-center bg-red-600 hover:bg-red-800 text-white/80">Accreditation</h1>
            <div className="p-4 flex flex-col space-y-4">
              <Link className="flex text-center justify-center p-4 w-full bg-black/90 hover:bg-red-800 " href="/institutions-acc"><Image src="/link.svg" width={20} height={20} alt="logo" /></Link>
              <h1>Accreditation Of Institutions</h1>
              <Link className="flex text-center justify-center p-4 w-full bg-black/90 hover:bg-red-800 " href="/instructors-acc"><Image src="/link.svg" width={20} height={20} alt="logo" /></Link>
              <h1>Accreditation Of Instructors</h1>
            </div>
          </div>
          <div className="flex flex-col w-full border border-red-600">
            <h1 className="p-4 text-center justify-center bg-red-600 hover:bg-red-800 text-white/80">Diploma</h1>
            <div className="p-4 flex flex-col space-y-4">
              <Link className="flex text-center justify-center p-4 w-full bg-black/90 hover:bg-red-800 " href="/international-diploma"><Image src="/link.svg" width={20} height={20} alt="logo" /></Link>
              <h1>International Diploma</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center px-4 md:px-24 relative space-y-4">
        <h1 className="text-3xl mb-6">Our Partners</h1>
        <div className="flex flex-wrap justify-center">
          <Image className="object-contain" src="/p3.jpeg" width={200} height={200} alt="p" />
          <Image className="object-contain" src="/p4.png" width={300} height={300} alt="p" />
          <Image className="object-contain mb-6" src="/p5.png" width={300} height={300} alt="p" />
          <Image className="object-contain" src="/p6.png" width={250} height={250} alt="p" />
          <Image className="object-contain" src="/p7.png" width={200} height={200} alt="p" />
        </div>
      </div>
    </>
  );
}
