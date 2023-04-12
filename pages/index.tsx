import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddPost from '@/components/AddPost'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

// Fetch all posts
const allPosts = async() => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts, 
    queryKey: ["posts"]
  })
  if(error) return error
  if(isLoading) return "Loading..."
  // console.log(data)
  return (
    <main className="flex min-h-screen flex-col my-4 px-8 py-2">
      {/* <h1>Hello Next! 👋</h1> */}
      <AddPost/>
      {data?.map((post: any) => (
        <Post key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id}/>
      ) )}

    </main>
  )
}
