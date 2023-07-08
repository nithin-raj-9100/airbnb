import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

// [ ]internal imports
import { SafeUser } from '../types';
import { useLoginModal } from './useLoginModal';

interface IUserFavorite {
	listingId: string;
	currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request: () => Promise<any>;
				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
					console.log('delete');
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
					console.log('post');
				}
				await request();
				router.refresh();
				toast.success('Success!');
			} catch (error: any) {
				console.log('error', error);
				toast.error('Something went wrong!');
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router],
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};

export default useFavorite;
