'use client';

import { useSearchModal } from '@/app/hooks/useSearchModal  ';
import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Modal from './Modal';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import queryString from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const searchModal = useSearchModal();
	const router = useRouter();
	const params = useSearchParams();

	const [steps, setSteps] = useState(STEPS.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [location, setLocation] = useState<CountrySelectValue>();
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[location],
	);

	const onBack = useCallback(() => {
		setSteps(value => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setSteps(value => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (steps !== STEPS.INFO) {
			return onNext();
		}
		let currentQuery = {};
		if (params) {
			currentQuery = queryString.parse(params.toString());
		}
		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};
		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}
		if (updatedQuery.endDate) {
			updatedQuery.endDate = formatISO(dateRange?.endDate ?? new Date());
		}
		const url = queryString.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{
				skipNull: true,
				skipEmptyString: true,
			},
		);
		setSteps(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		steps,
		onNext,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		dateRange,
		searchModal,
		router,
		params,
	]);

	const actionLabel = useMemo(() => {
		if (steps === STEPS.INFO) {
			return 'Search';
		}
		return 'Next';
	}, [steps]);

	const secondaryActionLabel = useMemo(() => {
		if (steps === STEPS.LOCATION) {
			return undefined;
		}
		return 'Back';
	}, [steps]);

	let bodyContent = (
		<div className='flex flex-col gap-8'>
			<Heading
				title='Where do you wanna go '
				subtitle='Find the perfect location!'
			/>
			<CountrySelect
				//@ts-ignore
				value={location}
				onChange={value => setLocation(value as CountrySelectValue)}
				key={steps}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	if (steps === STEPS.DATE) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='When do you wanna go '
					subtitle='Make sure everything is available!'
				/>
				<Calendar
					onChange={value => setDateRange(value.selection as Range)}
					value={dateRange}
				/>
			</div>
		);
	}

	if (steps === STEPS.INFO) {
		bodyContent = (
			<div className='flex flex-col gap-8'>
				<Heading
					title='More Information'
					subtitle='Find your perfect place'
				/>
				<Counter
					title='Guests'
					subtitle='How many guests are coming?'
					onChange={value => setGuestCount(value)}
					value={guestCount}
				/>
				<Counter
					title='Rooms'
					subtitle='How many rooms do you need?'
					onChange={value => setRoomCount(value)}
					value={roomCount}
				/>
				<Counter
					title='Bathrooms'
					subtitle='How many bathrooms do you need?'
					onChange={value => setBathroomCount(value)}
					value={bathroomCount}
				/>
			</div>
		);
	}

	return (
		<>
			<Modal
				isOpen={searchModal.isOpen}
				onClose={searchModal.onClose}
				onSubmit={onSubmit}
				title='Filters'
				secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
				secondaryActionLabel={secondaryActionLabel}
				actionLabel={actionLabel}
				body={bodyContent}
			/>
		</>
	);
};
export default SearchModal;
