import EmptyState from '../components/EmptyState';
import getUser from '../actions/getUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const page = async () => {
	const currentUser = await getUser();

	if (!currentUser)
		<EmptyState title='Unauthorized' subtitle='Please Login' />;

	const reservations = await getReservations({ userId: currentUser?.id });

	if (reservations.length === 0)
		<EmptyState
			title='No Trips'
			subtitle='You have not reserved any trips'
		/>;

	return (
		<TripsClient reservations={reservations} currentUser={currentUser} />
	);
};

export default page;
