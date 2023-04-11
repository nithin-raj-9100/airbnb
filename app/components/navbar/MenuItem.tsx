'use client';

type MenuItemProps = {
	onClick: () => void;
	label: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
	return (
		<div>
			<div
				onClick={onClick}
				className='px-4 py-3  font-semibold transition hover:bg-neutral-100'
			>
				{label === 'Log in' ? (
					<div className='font-normal'>{label}</div>
				) : (
					label
				)}
			</div>
		</div>
	);
};
export default MenuItem;
