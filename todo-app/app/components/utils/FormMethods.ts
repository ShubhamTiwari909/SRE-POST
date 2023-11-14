import axios from 'axios';
import React from 'react';

type Task = {
    _id?:string;
    title:string;
    description:string;
}

type Edit = {
    id:string;
    tasks:Task[];
    setTaskId:(args:string|null) => void;
    setEditing:(args:boolean) => void;
    setTask:(args:Task) => void;
}

type CancelEdit = {
    setEditing:(args:boolean) => void;
    setTask:(args:Task) => void;
}

type Delete = {
    id:string;
    tasks:Task[];
    setTasks:(args:Task[]) => void;
}

type Form = {
    e:React.FormEvent;
    task:Task;
    tasks:Task[];
    handleSubmit:(args:any) => void | any;
    setTasks:(args:Task[]) => void;
    setTask:(args:Task) => void;
    setEditing:(args:boolean) => void;
    setTaskId:(args:string|null) => void;
    editing:boolean;
    taskId:string | null
}


export const handleSubmit = ({e,task,setTasks,tasks,taskId,editing,setTask,setEditing,setTaskId}:Form) => {
    e.preventDefault();

    if (task.title === "" || task.description === "") {
        console.log("Fill all the input fields")
    }
    else {
        if (editing) {
            // Update an existing task
            axios.put(`http://localhost:5000/api/posts/${taskId}`, task).then((response) => {
                const updatedTasks = tasks.map((t) => (t._id === taskId ? response.data : t));
                setTasks(updatedTasks);
            });
        } else {
            // Create a new task
            axios.post('http://localhost:5000/api/posts', task).then((response) => {
                setTasks([...tasks, response.data]);
            });
        }

        // Clear the form
        setTask({ _id: '', title: '', description: '' });
        setEditing(false);
        setTaskId(null);
    }
};

export const handleEdit = ({id,tasks,setTask,setEditing,setTaskId}:Edit) => {
    // Load task data for editing
    const taskToEdit = tasks.find((t) => t._id === id);
    if (taskToEdit) {
        setTask(taskToEdit);
        setEditing(true);
        setTaskId(id);
    }
};

export const handleDelete = ({id,tasks,setTasks}:Delete) => {
    // Delete a task
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
        const updatedTasks = tasks.filter((t) => t._id !== id);
        setTasks(updatedTasks);
    });
};

export const cancelEdit = ({setEditing,setTask}:CancelEdit) => {
    setEditing(false)
    setTask({ title: "", description: "" })
}