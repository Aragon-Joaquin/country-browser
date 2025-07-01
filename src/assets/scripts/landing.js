import { CONTINENT_SUBREGIONS, CONTINENTS } from '../../constants'
import country from '../../mocks/country.json'
import { $, debouncer } from '../../utils'
// import {MakeApiCall, HASHMAP_ENDPOINTS} from '../../services'

//! selectors
const continentSelect = $('#continent-select')
const subregionSelect = $('#region-search')
const countrySearcher = $('#country-search')

const searchResults = $('#search-results')

//! handleing when chosing in form
continentSelect.addEventListener('change', ({ target }) => {
	const continent = CONTINENTS[target?.value.toUpperCase() ?? '']
	if (!continent) return

	// we clean every children except the first one
	subregionSelect.replaceChildren(subregionSelect.firstElementChild)
	subregionSelect.selectedIndex = 0

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
		if (!target?.value) return
		const data = [country]

		const docFragment = new DocumentFragment()

		data?.forEach((el) => {
			console.log(el, el.name.common)
			const element = document.createElement('span')

			element.insertAdjacentHTML('afterbegin', `<h2>${el.name.common}</h2>`)

			docFragment.append(element)
		})

		searchResults.append(docFragment)
	})
)
