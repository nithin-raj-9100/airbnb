import getListingById from '@/app/actions/getListingById  ';
import getUser from '@/app/actions/getUser  ';
import EmptyState from '@/app/components/EmptyState  ';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations  ';

interface Iparams {
	listingId: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
	const listings = await getListingById(params);
	const reservations = await getReservations(params);

	const currentUser = await getUser();

	if (!listings) return <EmptyState />;

	return (
		<>
			<ListingClient
				listings={listings}
				currentUser={currentUser}
				reservations={reservations}
			/>
		</>
	);
};
export default ListingPage;
