'use client';

// [ ]internal imports
import Container from '@/app/components/Container  ';
import { categories } from '@/app/components/navbar/Categories  ';
// import { SafeUser } from '@/app/types  ';
import { Listing, Reservation, User } from '@prisma/client';

import ListingHead from '@/app/components/listings/ListingHead  ';

import { useMemo } from 'react';
import ListingInfo from '@/app/components/listings/ListingInfo  ';

interface ListingClientProps {
	reservation?: Reservation[];
	listings: Listing & {
		user: User;
	};
	currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
	listings,
	currentUser,
}) => {
	const category = useMemo(() => {
		return categories.find(item => item.label === listings?.category);
	}, [listings?.category]);

	return (
		<div>
			<Container>
				<div className='mx-auto max-w-lg'>
					<div className='flex flex-col gap-6'>
						<ListingHead
							title={listings?.title}
							imageSrc={listings?.imageSrc}
							locaionValue={listings?.locationValue}
							currentUser={currentUser}
							id={currentUser?.id}
						/>

						<div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
							<ListingInfo
								user={listings.user}
								category={category}
								description={listings.description}
								roomCount={listings.roomCount}
								guestCount={listings.guestCount}
								bathroomCount={listings.bathroomCount}
								locationValue={listings.locationValue}
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
export default ListingClient;
