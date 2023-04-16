'use client';

type Props = {
	title: string;
	subtitle?: string;
	center?: boolean;
};

const Heading: React.FC<Props> = ({ title, center, subtitle }) => {
	return (
		<div
			className={`
		${center ? 'text-center' : 'text-start'}
	`}
		>
			<div className='font-sans text-2xl font-bold'>{title}</div>
			{/* <div className='mt-2 font-semibold text-neutral-500'>
				{subtitle}
			</div> */}
		</div>
	);
};
export default Heading;
