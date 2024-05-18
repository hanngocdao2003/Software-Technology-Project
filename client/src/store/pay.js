import { create } from 'zustand';

export const usePayTicket = create((set) => ({
    amount: 0,
    description: '',
    setAmount: (amount) =>
        set((state) => ({
            ...state, // Cần mở đầu đối tượng mới để sử dụng spread operator
            amount: amount, // Sửa lại cách gán giá trị
        })),
    setDescription: (description) =>
        set((state) => ({
            ...state,
            description: description,
        })),
}));
