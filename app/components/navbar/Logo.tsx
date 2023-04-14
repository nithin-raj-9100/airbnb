'use client';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Logo = () => {
	// const router = useRouter();

	return (
		<div>
			<Image
				alt='Logo'
				className='hidden w-auto cursor-pointer md:block'
				height='100'
				width='100'
				src='/images/logo.png'
				priority
				// onClick={() => router.push('/')}
			/>
		</div>
	);
};
export default Logo;
