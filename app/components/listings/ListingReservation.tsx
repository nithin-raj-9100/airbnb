'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabledDates: Date[];
	disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	dateRange,
	disabledDates,
	onChangeDate,
	onSubmit,
	price,
	totalPrice,
	disabled,
}) => {
	return (
		<div className='overflow-hidden rounded-xl border border-neutral-300 bg-white'>
			<div className='flex flex-row items-center gap-1 p-4'>
				<div className='text-2xl font-semibold'>$ {totalPrice}</div>
				<div className='font-light text-neutral-600'>per night</div>
			</div>
			<hr />
			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={value => onChangeDate(value.selection)}
			/>
			<hr />
			<div className='p-4 '>
				<Button
					disabled={disabled}
					label='Reserve'
					onClick={onSubmit}
				/>
			</div>
			<div className='flex flex-row items-center justify-between p-4 text-lg font-semibold'>
				<div>Total</div>
				<div>$ {totalPrice}</div>
			</div>
		</div>
	);
};
export default ListingReservation;
