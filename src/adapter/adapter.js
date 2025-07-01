import { HASHMAP_ENDPOINTS } from '../services'
import { COUNTRY_ADAPTER } from './endpoints/CountryAdapter'

export const ADAPTER_HASHMAP = Object.freeze({
	[HASHMAP_ENDPOINTS.NAME]: (obj) => COUNTRY_ADAPTER(obj)
})
