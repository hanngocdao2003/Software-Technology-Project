import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: null,
    accessToken: '',
    login: (userLogin) =>
        set((state) => {
            state.user = userLogin.user;
            state.accessToken = userLogin.accessToken;
        }),
    logout: () => set(() => ({ user: null })),
}));
