import Image from 'next/image';

const Avatar: React.FC<{
	src: string | null | undefined;
}> = ({ src }) => {
	return (
		<div>
			<Image
				src={src || '/images/placeholder.jpg'}
				width={40}
				height={40}
				className='rounded-full'
				alt='avatar'
			/>
		</div>
	);
};
export default Avatar;
