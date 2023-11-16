"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface Task {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  userId?:string;
}


const page = ({ params }: { params: { slug: string } }) => {
  const [tasks, setTask] = useState<Task>({ title: "", description: "", imageUrl: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${params.slug}`).then((response) => {
      setTask(response.data);
    }).catch(function (error) {
      console.log(error)
    });
  }, []);
  return (
    <div className='grid place-items-center min-h-screen bg-slate-900'>
      <div className='rounded-xl bg-slate-100 text-slate-000 text-center overflow-hidden md:min-w-[400px]'>
        <div>
          <img src={tasks?.imageUrl} className='w-full max-h-[300px] object-fill' />
        </div>
        <div className='flex justify-between px-4 py-4 bg-gradient-to-r from-violet-600 via-purple-700 to-pink-800 text-white'>
          <p>{tasks?.userId?.split("@")[0]}</p>
          <p>{tasks?.title}</p>
        </div>
        <p className='px-4 py-8 min-h-[100px] overflow-auto h-40 max-w-[400px]'>{tasks?.description}</p>
      </div>
    </div>
  )
}

export default page
