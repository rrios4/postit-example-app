import React, {useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast'

type Props = {
    props?: React.ReactNode;
    refreshData: any;
}

const AddPost = (props: Props) => {
    const { refreshData } = props
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
                refreshData()
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
    <div className='bg-white shadow-xs px-6 pt-2 pb-6 mb-2 rounded-xl dark:bg-slate-800'>
        <form onSubmit={handleSubmit} method='POST'>
            <div className='flex flex-col my-4'>
                <textarea 
                    onChange={(e) => setTitle(e.target.value)} 
                    name='title' 
                    value={title} 
                    placeholder='What is on you mind... 🤯'
                    className='p-4 text-lg rounded-md my-2 bg-slate-200 dark:bg-slate-700'    
                ></textarea>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700 dark:text-red-400" : "text-gray-700 dark:text-gray-200"}`}>{`${title.length}/300`}</p>
                <button 
                disabled={isDisabled} 
                className='py-2 px-4 m-1 bg-blue-500 rounded-xl text-sm text-white outline outline-blue-400 outline-1 font-light disabled:opacity-30 hover:bg-blue-600'
                type='submit'
                >Create a post
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddPost