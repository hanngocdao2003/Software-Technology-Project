import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: null,
    accessToken: '',
    login(userLogin) {
        set((state) => ({
            user: userLogin.user,
            accessToken: userLogin.accessToken,
        }));
    },
    logout() {
        set(() => ({ user: null, accessToken: '' }));
    },
}));
