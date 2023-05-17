'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { BiGlobe } from 'react-icons/bi';

// [ ]internal imports
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { useRegisterModal } from '@/app/hooks/useRegisterModal  ';
import { useLoginModal } from '@/app/hooks/useLoginModal  ';
import { SafeUser } from '@/app/types  ';
import { useRentModal } from '@/app/hooks/useRentModal  ';

type Props = {
	user?: SafeUser | null;
};

const UserMenu: React.FC<Props> = ({ user }) => {
	const registerModel = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setisOpen] = useState(false);

	const handleOpen = useCallback(() => {
		setisOpen(open => !open);
	}, [isOpen]);

	const onRent = useCallback(() => {
		// TODO
		if (!user) {
			return loginModal.onOpen();
		}
		rentModal.onOpen();

		// TODO handle user when logged in
	}, [user, loginModal, rentModal]);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center justify-center gap-4'>
				<div
					onClick={onRent}
					className='hidden cursor-pointer rounded-full px-4 py-3 text-center text-sm font-semibold transition hover:bg-white md:block '
				>
					Airbnb your home
				</div>
				{/* TODO */}
				{/* <BiGlobe size={19} className=''/> */}
				<div
					onClick={handleOpen}
					className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-3 transition hover:shadow-md md:px-2 md:py-1'
				>
					<AiOutlineMenu />
					<div className='hidden md:block'>
						<Avatar src={user?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-xl md:w-3/4'>
					<div className='flex cursor-pointer flex-col'>
						{user ? (
							<>
								<MenuItem onClick={() => {}} label='My trips' />
								<MenuItem
									onClick={() => {}}
									label='My Favourites'
								/>
								<MenuItem
									onClick={() => {}}
									label='My reservations'
								/>
								<MenuItem
									onClick={() => {}}
									label='My Properties'
								/>
								<MenuItem
									onClick={rentModal.onOpen}
									label='Airbnb your Home'
								/>
								<hr />

								<MenuItem
									onClick={() => signOut()}
									label='Log out'
								/>
							</>
						) : (
							<>
								<MenuItem
									onClick={registerModel.onOpen}
									label='Sign up'
								/>
								<MenuItem
									onClick={loginModal.onOpen}
									label='Log in'
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default UserMenu;
