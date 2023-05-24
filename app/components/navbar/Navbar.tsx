// [ ]internal imports
'use client';

import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types  ';

type Props = {
	user?: SafeUser | null;
};

const Navbar: React.FC<Props> = ({ user }: { user?: SafeUser | null }) => {
	console.log(user);

	return (
		<div className='fixed z-10 w-full bg-white shadow-sm'>
			<div className='border-b-[1px] py-3'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<span className='rounded-full px-6 '>
							<Search />
						</span>
						<UserMenu user={user} />
					</div>
				</Container>
			</div>
			<>
				<Categories />
			</>
		</div>
	);
};
export default Navbar;
