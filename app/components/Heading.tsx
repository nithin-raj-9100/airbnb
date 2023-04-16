'use client';

type Props = {
	title: string;
};

const Heading: React.FC<Props> = ({ title }) => {
	return (
		<div className='text-start'>
			<div className='font-sans text-2xl font-bold'>{title}</div>
		</div>
	);
};
export default Heading;
