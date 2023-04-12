import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddPost from '@/components/AddPost'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Post from '@/components/Post'
import { PostType } from '@/types/global.interfaces'

const inter = Inter({ subsets: ['latin'] })

// Fetch all posts
const allPosts = async() => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts, 
    queryKey: ["posts"],
  })
  if(error) return (
    <main className='flex min-h-screen flex-col my-4 px-8 py-2'>
        <h1 className='text-2xl mx-auto'>{error as any}</h1>
    </main>
  )
  if(isLoading) return (
      <main className='flex min-h-screen flex-col my-4 px-8 py-2'>
          <h1 className='text-xl font-bold mx-auto'>Loading...</h1>
      </main>
    )
  // console.log(data)
  return (
    <main className="flex min-h-screen flex-col my-4 px-8 py-2">
      <AddPost/>
      {data?.map((post: any) => (
        <Post key={post.id} comments={post.Comment} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id} email={post.user.email}/>
      ) )}
    </main>
  )
}
