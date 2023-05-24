'use client';

import { IconType } from 'react-icons';

type Props = {
	title: string;
	subtitle?: string;
	icon: IconType;
	label: string;
	selected: boolean;
	onClick: () => void;
};

const CategoryInput: React.FC<Props> = ({
	title,
	icon: Icon,
	label,
	selected,
	onClick,
}) => {
	return (
		<div
			onClick={() => onClick()}
			className={`
		flex cursor-pointer gap-3 rounded-xl border-2  p-4 transition hover:border-black 
		${selected ? 'border-black' : 'border-neutral-200'}
		`}
		>
			<div className='text-2xl text-neutral-700'>
				<Icon size={30} />
			</div>
			<div className=' flex items-center justify-center text-center text-xs font-semibold text-neutral-700'>
				{label}
			</div>
		</div>
	);
};
export default CategoryInput;
