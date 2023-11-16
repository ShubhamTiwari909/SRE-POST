"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'

import axios from 'axios';
import List from '../components/organisms/MyPosts';
import Form from '../components/molecules/Form';
import FileUpload from "../components/atoms/FileUpload"
import { statesStore } from '../store/states';
import { userStore } from '../store/userStore';
import { useEdgeStore } from '../lib/edgestore';


function MyPosts() {
  const router = useRouter()

  const myPosts = statesStore(state => state.myPosts)
  const post = statesStore(state => state.post)
  const editing = statesStore(state => state.editing)
  const taskId = statesStore(state => state.taskId)
  const setMyPosts = statesStore(state => state.updateMyPosts)
  const setPost = statesStore(state => state.updatePost)
  const setEditing = statesStore(state => state.updateEditing)
  const setTaskId = statesStore(state => state.updateTaskId)
  const setProgress = statesStore(state => state.updateProgress)
  const progress = statesStore(state => state.progress)


  const userId = userStore(state => state.userId)

  const { edgestore } = useEdgeStore();


  useEffect(() => {
    if (localStorage.getItem("user-loggedin") === "false") {
      router.push("/signup")
    }
  }, [])
  // Fetch posts from the API
  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/my-posts/${localStorage.getItem("userId")}`).then((response) => {
      setMyPosts(response.data);
    }).catch(err => console.log("Error"));
  }, [userId]);

  // Handle the Form Submit method
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (post.title === "" || post.description === "") {
      console.log("Fill all the input fields")
    }
    else {
      if (editing) {
        // Update an existing post
        axios.put(`http://localhost:5000/api/posts/${taskId}`, { ...post, userId: localStorage.getItem("userId") }).then((response) => {
          const updatedTasks = myPosts.map((t) => (t._id === taskId ? response.data : t));
          setMyPosts(updatedTasks);
          setProgress(0)
        });
      } else {
        // Create a new post
        axios.post('http://localhost:5000/api/posts', { ...post, userId: localStorage.getItem("userId") }).then((response) => {
          setMyPosts([...myPosts, response.data]);
          setProgress(0)
        });
      }

      // Clear the form
      setPost({ title: '', description: '', imageUrl: '' });
      setEditing(false);
      setTaskId(null);
    }
  };

  // Handle the Update event
  const handleEdit = (id: string) => {
    // Load post data for editing
    const taskToEdit = myPosts.find((t) => t._id === id);
    if (taskToEdit) {
      setPost(taskToEdit);
      setEditing(true);
      setTaskId(id);
    }
  };

  // Handle the Delete event
  const handleDelete = async (id: string) => {
    // Delete a post
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(async (response) => {
      console.log(response.data.imageUrl)
      const updatedTasks = myPosts.filter((t) => t._id !== id);
      setMyPosts(updatedTasks);
      await edgestore.publicFiles.delete({
        url: response?.data?.imageUrl,
      });
    });
  };

  // Cancel the Update event
  const cancelEdit = () => {
    setEditing(false)
    setPost({ title: "", description: "", imageUrl: "" })
  }

  return (
    <div className='grid place-items-center min-h-screen bg-slate-900 text-slate-100 text-center py-8'>
      <div className='space-y-6 md:max-w-[500px] md:min-w-[500px]'>
        <h1>Task Manager</h1>
        <Form handleSubmit={handleSubmit} cancelEdit={cancelEdit} />
        <List posts={myPosts} handleEdit={handleEdit} handleDelete={handleDelete} />
        <div style={{width:`${progress}%`}} className='bg-green-400'>{progress}</div>
        <FileUpload />
      </div>
    </div>
  );
}

export default MyPosts;