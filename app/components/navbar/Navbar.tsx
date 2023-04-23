// [ ]internal imports
'use client';

import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

type Props = {
	user?: User | null;
};

const Navbar: React.FC<Props> = ({ user }: { user?: User | null }) => {
	console.log(user);

	return (
		<div className='fixed z-10 w-full bg-white shadow-sm'>
			<div className='border-b-[1px] py-4'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
						<Logo />
						<Search />
						<UserMenu user={user} />
					</div>
				</Container>
			</div>
		</div>
	);
};
export default Navbar;
