import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddPost from '@/components/AddPost'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col my-4 px-8 py-2">
      {/* <h1>Hello Next! 👋</h1> */}
      <AddPost/>
    </main>
  )
}
