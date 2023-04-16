'use client';
import React from 'react';
import { IconType } from 'react-icons/lib';

type ButtonProps = {
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	label: string;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
};

const Button: React.FC<ButtonProps> = ({
	onClick,
	label,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<>
			<button
				onClick={onClick}
				disabled={disabled}
				className={`relative w-full rounded-lg transition 
				 focus:outline-none focus:ring-2 focus:ring-offset-2
				disabled:cursor-not-allowed disabled:opacity-70 
				${outline ? 'bg-white' : 'bg-rose-500'}
				${outline ? 'border-black' : 'border-rose-500'}
				${outline ? 'text-black' : 'text-white'}
				${small ? 'py-1' : 'py-3'}
				${small ? 'text-sm' : 'text-md'}
				${small ? 'font-light' : 'font-semibold	'}
				${small ? 'border-[1px]' : 'border-2'}

				`}
			>
				{label}

				{Icon && (
					<Icon
						size={24}
						className={`absolute left-4 top-1/2 -translate-y-1/2 transform
							${small ? 'h-4 w-4' : 'h-6 w-6'}
							`}
					/>
				)}
			</button>
		</>
	);
};
export default Button;
