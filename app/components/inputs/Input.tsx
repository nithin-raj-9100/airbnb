'use client';

import { BiDollar } from 'react-icons/bi';

type InputProps = {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	formatPrice?: boolean;
	required?: boolean;
	register: any;
	errors: any;
};

const Input: React.FC<InputProps> = ({
	errors,
	register,
	id,
	label,
	type,
	disabled = false,
	formatPrice = false,
	required = false,
}) => {
	return (
		<div className='w-fulll relative'>
			{formatPrice && (
				<BiDollar
					size={24}
					className='absolute left-2 top-5 text-neutral-700'
				/>
			)}
			<label
				htmlFor={id}
				className={`
				text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform pb-1  duration-150
				${formatPrice ? 'left-9' : 'left-4'}
				${errors[id] ? 'text-red-500' : 'text-neutral-700'}
				// TODO fix focus 
				peer-placeholder-shown:tranlsate-y-0
				peer-placeholder-shown:scale-100
				peer-focus:-translate-y-4
				peer-focus:scale-75
			`}
			>
				{label}
			</label>

			<input
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=' '
				type={type}
				aria-placeholder='Enter Email'
				className={`
				focus:border-primary-500
				peer
				w-full rounded-md border-2 border-neutral-200 bg-white p-4 pt-6 font-light text-black outline-none transition   focus:font-normal focus:text-black  focus:outline-none disabled:cursor-not-allowed disabled:opacity-70
				${formatPrice ? 'pl-10' : 'pl-4'}
				${errors[id] ? 'border-red-500' : 'border-neutral-200'}
				${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
				`}
			/>
		</div>
	);
};
export default Input;
