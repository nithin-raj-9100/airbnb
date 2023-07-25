// 'use client';

// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
// import { toast } from 'react-hot-toast';

// import Container from '../components/Container';
// import Heading from '../components/Heading';
// import ListingCard from '../components/listings/ListingCard';
// import { SafeListing, SafeUser } from '../types';

// interface PropertiesClientProps {
// 	listings: SafeListing[];
// 	currentUser: SafeUser | null | undefined;
// }

// const PropertiesClient: React.FC<PropertiesClientProps> = ({
// 	currentUser,
// 	listings,
// }) => {
// 	const router = useRouter();
// 	const [deletionId, setDeletionId] = useState('');

// 	const onCancel = useCallback(
// 		(id: string) => {
// 			setDeletionId(id);

// 			const request = () =>
// 				axios
// 					.delete(`/api/listings/${id}`)
// 					.then(() => {
// 						router.refresh();
// 					})
// 					.catch(error => {
// 						throw new Error(error.response.data.message);
// 					})
// 					.finally(() => {
// 						setDeletionId('');
// 					});

// 			toast.promise(request(), {
// 				loading: 'Cancelling Listings...',
// 				success: 'Listing deleted',
// 				error: 'Failed to cancel Listings',
// 			});
// 		},
// 		[router, setDeletionId],
// 	);

// 	return (
// 		<div>
// 			<Container>
// 				<Heading
// 					title='Properties'
// 					subtitle='List of your properties'
// 				/>
// 				<div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
// 					{listings.map(listing => (
// 						<ListingCard
// 							key={listing.id}
// 							data={listing}
// 							actionId={listing.id}
// 							onAction={onCancel}
// 							disabled={deletionId === listing.id}
// 							actionLabel='Delete Property'
// 							currentUser={currentUser}
// 						/>
// 					))}
// 				</div>
// 			</Container>
// 		</div>
// 	);
// };
// export default PropertiesClient;
