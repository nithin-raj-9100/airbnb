import EmptyState from '../components/EmptyState';

import getUser from '../actions/getUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const page = async () => {
	const currentUser = await getUser();

	if (!currentUser)
		return <EmptyState title='Unauthorized' subtitle='Please Login' />;

	// BUG userId should be authorId
	const reservations = await getReservations({ authorId: currentUser?.id });

	if (reservations.length === 0)
		return (
			<EmptyState
				title='No reservations'
				subtitle='Please make a reservation'
			/>
		);

	return (
		<div>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</div>
	);
};
export default page;
