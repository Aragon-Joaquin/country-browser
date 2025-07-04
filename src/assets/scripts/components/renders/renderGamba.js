import { ImageFallback } from '../../../../utils'

//TODO(#12): Make it render multiple instances

/**
 *
 * @param {{cca3: string, flags: {svg: string}, name: {common: string}}[]} data
 * the data from the api. at least containing the specified types.
 *
 * @returns {HTMLElement}
 */
export function RenderGamba(data) {
	const docFrag = new DocumentFragment()

	data.forEach((el) => {
		const list = document.createElement('li')
		const C_NameFB = el?.name?.common ?? 'Unknown'

		list.insertAdjacentHTML(
			'afterbegin',
			`
				<a href='/pages/browse?q=${el?.cca3}'>
					<img src='${el?.flags?.svg ?? ImageFallback()}' alt='Flag of ${C_NameFB}' class='gamba-flag'/>
				</a>
				<a class='gamba-info' href='/pages/browse?q=${el?.cca3}'>
					<h6 title="${C_NameFB}">${C_NameFB}</h6>
				</a>
			`
		)
		docFrag.append(list)
	})

	return docFrag
}
