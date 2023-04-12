import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  props?: React.ReactNode;
  name: string;
  avatar: string;
  postTitle: string;
  id: string;
  email: string;
}

const Post = (props: Props) => {
  const { name, avatar, postTitle, id, email } = props
  const { data: session, status } = useSession();

  // Delete post
  const deletePost = useMutation((id) => {
    return axios.delete(`/api/posts/deletePosts`);
  })
  return (
    <div className='bg-white my-2 p-8 rounded-xl dark:bg-slate-800'>
        <div className='flex items-center gap-2'>
            <Image
                className='rounded-full'
                width={32}
                height={32}
                src={avatar}
                alt='avatar'
            />
            <h3 className='font-bold text-gray-700 dark:text-gray-200'>{name}</h3>
            {!session && <>

            </>}
            {session && <>

            </>}
            {session?.user?.email === email && <>
              <button className='ml-auto py-2 px-2 hover:bg-red-500 rounded-lg hover:text-white'>
                <Trash size={'15px'}/>
              </button> 
            </>}
        </div>
        <div className='my-4'>
            <p className='break-all'>{postTitle}</p>
        </div>
        <div className='flex gap-4 cursor-pointer items-center'>
          <Link href={`/post/${id}`}>
            <p className='text-sm font-bold text-gray-700 dark:text-slate-200'>Comments</p>
          </Link>
        </div>
    </div>
  )
}

export default Post