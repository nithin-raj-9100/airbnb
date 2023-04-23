import { create } from 'zustand';

type LoginState = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useLoginModal = create<LoginState>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
