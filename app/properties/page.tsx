import EmptyState from '../components/EmptyState';
import getUser from '../actions/getUser';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const page = async () => {
	const currentUser = await getUser();

	if (!currentUser)
		<EmptyState title='Unauthorized' subtitle='Please Login' />;

	const listings = await getListings({
		//@ts-ignore
		userId: currentUser?.id,
	});

	if (listings.length === 0)
		<EmptyState
			title='No Properties Found'
			subtitle='Looks like you have no properties '
		/>;

	return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default page;
