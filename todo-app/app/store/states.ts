import { create } from 'zustand'

type Post = {
    _id?: string;
    title: string;
    description: string;
    imageUrl:string,
    likes:[],
    likesCount:number
}

type State = {
    userExist: boolean,
    userSaved: boolean,
    posts: Post[],
    post: Post,
    myPosts: Post[],
    editing: boolean,
    taskId: string | null,
    progress:number
}

type Action = {
    updateUserExist: (userExist: State['userExist']) => void,
    updateUserSaved: (userSaved: State['userSaved']) => void,
    updatePosts: (posts: State['posts']) => void,
    updateMyPosts: (myPosts: State['myPosts']) => void,
    updatePost: (post: State['post']) => void,
    updateEditing: (editing: State['editing']) => void,
    updateTaskId: (taskId: State['taskId']) => void,
    updateProgress: (progress: State['progress']) => void,
}

// Create your store, which includes both state and (optionally) actions
export const statesStore = create<State & Action>((set) => ({
    userExist: false,
    userSaved: false,
    posts: [],
    myPosts: [],
    post: { title: '', description: '',imageUrl:'',likes:[],likesCount:0 },
    editing: false,
    taskId: null,
    progress:0,
    updateUserExist: (userExist) => set(() => ({ userExist: userExist })),
    updateUserSaved: (userSaved) => set(() => ({ userSaved: userSaved })),
    updatePosts: (posts) => set(() => ({ posts: posts })),
    updateMyPosts: (myPosts) => set(() => ({ myPosts: myPosts })),
    updatePost: (post) => set(() => ({ post: post })),
    updateEditing: (editing) => set(() => ({ editing: editing })),
    updateTaskId: (taskId) => set(() => ({ taskId: taskId })),
    updateProgress: (progress) => set(() => ({ progress: progress })),
}))
