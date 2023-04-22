'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';

// [ ]internal imports
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { useRegisterModal } from '@/app/hooks/useRegisterModal  ';

const UserMenu = () => {
	const registerModel = useRegisterModal();
	const [isOpen, setisOpen] = useState(false);

	const handleOpen = useCallback(() => {
		setisOpen(open => !open);
		console.log(isOpen);
	}, [isOpen]);

	console.log(isOpen);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div
					onClick={() => {}}
					className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-white md:block '
				>
					Airbnb Your Home
				</div>
				<div
					onClick={handleOpen}
					className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
				>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-xl md:w-3/4'>
					<div className='flex cursor-pointer flex-col'>
						<>
							<MenuItem
								onClick={registerModel.onOpen}
								label='Sign up'
							/>
							<MenuItem
								onClick={registerModel.onOpen}
								label='Log in'
							/>
						</>
					</div>
				</div>
			)}
		</div>
	);
};
export default UserMenu;
