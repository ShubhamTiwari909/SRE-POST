"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import { userStore } from '../store/userStore';
import { statesStore } from '../store/states';
import UserForm from '../components/UserForm';

const page = () => {
  const router = useRouter()

  const [userLoggedin, setUserLoggedin] = useLocalStorage({ key: 'user-loggedin', defaultValue: false });

  // User states
  const isLogin = userStore(state => state.isLogin)
  const name = userStore(state => state.name)
  const setName = userStore(state => state.updateName)
  const email = userStore(state => state.email)
  const setEmail = userStore(state => state.updateEmail)
  const setUserId = userStore(state => state.updateUserId)
  const userId = userStore(state => state.userId)


  // Login and saved states
  const userExist = statesStore(state => state.userExist)
  const setUserExist = statesStore(state => state.updateUserExist)

  const userSaved = statesStore(state => state.userSaved)
  const setUserSaved = statesStore(state => state.updateUserSaved)


  useEffect(() => {
    if (userLoggedin) {
      router.push("/")
    }
  }, [userLoggedin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || email === "") {
      console.log("Fill all the input fields")
    }
    else {
      // Login a new user
      if (isLogin) {
        axios.post('http://localhost:5000/api/users/login', { name: name, email: email }).then((response) => {
          if (response?.data?.userExist) {
            setName(response?.data?._doc?.name)
            setEmail(response?.data?._doc?.email)
            setUserId(response?.data?._doc?.email)
            setUserLoggedin(true)
            router.push("/")
          }
        });
      }
      // Creates a new user
      else {
        axios.post('http://localhost:5000/api/users', { name: name, email: email }).then((response) => {
          if (response?.data?.userExist) {
            setUserExist(true)
            setTimeout(() => {
              setUserExist(false)
            }, 2000);
          }
          else {
            setName(response?.data?.name)
            setEmail(response?.data?.email)
            setUserId(response?.data?.email)
            setUserSaved(true)
            setTimeout(() => {
              setUserSaved(false)
              setUserLoggedin(true)
              router.push("/")
            }, 2000);
          }
        });
      }
    }
  };

  return (
    <div className='grid place-items-center min-h-screen bg-slate-900'>
      {userExist && <p className='p-4 w-full bg-white text-red-500 text-2xl text-center fixed top-0'>User Already Exist</p>}
      {userSaved && <p className='p-4 w-full bg-white text-green-500 text-2xl text-center fixed top-0'>Signup successfull</p>}
      <UserForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default page