'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// [ ]internal imports
import { SafeListing, SafeUser } from '@/app/types  ';
import { Listing, Reservation } from '@prisma/client';
import useCountries from '@/app/hooks/useCountries  ';
import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
	data: SafeListing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	actionId = '',
	actionLabel,
	currentUser,
	disabled,
	onAction,
	reservation,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	// db only has country code, so we need to get the full name
	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) return;
			onAction?.(actionId);
		},
		[onAction, actionId, disabled],
	);

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice;
		return data.price;
	}, [reservation, data.price]);

	const resrvationDate = useMemo(() => {
		if (!reservation) return null;

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<>
			<div
				className='group col-span-1 cursor-pointer'
				onClick={() => router.push(`/listings/${data.id}`)}
			>
				<div className='flex w-full flex-col gap-2'>
					<div className='relative aspect-square w-full overflow-hidden rounded-xl'>
						<Image
							alt='Listings'
							src={data.imageSrc}
							className='h-full w-full object-cover transition group-hover:scale-110 '
							fill
							priority
							sizes='(min-width: 1024px) 300px, 100vw'
						/>
						<div className='absolute right-3 top-3'>
							<HeartButton
								listingId={data.id}
								currentUser={currentUser}
							/>
						</div>
					</div>
					<div className='text-lg font-semibold '>
						{location?.region}, {location?.label}
					</div>
					<div className='font-light text-neutral-500'>
						{resrvationDate || data.category}
					</div>
					<div className='flex flex-row items-center gap-1'>
						<div className='font-semibold'>$ {price}</div>
						{!reservation && (
							<div className='font-light'>per night</div>
						)}
					</div>
					{onAction && actionLabel && (
						<Button
							disabled={disabled}
							label={actionLabel}
							onClick={handleCancel}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default ListingCard;
