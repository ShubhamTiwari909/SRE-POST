import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import Button from './Button';
import Link from 'next/link';
import { userStore } from '../store/userStore';

type Tasks = {
    _id?: string;
    title: string;
    description: string
}

type List = {
    posts: Tasks[];
    handleEdit: (arg: string) => void;
    handleDelete: (arg: string) => void;
}

const List = ({ posts, handleEdit, handleDelete }: List) => {
    const email = userStore(state => state.email)

    return (
        <ul className='space-y-6 max-h-96 overflow-auto'>
            {posts.map((t) => (
                <li key={t._id} className='rounded-xl bg-white text-slate-900 min-w-[250px]'>
                    <Link href={`/post/${t._id}`}>
                        <div className="flex bg-violet-900 text-slate-100 p-4 rounded-tl-xl rounded-tr-xl">
                            <p>{t.title}</p>
                            <div className='ml-auto space-x-2'>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleEdit(t._id as string)
                                }} className='border border-blue-300 rounded-full p-1.5'><AiOutlineEdit color="skyblue" size="1.5rem" /></Button>
                                <Button onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleDelete(t._id as string)
                                }} className='border border-red-500 rounded-full p-1.5'><AiOutlineDelete color="red" size="1.5rem" /></Button>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default List