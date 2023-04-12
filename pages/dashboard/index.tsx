import { useSession, getSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/router'
import MyPosts from './MyPosts'

type Props = {}

const Dashboard = (props: Props) => {
    const router = useRouter();
    const { data: session, status } = useSession()
    if(status === "loading"){
        return (
            <main className="flex min-h-screen flex-col my-4 px-8 py-2">
                <h1 className='text-xl font-bold'>Loading...</h1>
            </main>
        )
    }
    if(status === "unauthenticated"){
        if(!session){
            router.push('/')
        }
        return (
            <main className="flex min-h-screen flex-col my-4 px-8 py-2">
            <h1 className='text-xl font-bold'>Access Denied 🚨</h1>
        </main>
        )
    }
  return (
    <main className="flex min-h-screen flex-col my-4 px-8 py-2">
        <h1 className='text-xl font-bold'>Welcome back, <span className='text-blue-500'>{session?.user?.name}</span> 👋</h1>
        <MyPosts/>
    </main>
  )
}

export default Dashboard