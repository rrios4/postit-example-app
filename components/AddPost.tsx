import React, {useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast'

type Props = {}

const AddPost = (props: Props) => {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    let toastPostID = "hello"

    // Create a post
    const { mutate } = useMutation(
        async (title: string) => await axios.post('/api/posts/addPosts', { title }), {
            onError: (error) => {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success("Post has been made! 🚀", { id: toastPostID })
                setTitle('')
                setIsDisabled(false)
            }
        }
    )

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        setIsDisabled(true)
        mutate(title)
    }

  return (
    <form onSubmit={handleSubmit} method='POST'>
        <div className='flex flex-col my-4'>
            <textarea 
                onChange={(e) => setTitle(e.target.value)} 
                name='title' 
                value={title} 
                placeholder='Whats on you mind'
                className='p-4 text-lg rounded-md my-2 bg-gray-200'    
            ></textarea>
        </div>
        <div className='flex items-center justify-between gap-2'>
            <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
            <button 
            disabled={isDisabled} 
            className='py-2 px-4 m-1 bg-blue-500 rounded-xl text-sm text-white outline outline-blue-400 outline-1 font-light disabled:opacity-30 hover:bg-blue-600'
            type='submit'
            >Create a post
            </button>
        </div>
    </form>
  )
}

export default AddPost