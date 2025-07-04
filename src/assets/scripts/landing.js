import { CONTINENT_SUBREGIONS, CONTINENTS } from '../../constants'
import { HASHMAP_ENDPOINTS, MakeApiCall } from '../../services'
import { $, debouncer } from '../../utils'
import { RenderCountryResult, RenderCountrySkeleton, RenderGamba } from './components'
import { getGambaCandidate } from './utils/gambaUtils'

//! selectors
//from the select - options
const continentSelect = $('#continent-select')
const subregionSelect = $('#region-search')

//input
const countrySearcher = $('#country-search')

// results of both input + select - options
const searchResults = $('#search-results')

//end of the page. gamba section
const gambaCountries = $('#reroll-countries')
const gambaButton = $('#reroll-button')

//? utils
const ResetSearchResults = (val) => searchResults.replaceChildren(val)

//! handling when choosing in form
continentSelect.addEventListener('change', ({ target }) => {
	const continent = CONTINENTS[target?.value.toUpperCase() ?? '']

	// we clean every children except the first one
	subregionSelect.replaceChildren(subregionSelect.firstElementChild)
	subregionSelect.selectedIndex = 0
	ResetSearchResults([])

	if (!continent) return

	Object.values(CONTINENT_SUBREGIONS[continent]).forEach((el) => {
		const option = document.createElement('option')
		option.setAttribute('value', el)
		option.text = el

		subregionSelect.appendChild(option)
	})
})

//! making the http request

countrySearcher.addEventListener(
	'input',
	debouncer(async ({ target }) => {
		ResetSearchResults(RenderCountrySkeleton(7))
		if (!target?.value) return ResetSearchResults([])

		const data = await MakeApiCall(HASHMAP_ENDPOINTS.NAME, target.value)
		ResetSearchResults(RenderCountryResult(data))
	})
)

subregionSelect.addEventListener('change', async ({ target }) => {
	ResetSearchResults(RenderCountrySkeleton(7))
	if (!target?.value) return ResetSearchResults([])

	const data = await MakeApiCall(HASHMAP_ENDPOINTS.SUBREGION, target.value)
	ResetSearchResults(RenderCountryResult(data))
})

//! click outside to close
document.addEventListener('click', (event) => {
	const isClosed = event.composedPath().includes(searchResults)

	if (!isClosed && !searchResults?.children?.length) return
	ResetSearchResults([])
})

//! GAMBA!!!
const gambaData = await getGambaCandidate()

//yes, i know that the country can appear twice in a row with luck
const rerollMath = () => new Array(3).fill(null).map((_) => gambaData[(gambaData.length * Math.random()) | 0])
const rerollCountries = () => gambaCountries.replaceChildren(RenderGamba(rerollMath()))

rerollCountries()
gambaButton.addEventListener('click', () => rerollCountries())
