'use client';

import useCountries from '@/app/hooks/useCountries  ';
import { SafeUser } from '@/app/types  ';
import { User } from '@prisma/client';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
	title: string;
	locaionValue: string;
	imageSrc: string;
	id: string | null | undefined;
	currentUser?: User | SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
	id,
	imageSrc,
	locaionValue,
	title,
	currentUser,
}) => {
	const { getByValue } = useCountries();

	const location = getByValue(locaionValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
				<Image
					alt='Image'
					src={imageSrc}
					fill
					priority
					sizes='(min-width: 1024px) 300px, 100vw'
					className='w-full object-cover '
				/>
				<div className='absolute right-5 top-5'>
					{/* @ts-ignore */}
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
};

export default ListingHead;
