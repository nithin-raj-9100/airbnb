'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeReservation, SafeUser } from '../types';
import { th } from 'date-fns/locale';

interface TripsClientProps {
	reservations: SafeReservation[];
	currentUser: SafeUser | null | undefined;
}

const TripsClient: React.FC<TripsClientProps> = ({
	currentUser,
	reservations,
}) => {
	const router = useRouter();
	const [deletionId, setDeletionId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletionId(id);

			const request = () =>
				axios
					.delete(`/api/reservations/${id}`)
					.then(() => {
						router.refresh();
					})
					.catch(error => {
						throw new Error(error.response.data.message);
					})
					.finally(() => {
						setDeletionId('');
					});

			toast.promise(request(), {
				loading: 'Cancelling reservation...',
				success: 'Reservation cancelled',
				error: 'Failed to cancel reservation',
			});
		},
		[router, setDeletionId],
	);

	return (
		<div>
			<Container>
				<Heading
					title='Trips'
					subtitle="Where you've been and where you're going"
				/>
				<div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
					{reservations.map(reservation => (
						<ListingCard
							key={reservation.id}
							data={reservation.listing}
							reservation={reservation}
							actionId={reservation.id}
							onAction={onCancel}
							disabled={deletionId === reservation.id}
							actionLabel='Cancel Reservation'
							currentUser={currentUser}
						/>
					))}
				</div>
			</Container>
		</div>
	);
};
export default TripsClient;
