import { create } from 'zustand'

type State = {
    name: string
    email: string
    userId: string
    isLogin: boolean
}

type Action = {
    updateName: (name: State['name']) => void
    updateEmail: (email: State['email']) => void
    updateUserId: (userId: State['userId']) => void
    updateIsLogin: (isLogin: State['isLogin']) => void
}

// Create your store, which includes both state and (optionally) actions
export const userStore = create<State & Action>((set, get) => ({
    name: '',
    email: '',
    userId: '',
    isLogin: false,
    updateName: (name) => set(() => ({ name: name })),
    updateEmail: (email) => set(() => ({ email: email })),
    updateUserId: (userId) => {
        set(() => ({ userId: userId }));
        // Update local storage when userId changes
        localStorage.setItem('userId', userId);
    },
    updateIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
}))

