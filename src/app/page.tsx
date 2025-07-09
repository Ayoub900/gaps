import { db } from "@/lib/db/prisma";
import Image from "next/image";
import PostCard from "./_components/PostCard";
import Link from "next/link";

export default async function Home() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      publish: true
    }
  })
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050c45] px-4 md:px-24 relative">
        <Image className="object-cover opacity-50 w-full h-screen -z-0" src="/hero_bg.jpeg" fill alt="bg" />
        <div className="z-0 -mt-12 flex flex-col justify-center items-center">
          <Image src="/logo_gaps4.png" width={300} height={300} alt="logo" />
          {/* <h1 className='leading-[14px] mb-4 text-white text-2xl font-semibold text-red-bg-red-950'>
            GAPS Academy
          </h1> */}
          <p className="text-white/80 max-w-5xl -mt-4 text-balance justify-center text-center">
            Global Academy of Professional Skills is a UK-based institution specialized in delivering high-quality professional training and skills development programs. It empowers individuals through practical, career-oriented education across various sectors.
          </p>
        </div>

        <div className="flex absolute bottom-2 left-2">
          <Image src="/UK-1.png" width={70} height={70} alt="uk" />
          <Image src="/UK-2.png" width={70} height={70} alt="uk" />
        </div>
      </div>

      <div id="accreditation" className="gap-4 mx-auto my-12 flex flex-col justify-center md:flex-row px-4 md:px-24">
        <Image className="bg-[#050c45] md:max-w-[380px] md:max-h-[380px]" src="/logo_gaps2.png" width={500} height={500} alt="logo" />
        <div className="space-y-4 text-center flex flex-col">
          <div className="flex flex-col w-full border border-[#050c45]">
            <h1 className="p-4 text-center justify-center bg-[#050c45] hover:bg-[#050c45] text-white/80">Verification</h1>
            <div className="p-4 flex flex-col space-y-4">
              <Link className="flex text-center justify-center p-4 w-full bg-[#e49400] hover:bg-amber-600 " href="/verification"><Image src="/link.svg" width={20} height={20} alt="logo" /></Link>
              <h1>Verification</h1>
            </div>
          </div>
          <div className="flex flex-col w-full border border-[#050c45]">
            <h1 className="p-4 text-center justify-center bg-[#050c45] hover:bg-[#050c45] text-white/80">Diploma</h1>
            <div className="p-4 flex flex-col space-y-4">
              <Link className="flex text-center justify-center p-4 w-full bg-[#e49400] hover:bg-amber-600 " href="/international-diploma"><Image src="/link.svg" width={20} height={20} alt="logo" /></Link>
              <h1>International Diploma</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 md:px-24 py-10">
        <h1 className="text-4xl font-semibold text-black mt-24 mb-4 mx-auto">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-20 mb-8">
          {posts && posts.length > 0 &&
            posts.map((a) => (
              <PostCard key={a.id} post={a} />
            ))
          }
        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center px-4 md:px-24 relative space-y-4">
        <h1 className="text-3xl mb-6">Our Partners</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <Image className="object-contain border border-red-800 border-opacity-40" src="/logo_asba.png" width={200} height={200} alt="asba" />
          <Image className="object-contain" src="/logo_it.png" width={200} height={200} alt="it" />
        </div>
      </div>
    </>
  );
}
