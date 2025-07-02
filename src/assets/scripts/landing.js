import { CONTINENT_SUBREGIONS, CONTINENTS } from '../../constants'
import { HASHMAP_ENDPOINTS, MakeApiCall } from '../../services'
import { $, debouncer } from '../../utils'
import { RenderCountryResult, RenderCountrySkeleton } from './components'

//! selectors
const continentSelect = $('#continent-select')
const subregionSelect = $('#region-search')
const countrySearcher = $('#country-search')

const searchResults = $('#search-results')

//? utils
const ResetSearchResults = (val) => searchResults.replaceChildren(val)

//! handleing when chosing in form
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
		if (!target?.value) return ResetSearchResults([])

		ResetSearchResults(RenderCountrySkeleton(7))
		const data = await MakeApiCall(HASHMAP_ENDPOINTS.NAME, target.value)
		ResetSearchResults(RenderCountryResult(data))
	})
)

subregionSelect.addEventListener(
	'change',
	debouncer(async ({ target }) => {
		if (!target?.value) return ResetSearchResults([])

		ResetSearchResults(RenderCountrySkeleton(7))
		const data = await MakeApiCall(HASHMAP_ENDPOINTS.SUBREGION, target.value)
		ResetSearchResults(RenderCountryResult(data))
	})
)

//! click outside to close
document.addEventListener('click', (event) => {
	const isClosed = event.composedPath().includes(searchResults)

	if (!isClosed && !searchResults?.children?.length) return
	ResetSearchResults([])
})
