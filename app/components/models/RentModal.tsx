'use client';

// [ ] internal  imports
import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import { useRentModal } from '../../hooks/useRentModal';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

// [ ] package imports
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const onBack = () => {
		setStep(step => step - 1);
	};

	const onNext = () => {
		setStep(step => step + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = data => {
		console.log('submit is ', data);

		if (step !== STEPS.PRICE) {
			return onNext();
		}
		setIsLoading(true);

		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Listing created');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch(() => {
				toast.error('Something went wrong');
			})
			.finally(() => {
				setIsLoading(false);
			});
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
		reset,
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
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');
	const imageSrc = watch('imageSrc');

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		[locationWatch],
	);

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
					<Map center={locationWatch?.lating} />
				</div>
			</>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<>
				<div className='flex flex-col gap-8'>
					<Heading
						title='Share some basics about your place'
						subtitle='How many guests do you allowh'
					/>
					<Counter
						title='Guests'
						subtitle='How many guests do you allow'
						value={guestCount}
						onChange={value => setCustomValue('guestCount', value)}
					/>
					<hr />
					<Counter
						title='Rooms'
						subtitle='How many rooms do you have'
						value={roomCount}
						onChange={value => setCustomValue('roomCount', value)}
					/>
					<hr />
					<Counter
						title='Bathrooms'
						subtitle='How many bathrooms do you have'
						value={bathroomCount}
						onChange={value =>
							setCustomValue('bathroomCount', value)
						}
					/>
				</div>
			</>
		);
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<>
				<div className='flex flex-col gap-8'>
					<Heading
						title='Add a photo of your place'
						subtitle='Show guests what your place looks like'
					/>
					<ImageUpload
						value={imageSrc}
						onChange={value => setCustomValue('imageSrc', value)}
					/>
				</div>
			</>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<>
				<div className='flex flex-col gap-8 '>
					<Heading
						title='How would you describe your place'
						subtitle='short and simple works best'
					/>
					<Input
						id='title'
						label='title'
						disabled={isLoading}
						errors={errors}
						register={register}
						required
					/>
					<hr />
					<Input
						id='description'
						label='description'
						disabled={isLoading}
						errors={errors}
						register={register}
						required
					/>
				</div>
			</>
		);
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<>
				<div className='flex flex-col gap-8'>
					<Heading
						title='Set your price'
						subtitle='How much do you charge per night '
					/>
					<Input
						id='price'
						label='price'
						formatPrice
						type='number'
						disabled={isLoading}
						register={register}
						errors={errors}
						required
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
				onSubmit={handleSubmit(onSubmit)}
				actionLabel={actionLabel}
				body={bodyContent}
				secondaryActionLabel={secondaryActionLabel}
				secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			/>
		</div>
	);
};
export default RentModal;
