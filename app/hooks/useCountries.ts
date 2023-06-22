import countries from 'world-countries';

const formattedCountries = countries.map(c => ({
	value: c.cca2,
	label: c.name.common,
	flag: c.flag,
	lating: c.latlng,
	region: c.region,
}));

const useCountries = () => {
	const getAll = () => formattedCountries;

	const getByValue = (value: string) => {
		return formattedCountries.find(item => item.value === value);
	};
	return {
		getAll,
		getByValue,
	};
};

export default useCountries;
