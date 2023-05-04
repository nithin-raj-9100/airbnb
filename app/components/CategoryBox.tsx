import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import queryString from 'query-string';

type Props = {
	icon: IconType;
	description?: string;
	label: string;
	selected?: boolean;
};

const CategoryBox: React.FC<Props> = ({
	description,
	icon: Icon,
	label,
	selected,
}) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = queryString.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		if (params?.get('category') === label) {
			delete updatedQuery.category;
		}

		const url = queryString.stringifyUrl(
			{
				url: '/',
				query: updatedQuery,
			},
			{
				skipNull: true,
			},
		);

		router.push(url);
	}, [label, params, router]);

	return (
		<div
			onClick={handleClick}
			className={`flex cursor-pointer flex-col items-center justify-center gap-3  border-b-2 p-3 transition hover:text-neutral-800
			${selected ? 'border-b-neutral-800 ' : 'border-transparent'}
				${selected ? 'text-neutral-800' : 'text-neutral-500	'}
			`}
		>
			<Icon size={26} />
			<div className='text-sm font-medium'>{label}</div>
		</div>
	);
};
export default CategoryBox;
