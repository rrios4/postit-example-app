import React from 'react'
import Image from "next/image";
import Link from "next/link";

type Props = {
  props: React.ReactNode;
  name: string;
  avatar: string;
  postTitle: string;
  id: string;
}

const Post = (props: Props) => {
  const { name, avatar, postTitle, id } = props
  return (
    <div className='bg-white my-2 p-8 rounded-xl'>
        <div className='flex items-center gap-2'>
            <Image
                className='rounded-full'
                width={32}
                height={32}
                src={avatar}
                alt='avatar'
            />
            <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-4'>
            <p className='break-all'>{postTitle}</p>
        </div>
        <div className='flex gap-4 cursor-pointer items-center'>
          <Link href={`/post/${id}`}>
            <p className='text-sm font-bold text-gray-700'>Comments</p>
          </Link>
        </div>
    </div>
  )
}

export default Post