'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	shouldReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
	title = 'No Exact matches found',
	shouldReset,
	subtitle = 'try changing the filters or adding a new listing',
}) => {
	const router = useRouter();
	return (
		<>
			<div className='flex  h-[60vh] flex-col items-center justify-center gap-2'>
				<Heading title={title} subtitle={subtitle} center />
				<div className='mt-4 w-48'>
					{shouldReset && (
						<Button
							outline
							label='Remove all filters'
							onClick={() => router.push('/')}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export default EmptyState;
