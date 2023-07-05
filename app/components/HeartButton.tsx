'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../types';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const hasFavorite = false;

	const toggleFavourite = () => {
		console.log('heart clicked');
	};

	return (
		<div
			onClick={toggleFavourite}
			className='relative cursor-pointer transition hover:opacity-80'
		>
			<AiOutlineHeart
				className='absolute -right-[2px] -top-[2px]  fill-white'
				size={28}
			/>
			<AiFillHeart
				size={24}
				className={hasFavorite ? 'fill-red-500' : 'fill-neutral-500/70'}
			/>
		</div>
	);
};
export default HeartButton;
