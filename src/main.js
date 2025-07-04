import { RenderCountryResult, RenderCountrySkeleton } from './assets/scripts/components'
import { HASHMAP_ENDPOINTS, MakeApiCall } from './services'
import { $, debouncer, ListenColorScheme } from './utils'

ListenColorScheme()

//! select items from dom
const inputHeader = $('#input-switcher')
const results = $('#input-result')

window.addEventListener('load', () => {
	const replaceLast = (val) => results.replaceChildren(val)

	inputHeader.addEventListener(
		'input',
		debouncer(async ({ target }) => {
			if (!target?.value) return replaceLast([])

			replaceLast(RenderCountrySkeleton(2))
			const data = await MakeApiCall(HASHMAP_ENDPOINTS.NAME, target.value)

			replaceLast(RenderCountryResult(data))
		})
	)

	//! click outside to close
	document.addEventListener('click', (event) => {
		const isClosed = event.composedPath().includes(results)

		if (!isClosed && !results?.children?.length) return
		results.replaceChildren([])
	})
})
