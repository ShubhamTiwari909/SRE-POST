import React from 'react'
import Link from 'next/link';
import { userStore } from '../store/userStore';

type Tasks = {
    _id?: string;
    title: string;
    description: string,
    userId:string
}

const AllPosts = ({ posts }: {posts: Tasks[]}) => {

    return (
        <ul className='space-y-6 max-h-96 overflow-auto'>
            {posts.map((t) => (
                <li key={t._id} className='rounded-xl bg-white text-slate-900 min-w-[250px]'>
                    <Link href={`/post/${t._id}`}>
                        <div className="flex justify-between bg-violet-900 text-slate-100 p-4 rounded-tl-xl rounded-tr-xl">
                            <p>{t.title}</p>
                            <p>By - {t.userId.split("@")[0]}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default AllPosts