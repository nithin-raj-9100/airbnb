import { create } from 'zustand';

type searchState = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useSearchModal = create<searchState>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
