import { create } from 'zustand';

export const useInformationStore = create((set) => ({
    name: '',
    phoneNumber: 0,
    email: '',
    handleChanges: (updates) => set((state) => ({ ...state, ...updates })),
}));
