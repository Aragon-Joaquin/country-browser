//! very vague adapter, i'll se in the future if i can improve it

/**
 * @param {JSON[] | JSON} obj the returned data from the api
 * @returns an array of well parsed country obj
 */
export const COUNTRY_ADAPTER = (obj) => {
	if (Array.isArray(obj)) return obj?.map((el) => adaptedData(el))
	return [adaptedData(obj)]
}

const adaptedData = (obj) => ({
	name: {
		common: obj?.name?.common ?? 'Unknown',
		official: obj?.name?.official ?? 'Unknown',
		nativeName: obj?.name?.nativeName ?? {}
	},
	tld: obj?.tld ?? [],
	cca2: obj?.cca2 ?? '',
	ccn3: obj?.ccn3 ?? '',
	cioc: obj?.cioc ?? '',
	independent: obj?.independent ?? false,
	status: obj?.status ?? '',
	unMember: obj?.unMember ?? false,
	currencies: obj?.currencies ?? {},
	idd: obj?.idd ?? {},
	capital: obj?.capital ?? [],
	altSpellings: obj?.altSpellings ?? [],
	region: obj?.region ?? '',
	subregion: obj?.subregion ?? '',
	languages: obj?.languages ?? {},
	latlng: obj?.latlng ?? [0, 0],
	landlocked: obj?.landlocked ?? false,
	borders: obj?.borders ?? [],
	area: obj?.area ?? 0,
	demonyms: obj?.demonyms ?? {},
	cca3: obj?.cca3 ?? '',
	translations: obj?.translations ?? {},
	flag: obj?.flag ?? '',
	maps: obj?.maps ?? {},
	population: obj?.population ?? 0,
	gini: obj?.gini ?? {},
	fifa: obj?.fifa ?? '',
	car: obj?.car ?? {},
	timezones: obj?.timezones ?? [],
	continents: obj?.continents ?? [],
	flags: obj?.flags ?? {},
	coatOfArms: obj?.coatOfArms ?? {},
	startOfWeek: obj?.startOfWeek ?? '',
	capitalInfo: obj?.capitalInfo ?? {},
	postalCode: obj?.postalCode ?? {}
})
