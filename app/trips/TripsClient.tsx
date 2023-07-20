'use client';

import { useRouter } from 'next/navigation';

import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeReservation, SafeUser } from '../types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

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

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation cancelled');
					router.refresh();
				})
				.catch((err: any) => {
					toast.error(err?.response?.data?.error?.message);
					console.log(err);
				})
				.finally(() => {
					setDeletionId('');
				});
		},
		[router],
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
						/>
					))}
				</div>
			</Container>
		</div>
	);
};
export default TripsClient;
