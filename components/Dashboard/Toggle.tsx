import React from 'react'

type Props = {
    props?: React.ReactNode;
    deletePost: () => void;
    setToggle: (toggle: boolean) => void;
}

const Toggle = (props: Props) => {
    const { deletePost, setToggle } = props
  return (
    <div onClick={(e) => {
        setToggle(false)
    }} className='fixed bg-black/40 w-full h-full z-20 left-0 top-0 backdrop-blur-sm'>
        <div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6'>
            <h2 className='text-xl'>Are you sure you want o delete this post? 😭</h2>
            <h3 className='text-red-500 text-sm font-light'>Pressing the delete button will permenantly delete your post.</h3>
            <button onClick={deletePost} className='mx-auto py-2 px-4 m-1 bg-red-500 rounded-xl text-sm text-white outline outline-red-400 outline-1 font-light disabled:opacity-30 hover:bg-red-600'>
                Delete Post
            </button>
        </div>
    </div>
  )
}

export default Toggle