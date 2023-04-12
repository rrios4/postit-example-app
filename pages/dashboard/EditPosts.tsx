import React, { useState } from 'react'
import Image from 'next/image'
import Toggle from '@/components/Dashboard/Toggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Props = {
    props?: React.ReactNode;
    id: string;
    avatar: string;
    name: string;
    title: string;
    comments?: {
        id: string;
        postId: string;
        userId: string;
    }; 
}

const EditPosts = (props: Props) => {
    const { avatar, name, title, comments, id } = props
    const queryClient = useQueryClient()
    const [toggle, setToggle] = useState(false);
    let deleteToastID: string = 'hellow'
    
    // Delete post
    const { mutate } = useMutation(
        async (id:string) => 
            await axios.delete(`/api/posts/deletePost/${id}`),
            {
                onError: (error) => {
                    console.log(error)
                    toast.error("Error deleting that post", { id: deleteToastID })
                },
                onSuccess: (data) => {
                    toast.success('Post has been deleted.', { id: deleteToastID })
                    queryClient.invalidateQueries(["auth-posts"])
                    console.log(data)
                }
            }
    )

    const handleDeletePost = () => {
        deleteToastID = toast.loading("Deleting your post...", { id: deleteToastID });
        mutate(id);
    }
  return (
    <>
        <div className='bg-white dark:bg-slate-800 my-8 p-8 rounded-lg shadow-md'>
            <div className='flex gap-4 mb-6'>
                <Image width={32} height={32} src={avatar} alt='avatar' className='rounded-full'/>
                <h3 className='font-bold text-gray-700 my-auto'>{name}</h3>
            </div>
            <div className='my-8'>
                <p className='break-all'>{title}</p>
            </div>
            <div className='flex items-center gap-4'>
                <p className='text-sm font-bild text-gray-700'>
                    {comments?.length} Comments
                </p>
                <button onClick={(e) => {
                    setToggle(true)
                }} className='ml-auto py-2 px-4 m-1 bg-red-500 rounded-xl text-sm text-white outline outline-red-400 outline-1 font-light disabled:opacity-30 hover:bg-red-600'>Delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={handleDeletePost} setToggle={setToggle}/>}
    </>
  )
}

export default EditPosts