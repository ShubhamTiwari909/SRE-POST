"use client"
import React from 'react'
import Button from '../atoms/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@mantine/hooks'

const Navbar = () => {

    const router = useRouter()
    const [userLoggedin, setUserLoggedin] = useLocalStorage({ key: 'user-loggedin', defaultValue: false });

    const handleLogout = () => {
        setUserLoggedin(false)
        router.push("/signup")
    }
    return (
        userLoggedin &&
        <nav>
            <div className='flex justify-between items-center p-2'>
                <div className='space-x-4'>
                    <Link href="/">Home</Link>
                    <Link href="/posts">Posts</Link>
                    <Link href="/my-posts">My Posts</Link>
                </div>
                <Button className='px-4 py-2 rounded-full bg-red-600 text-slate-100 ' onClick={handleLogout}>Logout</Button>
            </div>
        </nav>

    )
}

export default Navbar