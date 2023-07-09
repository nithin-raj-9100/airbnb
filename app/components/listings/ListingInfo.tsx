'use client';

import useCountries from '@/app/hooks/useCountries  ';
import { User } from '@prisma/client';
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

interface ListingInfoProps {
	user: User;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category:
		| {
				label: string;
				icon: IconType;
				description: string;
		  }
		| undefined;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	bathroomCount,
	category,
	description,
	guestCount,
	locationValue,
	roomCount,
	user,
}) => {
	const { getByValue } = useCountries();

	const coordinates = getByValue(locationValue)?.lating;

	console.log(category);

	return (
		<div className='col-span-4 flex flex-col gap-8 '>
			<div className='flex flex-col gap-2 '>
				<div className='flex items-center gap-2 text-xl font-semibold '>
					<div className='pr-2'>Hosted By {user?.name}</div>
					<Avatar src={user.image} />
				</div>
				<div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
					<div className=''>
						{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
					</div>
					<div className=''>
						{roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
					</div>
					<div className=''>
						{bathroomCount}{' '}
						{bathroomCount === 1 ? 'Bathroom' : 'Bathrooms'}
					</div>
				</div>
			</div>

			<hr />

			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}

			<hr />

			<div className='text-lg font-light text-neutral-500 '>
				{description}
			</div>

			<hr />

			<Map center={coordinates} />
		</div>
	);
};
export default ListingInfo;
