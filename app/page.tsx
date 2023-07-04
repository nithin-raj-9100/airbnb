import getListings from './actions/getListings';
import Container from './components/Container';
import EmptyState from './components/EmptyState';

export default async function Home() {
	const isEmpty = true;

	const listings = await getListings();

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
					<div className=''>My listings</div>
				</div>
			</Container>
		</div>
	);
}
