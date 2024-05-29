import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: JSON.parse(sessionStorage.getItem('user'))?.user,
    accessToken: JSON.parse(sessionStorage.getItem('user'))?.accessToken.accessToken,
    login(userLogin) {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData) {
            set(() => ({
                user: userData.user,
                accessToken: userData.accessToken.accessToken,
            }));
        }
    },
    logout() {
        set(() => ({ user: null, accessToken: '' }));
    },
}));
