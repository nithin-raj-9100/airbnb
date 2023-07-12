'use client';

// [ ]internal imports
import Container from '@/app/components/Container  ';
import { categories } from '@/app/components/navbar/Categories  ';
import { Listing, Reservation, User } from '@prisma/client';
import ListingHead from '@/app/components/listings/ListingHead  ';
import ListingInfo from '@/app/components/listings/ListingInfo  ';
import { SafeListing, SafeUser } from '@/app/types  ';
import { useLoginModal } from '@/app/hooks/useLoginModal  ';
import ListingReservation from '@/app/components/listings/ListingReservation  ';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ListingClientProps {
	reservations?: Reservation[];
	listings: SafeListing & {
		user: SafeUser;
	};
	currentUser?: SafeUser | null;
}

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

const ListingClient: React.FC<ListingClientProps> = ({
	listings,
	reservations = [],
	currentUser,
}) => {
	const loginModel = useLoginModal();

	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach(reservation => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [dateRange, setDateRange] = useState(initialDateRange);

	const createReservation = useCallback(() => {
		if (!currentUser) return loginModel.onOpen();
		setIsLoading(true);

		axios
			.post('/api/reservations', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listings.id,
			})
			.then(() => {
				toast.success('Reservation created successfully');
				// should redirect to /trips
				router.refresh();
			})
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [currentUser, totalPrice, dateRange, listings.id, loginModel, router]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate,
			);

			if (dayCount && listings.price) {
				setTotalPrice(dayCount * listings.price);
			} else {
				setTotalPrice(listings.price);
			}
		}
	}, [dateRange, listings.price]);

	const category = useMemo(() => {
		return categories.find(item => item.label === listings?.category);
	}, [listings?.category]);

	return (
		<div>
			<Container>
				<div className='mx-auto max-w-screen-lg'>
					<div className='flex flex-col gap-6'>
						<ListingHead
							title={listings?.title}
							imageSrc={listings?.imageSrc}
							locaionValue={listings?.locationValue}
							currentUser={currentUser}
							id={listings?.id}
						/>

						<div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
							<ListingInfo
								user={listings.user}
								category={category}
								description={listings.description}
								roomCount={listings.roomCount}
								guestCount={listings.guestCount}
								bathroomCount={listings.bathroomCount}
								locationValue={listings.locationValue}
							/>

							<div className='order-first mb-10 md:order-last md:col-span-3'>
								<ListingReservation
									price={listings.price}
									totalPrice={totalPrice}
									onChangeDate={(value: any) =>
										setDateRange(value)
									}
									onSubmit={createReservation}
									dateRange={dateRange}
									disabledDates={disabledDates}
									disabled={isLoading}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
export default ListingClient;
