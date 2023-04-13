import React from 'react'
import Post from '@/components/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { PostType } from '@/types/global.interfaces'


type URL = {
    params: {
      slug: string
    }
    searchParams: string
  }

const fetchPostDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data   
}

const PostDetail = (url: URL) => {
    const {data, isLoading} = useQuery<PostType>({
        queryKey: ["detail-post"],
        queryFn: () => fetchPostDetails(url.params.slug)
    })
    if(isLoading) return (
        <main className='flex min-h-screen flex-col my-4 px-8 py-2'>
            <h1 className='text-xl font-bold mx-auto'>Loading...</h1>
        </main>
    )
    console.log(data)
  return (
    <main className='flex min-h-screen flex-col my-4 px-8 py-2'>
        <h1 className='text-xl font-bold mx-auto'>Welcome to post details page</h1>
    </main>
  )
}

export default PostDetail