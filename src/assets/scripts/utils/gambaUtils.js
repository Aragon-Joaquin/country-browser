import { STORAGE_KEYS } from '../../../constants'
import { CUSTOM_ERROR } from '../../../errors/customError'
import { HASHMAP_ENDPOINTS, MakeApiCall } from '../../../services'
import { TYPE_STORAGES, windowStorage } from '../../../utils/windowStorage'
import { ErrorPopup } from '../components'

//* not meant to use except on landing.js
export async function getGambaCandidate() {
	const data = windowStorage(TYPE_STORAGES.SESSION, STORAGE_KEYS.ALL_COUNTRIES)
	const item = data.GET_ITEM()

	if (item != null) {
		try {
			return JSON.parse(item)
		} catch (error) {
			data.DELETE_ITEM()
			ErrorPopup(new CUSTOM_ERROR(409, 'Error while parsing local storage'))
		}
	}

	const res = await MakeApiCall(HASHMAP_ENDPOINTS.ALL, '', 'fields=name,cca3,flags', true)
	data.SET_ITEM(JSON.stringify(res))

	return res
}
