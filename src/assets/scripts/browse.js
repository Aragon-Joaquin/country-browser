import { HASHMAP_ENDPOINTS, MakeApiCall } from '../../services'
import { $ } from '../../utils'
import { RenderBrowseCountry } from './components/renderBrowserCountry'

window.addEventListener(
	'load',
	async () => {
		const urlParams = new URLSearchParams(window.location.search)
		const countryCode = urlParams.get('q')

		//TODO(#5): return error and redirect to home!
		if (!countryCode) return
		const throbber = $('#loading-throbber')
		const mainApp = $('#app-main')

		const data = await MakeApiCall(HASHMAP_ENDPOINTS.CODE, countryCode)
		throbber.classList.add('invisible')

		mainApp.appendChild(RenderBrowseCountry(data))
	},
	{ once: true }
)
