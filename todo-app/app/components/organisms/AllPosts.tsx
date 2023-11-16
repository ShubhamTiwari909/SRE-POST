import React from 'react'
import Link from 'next/link';
import { AiOutlineDownload, AiFillLike } from "react-icons/ai"
import axios from 'axios';
import { statesStore } from '../../store/states';

type Like = {
    userId: string
}

type Tasks = {
    _id?: string;
    title: string;
    description: string,
    userId?: string,
    imageUrl: string,
    likesCount: number,
    likes: Like[]
}


const AllPosts = () => {
    const posts: Tasks[] = statesStore(state => state.posts)
    const setPosts = statesStore(state => state.updatePosts)


    const handleLikes = (postId: string | undefined) => {
        axios.post(`http://localhost:5000/api/posts/likes?userId=${localStorage.getItem("userId")}&postId=${postId}`).then((response) => {
            setPosts(response.data)
        }).catch(err => console.log(err));
    }

    const downloadFile = async (url: string) => {
        const fileUrl = url

        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'downloaded_file.png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => {
                const liked = post?.likes.some((like: Like) => like.userId === localStorage.getItem("userId"))
                return (
                    <li key={post._id} className='rounded-xl text-slate-900 min-w-[250px] relative'>
                        <div className='rounded-tr-xl rounded-tl-xl bg-slate-100 text-slate-000 text-center overflow-hidden md:min-w-[400px]'>
                            <div className='flex justify-between px-4 py-4 bg-gradient-to-r from-violet-600 via-purple-700 to-pink-800 text-white'>
                                <p>{post?.userId?.split("@")[0]}</p>
                                <p>{post?.title}</p>
                            </div>
                            <div>
                                <img src={post?.imageUrl} className='w-full max-h-[300px] object-fill' />
                            </div>
                        </div>
                        <Link href={`/post/${post._id}`}></Link>
                        <div className='bg-slate-800 py-2 flex justify-center items-center gap-6 rounded-br-xl rounded-bl-xl'>
                            <button onClick={() => handleLikes(post?._id)} className={`flex items-center gap-1 ${liked ? "text-blue-400" : "text-slate-100"}`}><AiFillLike /> {post?.likesCount}</button>
                            {post?.imageUrl && <button onClick={() => downloadFile(post?.imageUrl)}><AiOutlineDownload size="1.6rem" className="text-slate-100" /></button>}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default AllPosts