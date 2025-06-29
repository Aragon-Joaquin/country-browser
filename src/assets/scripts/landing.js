import { CONTINENT_SUBREGIONS, CONTINENTS } from '../../constants'
import { $ } from '../../utils'

const continentSelect = $('#continent-select')
const subregionSelect = $('#region-search')
const countrySearcher = $('#country-search')

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

countrySearcher.addEventListener('input', (e) => {
	console.log(e.target.value)
})
