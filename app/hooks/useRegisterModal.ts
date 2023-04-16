import { create } from 'zustand';
type RegisterModalState = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useRegisterModal = create<RegisterModalState>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
