import React from 'react'
import Button from '../atoms/Button';
import InputText from '../atoms/Input';
import { statesStore } from '../../store/states';

type Form = {
    handleSubmit: (e: React.FormEvent) => void | any;
    cancelEdit: () => void;
}

const Form = ({ handleSubmit,cancelEdit }: Form) => {
    const post = statesStore(state => state.post)
    const editing = statesStore(state => state.editing)
    const setPost = statesStore(state => state.updatePost)
    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-4'>
            <InputText
                placeholder="Task title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <InputText
                placeholder="Task description"
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
            />
            <Button type="submit" className='px-4 py-2 rounded-full bg-green-600'>{editing ? 'Update Task' : 'Add Task'}</Button>
            {editing && <button onClick={cancelEdit} className='px-4 py-2 rounded-full bg-red-600'>Cancel</button>}
        </form>
    )
}

export default Form