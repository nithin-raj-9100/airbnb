'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
			className='relative cursor-pointer transition hover:opacity-80'
		>
			<AiOutlineHeart
				className='absolute -right-[2px] -top-[2px]  fill-white'
				size={28}
			/>
			<AiFillHeart
				size={24}
				className={
					hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70'
				}
			/>
		</div>
	);
};
export default HeartButton;
