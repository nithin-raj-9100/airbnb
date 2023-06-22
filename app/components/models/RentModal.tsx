'use client';
// [ ] internal  imports
import Modal from './Modal';

import { useRentModal } from '../../hooks/useRentModal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const foo = 'bar';

	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep(step => step - 1);
	};

	const onNext = () => {
		setStep(step => step + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create Listing';
		}
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return;
		}
		return 'Back';
	}, [step]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	const categoryWatch = watch('category');
	const locationWatch = watch('location');

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	let bodyContent = (
		<>
			<div className='flex flex-col gap-8'>
				<Heading
					title='Which of these best describes your place'
					subtitle='Pick a category'
				/>
				<div className='grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 '>
					{categories.map(category => (
						<div
							key={category.label}
							className='col-span-1 cursor-pointer'
						>
							<CategoryInput
								label={category.label}
								icon={category.icon}
								description={category.description}
								//@ts-ignore
								onClick={(categoryWatch: any) =>
									setCustomValue('category', categoryWatch)
								}
								selected={categoryWatch === category.label}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<>
				<div className='flex flex-col gap-8'>
					<Heading
						title='Where is your place located'
						subtitle='Help guests find you'
					/>
					<CountrySelect
						onChange={value => setCustomValue('location', value)}
						value={locationWatch}
					/>
				</div>
			</>
		);
	}

	return (
		<div>
			<Modal
				title='Airbnb your home'
				isOpen={rentModal.isOpen}
				onClose={rentModal.onClose}
				onSubmit={onNext}
				actionLabel={actionLabel}
				body={bodyContent}
				secondaryActionLabel={secondaryActionLabel}
				secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			/>
		</div>
	);
};
export default RentModal;
