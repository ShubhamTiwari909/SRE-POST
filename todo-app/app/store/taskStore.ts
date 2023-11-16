import { create } from 'zustand'

type State = {
  title: string
  description: string,
  likes:[],
  likesCount:number
}

type Action = {
  updateTitle: (title: State['title']) => void
  updateDescription: (description: State['description']) => void
}

// Create your store, which includes both state and (optionally) actions
export const taskStore = create<State & Action>((set) => ({
  title: '',
  description: '',
  likes:[],
  likesCount:0,
  updateTitle: (title) => set(() => ({ title: title })),
  updateDescription: (description) => set(() => ({ description: description })),
}))