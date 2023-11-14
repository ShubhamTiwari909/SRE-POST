import React, { useState } from 'react'
import Button from './Button';
import InputText from './Input';
import { userStore } from '../store/userStore';

type Form = {
    handleSubmit: (e: React.FormEvent) => void | any;
}

const Form = ({ handleSubmit }: Form) => {

  const isLogin = userStore(state => state.isLogin)
  const setIsLogin = userStore(state => state.updateIsLogin)
  const name = userStore(state => state.name)
  const setName = userStore(state => state.updateName)
  const email = userStore(state => state.email)
  const setEmail = userStore(state => state.updateEmail)

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-4 bg-slate-100 text-slate-900 rounded-lg p-10 min-w-[300px]'>
            <InputText
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputText
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className='px-4 py-2 rounded-full bg-green-600 text-slate-100'>{isLogin ? "Login" : "Signup"}</Button>
            <div className='flex gap-2'>
                <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                <Button type='button' className='text-blue-500 underline' onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</Button>
            </div>
        </form>
    )
}

export default Form