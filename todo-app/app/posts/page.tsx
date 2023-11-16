"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import axios from 'axios';
import { statesStore } from '../store/states';
import AllPosts from '../components/organisms/AllPosts';


function Tasks() {
  const router = useRouter()

  const setPosts = statesStore(state => state.updatePosts)

  useEffect(() => {
    if(localStorage.getItem("user-loggedin") === "false") {
      router.push("/signup")
    }
  },[])
  // Fetch posts from the API
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then((response) => {
      setPosts(response.data);
    });
  }, []);


  return (
    <div className='grid place-items-center min-h-screen bg-slate-900 text-slate-100 text-center py-8'>
      <div className='space-y-6 px-10'>
        <h1>All Posts</h1>
        <AllPosts />
      </div>
    </div>
  );
}

export default Tasks;