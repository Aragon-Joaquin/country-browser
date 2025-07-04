import { HASHMAP_ENDPOINTS, MakeApiCall } from '../../services'
import { $ } from '../../utils'
import { RenderBrowseCountry } from './components'

window.addEventListener(
	'load',
	async () => {
		const urlParams = new URLSearchParams(window.location.search)
		const countryCode = urlParams.get('q')

		if (!countryCode) return
		const throbber = $('#loading-throbber')
		const mainApp = $('#app-main')

		const data = await MakeApiCall(HASHMAP_ENDPOINTS.CODE, countryCode)
		throbber.classList.add('invisible')

		mainApp.appendChild(RenderBrowseCountry(data))
	},
	{ once: true }
)
