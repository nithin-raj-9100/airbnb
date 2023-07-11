import getListingById from '@/app/actions/getListingById  ';
import getUser from '@/app/actions/getUser  ';
import EmptyState from '@/app/components/EmptyState  ';
import ListingClient from './ListingClient';

interface Iparams {
	listingId: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
	const listings = await getListingById(params);

	const currentUser = await getUser();

	if (!listings) return <EmptyState />;

	return (
		<>
			<ListingClient listings={listings} currentUser={currentUser} />
		</>
	);
};
export default ListingPage;
