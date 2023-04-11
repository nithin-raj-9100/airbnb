'use client';

import Image from 'next/image';

const Avatar = () => {
	return (
		<div>
			<Image
				src='/images/placeholder.jpg'
				width={40}
				height={40}
				className='rounded-full'
				alt='avatar'
			/>
		</div>
	);
};
export default Avatar;
