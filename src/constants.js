export const API_BASE_URL = 'https://restcountries.com/v3.1'
export const ABORT_CONTROLLER_TIMEOUT = 5000 // 5 seconds

export const LOCAL_STORAGE_KEYS = Object.freeze({
	COLOR_SCHEME: 'color-scheme'
})

export const CONTINENTS = Object.freeze({
	AFRICA: 'Africa',
	ASIA: 'Asia',
	EUROPE: 'Europe',
	AMERICAS: 'Americas',
	OCEANIA: 'Oceania'
})

export const SUBREGIONS = Object.freeze({
	W_Africa: 'Western Africa',
	E_Africa: 'Eastern Africa',
	S_Africa: 'Southern Africa',
	M_Africa: 'Middle Africa',
	N_Africa: 'Northern Africa',

	W_Asia: 'Western Asia',
	C_Asia: 'Central Asia',
	E_Asia: 'Eastern Asia',
	S_Asia: 'Southern Asia',
	SE_Asia: 'South-Eastern Asia',

	S_Europe: 'Southeast Europe',
	N_Europe: 'Northern Europe',
	W_Europe: 'Western Europe',
	E_Europe: 'Eastern Europe',
	C_Europe: 'Central Europe',
	S_Europe: 'Southern Europe',

	Caribbean: 'Caribbean',
	S_America: 'South America',
	C_America: 'Central America',
	N_America: 'North America',

	Melanesia: 'Melanesia',
	Polynesia: 'Polynesia',
	Aus_NewZea: 'Australia and New Zealand',
	Micronesia: 'Micronesia'
})

export const CONTINENT_SUBREGIONS = Object.freeze({
	[CONTINENTS.AFRICA]: [
		SUBREGIONS.W_Africa,
		SUBREGIONS.E_Africa,
		SUBREGIONS.S_Africa,
		SUBREGIONS.M_Africa,
		SUBREGIONS.N_Africa
	],
	[CONTINENTS.ASIA]: [SUBREGIONS.W_Asia, SUBREGIONS.C_Asia, SUBREGIONS.E_Asia, SUBREGIONS.S_Asia, SUBREGIONS.SE_Asia],
	[CONTINENTS.EUROPE]: [
		SUBREGIONS.S_Europe,
		SUBREGIONS.N_Europe,
		SUBREGIONS.W_Europe,
		SUBREGIONS.E_Europe,
		SUBREGIONS.C_Europe
	],
	[CONTINENTS.AMERICAS]: [SUBREGIONS.Caribbean, SUBREGIONS.S_America, SUBREGIONS.C_America, SUBREGIONS.N_America],
	[CONTINENTS.OCEANIA]: [SUBREGIONS.Melanesia, SUBREGIONS.Polynesia, SUBREGIONS.Aus_NewZea, SUBREGIONS.Micronesia]
})
