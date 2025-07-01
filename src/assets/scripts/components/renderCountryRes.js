/**
 * @param {ReturnType<typeof ADAPTER_HASHMAP[HASHMAP_ENDPOINTS.NAME]>[]} data This is the result from the api call of countries! The one which got adapted
 * @returns {DocumentFragment} the doc fragment which contains the HTML
 */

import { sanitizeOutput } from '../../../utils'

export function RenderCountryResult(data) {
	const docFragment = new DocumentFragment()
	data?.forEach((el) => {
		const element = document.createElement('span')
		element.classList.add('country-result')

		const [countryName, cca3] = [sanitizeOutput(el.name.common), sanitizeOutput(el.cca3)]

		element.insertAdjacentHTML(
			'afterbegin',
			`
				<img src='${el?.flags?.svg || '/imgs/not-found.webp'}' alt='Flag of ${countryName}' class='country-flag'/>
				<a class='country-info' href='/country/?q=${cca3}'>
					<h6 class='country-name'>${countryName}</h6>
					<p class='country-capitals'>${sanitizeOutput(el?.capital.join(' | '))}</p>
				</a>
				<p class='country-cca3'>${cca3}</p>
				`
		)

		docFragment.append(element)
	})

	return docFragment
}

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
