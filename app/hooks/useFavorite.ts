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
					toast.promise(request(), {
						loading: 'Removing from favorites...',
						success: 'Removed!',
						error: 'Something went wrong!',
					});
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
					toast.promise(request(), {
						loading: 'Adding to favorites...',
						success: 'Added!',
						error: 'Something went wrong!',
					});
				}
				await request();
				router.refresh();
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
