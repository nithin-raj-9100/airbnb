'use client';

import useCountries from '@/app/hooks/useCountries  ';
import Select from 'react-select';

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: Array<number>;
	region: string;
	value: string;
};

interface CountrySelectProps {
	value?: string;
	onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
	const { getAll } = useCountries();

	return (
		<div>
			<Select
				placeholder='Anywhere'
				isClearable
				// @ts-ignore
				options={getAll()}
				value={value}
				onChange={value => onChange(value as any)}
				formatOptionLabel={(option: any) => (
					<div className='flex flex-row  items-center gap-3'>
						<div className=''>{option.flag}</div>
						<div className=''>
							{option.label},
							<span className='text-neutral-8  ml-1'>
								{option.region}
							</span>
						</div>
					</div>
				)}
				classNames={{
					control: () => 'p-3 border-2 ',
					input: () => 'text-lg ',
					option: () => 'text-lg',
				}}
				theme={theme => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#ffe4e6',
					},
				})}
			/>
		</div>
	);
};
export default CountrySelect;
