import { ImageFallback } from '../../../utils'

/**
 * @param {ReturnType<typeof ADAPTER_HASHMAP[HASHMAP_ENDPOINTS.NAME]>[]} data This is the result from the api call of countries! The one which got adapted
 * @returns {DocumentFragment} the doc fragment which contains the HTML
 */
export function RenderCountryResult(data) {
	const docFragment = new DocumentFragment()
	data?.forEach((el) => {
		const element = document.createElement('span')
		element.classList.add('country-result')

		element.insertAdjacentHTML(
			'afterbegin',
			`
				<a href='/pages/browse?q=${el?.cca3}'>
					<img src='${el?.flags?.svg ?? ImageFallback()}' alt='Flag of ${el.name.common}' class='country-flag'/>
				</a>
				<a class='country-info' href='/pages/browse?q=${el?.cca3}'>
					<h6 class='country-name'>${el.name.common}</h6>
					<p class='country-capitals'>${el?.capital.join(' | ')}</p>
				</a>
				<p class='country-cca3'>${el?.cca3}</p>
				`
		)

		docFragment.append(element)
	})

	return docFragment
}

/**
 * @param {number} numberOfElements The amount of elements will be rendered as placeholder
 * @returns {DocumentFragment} the doc fragment which contains the HTML
 */
export function RenderCountrySkeleton(numberOfElements = 5) {
	const docFragment = new DocumentFragment()
	const element = document.createElement('span')
	element.classList.add('country-result')

	element.insertAdjacentHTML(
		'afterbegin',
		`
				<div class='country-flag skeleton'></div>
				<a class='country-info'>
					<h6 class='country-name skeleton-heading'>Loading</h6>
					<p class='country-capitals skeleton-p'>Loading</p>
				</a>
				<p class='country-cca3 skeleton-p'>Loading</p>
				`
	)

	docFragment.append(...Array.from({ length: numberOfElements }, () => element.cloneNode(true)))
	return docFragment
}
