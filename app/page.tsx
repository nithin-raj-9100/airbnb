import getListings from './actions/getListings';
import getUser from './actions/getUser';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';

export default async function Home() {
	const listings = await getListings();

	const currentUser = await getUser();

	if (listings?.length === 0) {
		return (
			<div className=''>
				<EmptyState shouldReset />
			</div>
		);
	}

	return (
		<div className=''>
			<Container>
				<div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
					<>
						{listings?.map(listing => (
							<div key={listing.id}>
								<ListingCard
									key={listing.id}
									data={listing}
									currentUser={currentUser}
								/>
							</div>
						))}
					</>
				</div>
			</Container>
		</div>
	);
}
