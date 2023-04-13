import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import React,{ useState} from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    setToggle: (toggle: boolean) => void;
    title: string;
    id: string;
}

type UpdateTitleProps = {
    id: string;
    title: string;
}

const EditToggle = (props: Props) => {
    const { setToggle, title, id } = props
    const queryClient = useQueryClient();
    const [edittedTitle, setEdittedTitle] = useState(title)
    let toastPostID = "hello"

    const { mutate } = useMutation(
        async(title:string) => await axios.patch(`/api/posts/updatePost/${id}`, { title }), {
            onError: (error) => {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                console.log(error)
            },
            onSuccess: (data) => {
                console.log(data)
                toast.success("Post has been made! 🚀", { id: toastPostID })
                queryClient.invalidateQueries(["posts"])
                setEdittedTitle('')
            }
        }
    )

    const handleEditTitleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        toastPostID = toast.loading("Updating your post", { id: toastPostID })
        mutate(edittedTitle)
    }

  return (
    <div className='fixed bg-black/50 w-full h-full z-20 left-0 top-0 backdrop-blur-sm'>
    <form method='PATCH' onSubmit={handleEditTitleSubmit}>
        <div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-4'>
            <h2 className='text-xl text-center font-bold'>Edit your post here.</h2>
            <h3 className='text-slate-500 text-sm font-light text-center'>You can edit the post you made here in this textbox.</h3>
                <textarea name='title' onChange={(e) => setEdittedTitle(e.target.value)} value={`${edittedTitle}`} className='p-4 rounded-lg bg-gray-300 w-[250px] h-[300px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[200px]'></textarea>

            <div className='flex gap-4 ml-auto'>
                <button type='submit' className='py-2 px-4 m-1 bg-blue-500 rounded-xl text-sm text-white outline outline-blue-400 outline-1 font-light disabled:opacity-30 hover:bg-blue-600'>
                    Save
                </button>
                <button onClick={(e) => { setToggle(false) }}  className='py-2 px-4 m-1 bg-slate-200 rounded-xl text-sm text-black outline outline-slate-300 outline-1 font-light disabled:opacity-30 hover:bg-slate-400'>Cancel</button>
            </div>
        </div>
    </form>
    </div>
  )
}

export default EditToggle