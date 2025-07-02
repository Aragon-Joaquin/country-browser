//! very vague adapter, i'll se in the future if i can improve it

import { sanitizeOutput } from '../utils'

/**
 * @param {JSON[] | JSON} obj the returned data from the api
 * @returns  {ReturnType<typeof adaptedData>} an array of well parsed country obj
 */
export const COUNTRY_ADAPTER = (obj) => {
	if (Array.isArray(obj)) return obj?.map((el) => adaptedData(el))
	return [adaptedData(obj)]
}

//TODO(#8): some objects are not entirely sanitized. making a recursive function parses fields like images.
const adaptedData = (obj) => ({
	name: {
		common: sanitizeOutput(obj?.name?.common) ?? 'Unknown',
		official: sanitizeOutput(obj?.name?.official) ?? 'Unknown',
		nativeName: obj?.name?.nativeName ?? {}
	},
	tld: obj?.tld ?? [],
	cca2: sanitizeOutput(obj?.cca2) ?? '',
	ccn3: sanitizeOutput(obj?.ccn3) ?? '',
	cioc: sanitizeOutput(obj?.cioc) ?? '',
	independent: obj?.independent ?? false,
	status: sanitizeOutput(obj?.status) ?? '',
	unMember: obj?.unMember ?? false,
	currencies: obj?.currencies ?? {},
	idd: obj?.idd ?? {},
	capital: obj?.capital ?? [],
	altSpellings: obj?.altSpellings ?? [],
	region: sanitizeOutput(obj?.region) ?? '',
	subregion: sanitizeOutput(obj?.subregion) ?? '',
	languages: obj?.languages ?? {},
	latlng: obj?.latlng ?? [0, 0],
	landlocked: obj?.landlocked ?? false,
	borders: obj?.borders ?? [],
	area: obj?.area ?? 0,
	demonyms: obj?.demonyms ?? {},
	cca3: sanitizeOutput(obj?.cca3) ?? '',
	translations: obj?.translations ?? {},
	flag: sanitizeOutput(obj?.flag) ?? '',
	maps: obj?.maps ?? {},
	population: obj?.population ?? 0,
	gini: obj?.gini ?? {},
	fifa: sanitizeOutput(obj?.fifa) ?? '',
	car: obj?.car ?? {},
	timezones: obj?.timezones ?? [],
	continents: obj?.continents ?? [],
	flags: obj?.flags ?? {},
	coatOfArms: obj?.coatOfArms ?? {},
	startOfWeek: sanitizeOutput(obj?.startOfWeek) ?? '',
	capitalInfo: obj?.capitalInfo ?? {},
	postalCode: obj?.postalCode ?? {}
})
