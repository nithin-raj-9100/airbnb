'use client';

import { FC } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavouritesClientProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}
const FavouritesClient: FC<FavouritesClientProps> = ({
	currentUser,
	listings,
}) => {
	return (
		<>
			<Container>
				<Heading
					title='Favourites'
					subtitle='List of places that you have liked'
				/>
				<div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4	xl:grid-cols-5 2xl:grid-cols-6'>
					{listings.map(listing => (
						<ListingCard
							currentUser={currentUser}
							key={listing.id}
							data={listing}
						/>
					))}
				</div>
			</Container>
		</>
	);
};
export default FavouritesClient;
