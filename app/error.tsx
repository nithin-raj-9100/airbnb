'use client';

import { useEffect } from 'react';
import EmptyState from './components/EmptyState';

const Error = ({ err }: { err: Error }) => {
	useEffect(() => {
		console.error(err);
	}, [err]);
	return (
		<>
			<EmptyState
				subtitle='Something went wrong'
				shouldReset
				title='Uh Oh!'
			/>
		</>
	);
};
export default Error;
