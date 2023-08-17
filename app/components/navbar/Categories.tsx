'use client';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
	GiWindmill,
	GiCastle,
	GiCaveEntrance,
	GiIsland,
	GiBoatFishing,
	GiDesert,
	GiCampingTent,
	GiCactus,
	GiBarn,
} from 'react-icons/gi';
import { FaSkiing, FaSnowflake } from 'react-icons/fa';
import { MdOutlineVilla, MdOutlineLocalFireDepartment } from 'react-icons/md';
import { usePathname, useSearchParams } from 'next/navigation';

// [ ] internal imports
import Container from '../Container';
import CategoryBox from '../CategoryBox';

export const categories = [
	{
		label: 'Beaches',
		icon: TbBeach,
		description: 'this is beach',
	},
	{
		label: 'WindMills',
		icon: GiWindmill,
		description: 'this is Windmills',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'this is Modern',
	},
	{
		label: 'Countryside',
		icon: TbMountain,
		description: 'this is Moutains	',
	},
	{
		label: 'Pools',
		icon: TbPool,
		description: 'this is Pools',
	},
	{
		label: 'Islands',
		icon: GiIsland,
		description: 'this is Islands',
	},
	{
		label: 'Lakes',
		icon: GiBoatFishing,
		description: 'this is Lakes',
	},
	{
		label: 'Skinings',
		icon: FaSkiing,
		description: 'this is skining',
	},
	{
		label: 'Castles',
		icon: GiCastle,
		description: 'this is Castle',
	},
	{
		label: 'Campings',
		icon: GiCampingTent,
		description: 'this is Camping in forest',
	},
	{
		label: 'Arctics',
		icon: FaSnowflake,
		description: 'this is Arctic',
	},
	{
		label: 'Caves',
		icon: GiCaveEntrance,
		description: 'this is Caves',
	},
	{
		label: 'Deserts',
		icon: GiCactus,
		description: 'this is Deserts',
	},
	{
		label: 'Barns',
		icon: GiBarn,
		description: 'this is Barns',
	},
	{
		label: 'Trending',
		icon: MdOutlineLocalFireDepartment,
		description: 'this is Trending',
	},
];

const Categories = () => {
	const params = useSearchParams();
	const category = params?.get('category');
	const pathName = usePathname();

	const isMainPage = pathName === '/';

	if (!isMainPage) {
		return null;
	}

	return (
		<div>
			<Container>
				<div className='flex items-center justify-between overflow-x-auto pt-4'>
					{categories.map(categorie => (
						<CategoryBox
							key={categorie.label}
							label={categorie.label}
							description={categorie.description}
							icon={categorie.icon}
							selected={category === categorie.label}
						/>
					))}
				</div>
			</Container>
		</div>
	);
};
export default Categories;
