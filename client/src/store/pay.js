import { create } from 'zustand';

export const usePayTicket = create((set) => ({
    amount: 0,
    description: '',
    idVehicle: null,
    setAmount: (amount, idVehicle) =>
        set((state) => ({
            ...state, // Cần mở đầu đối tượng mới để sử dụng spread operator
            amount: amount,
            idVehicle: idVehicle, // Sửa lại cách gán giá trị
        })),
    setDescription: (description, idVehicle) =>
        set((state) => ({
            ...state,
            description: description,
            idVehicle: idVehicle,
        })),
}));
