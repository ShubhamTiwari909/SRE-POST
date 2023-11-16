"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from './components/molecules/Hero'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("user-loggedin") === "false") {
      router.push("/signup")
      console.log("hello")
    }
  }, [])
  return (
    <div>
     <Hero />
    </div>
  )
}

export default Home