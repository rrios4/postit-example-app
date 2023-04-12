import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AuthPosts } from '@/types/global.interfaces'
import EditPosts from './EditPosts'

type Props = {}

const fetchAllMyPosts = async() => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}

const MyPosts = (props: Props) => {
    const { data, isLoading } = useQuery<AuthPosts>({
        queryFn: fetchAllMyPosts, 
        queryKey: ["auth-posts"]
    })
    if(isLoading) return (
        <main>
            <h1 className='text-xl font-bold'>Posts are loading...</h1>
        </main>
    )
  return (
    <div>
        {data?.Post?.map((post) => (
            <EditPosts 
                key={post.id} 
                id={post.id}
                avatar={data.image}     
                name={data.name}
                title={post.title}
                comments={post.Comment}
            />
        ))}
    </div>
  )
}

export default MyPosts