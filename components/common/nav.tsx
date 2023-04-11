import Link from 'next/link'
import React from 'react'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

type Props = {}

const Nav = (props: Props) => {
    const { data: session, status } = useSession();
  return (
    <nav className='flex justify-between items-center py-6'>
        <Link href={"/"}>
            <h1 className='font-extrabold text-xl'>POST IT</h1>
        </Link>
        <div className='flex gap-3'>
            <ul className='flex items-center gap-6'>
                {!session?.user && <>
                    <li className='list-none'>
                        <button onClick={() => signIn()} className='text-sm bg-gray-300 py-2 px-6 rounded-xl disabled:opacity-25 outline outline-1 outline-slate-400 dark:bg-slate-800 dark:outline-slate-700'>
                            Sign In
                        </button>
                    </li>
                </>}
                {session?.user && <>
                    <li className='flex gap-8 items-center'>
                        <button onClick={() => signOut()} className='text-sm bg-gray-300 py-2 px-6 rounded-xl disabled:opacity-25 outline outline-1 outline-slate-400 dark:bg-slate-800 dark:outline-slate-700'>
                            Sign Out
                        </button>
                        <Link href={"/dashboard"}>
                            <Image className='rounded-full' width={40} height={40} src={ `${session.user.image}` || ""} alt=''/>
                        </Link>
                    </li>
                </>}
            </ul>
        </div>
    </nav>
  )
}

export default Nav