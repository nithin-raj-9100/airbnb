import EmptyState from '../components/EmptyState';
import getUser from '../actions/getUser';
import getFavouriteListings from '../actions/getFavouriteListings';
import FavouritesClient from './FavouritesClient';

const page = async () => {
	const listings = await getFavouriteListings();
	const currentUser = await getUser();

	if (listings.length === 0)
		return (
			<>
				<EmptyState
					title='No favourites found'
					subtitle='Looks like you have no favourites yet.'
				/>
			</>
		);

	return (
		<>
			<FavouritesClient listings={listings} currentUser={currentUser} />
		</>
	);
};

export default page;
