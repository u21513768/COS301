import { create } from 'zustand';
import { User } from "@supabase/supabase-js";
import { devtools, persist } from 'zustand/middleware';

export interface userStoreInterface {
    user: User | null;
    logoutUser: () => void;
    loginUser: (newUser: User) => void;
}

export const loggedInUserStore = create<userStoreInterface>()(
    devtools(
        persist(
            (set) => ({
                user: null as User | null,
                logoutUser: () => set({ user: null }),
                loginUser: (newUser: User) => set({ user: newUser }),
            }),
            {name: 'user',}
        )
    )
)