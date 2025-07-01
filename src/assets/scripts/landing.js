import { CONTINENT_SUBREGIONS, CONTINENTS } from '../../constants'
import country from '../../mocks/country.json'
import { $, debouncer, sanitizeOutput } from '../../utils'
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
		const data = Array(7).fill(country)

		const docFragment = new DocumentFragment()
		data?.forEach((el) => {
			const element = document.createElement('span')
			element.classList.add('country-result')

			const [countryName, cca3] = [sanitizeOutput(el.name.common), sanitizeOutput(el.cca3)]

			element.insertAdjacentHTML(
				'afterbegin',
				`
				<img src='${el.flags.svg}' alt='Flag of ${countryName}' class='country-flag'/>
				<a class='country-info' href='/country/?q=${cca3}'>
					<h6 class='country-name'>${countryName}</h6>
					<p class='country-capitals'>${sanitizeOutput(el?.capital.join(' | '))}</p>
				</a>
				<p class='country-cca3'>${cca3}</p>
				`
			)

			docFragment.append(element)
		})

		searchResults.append(docFragment)
	})
)
