import { HASHMAP_ENDPOINTS } from '../services'
import { COUNTRY_ADAPTER } from './endpoints/CountryAdapter'

//TODO(#2): is this even necessary?
export const ADAPTER_HASHMAP = Object.freeze({
	[HASHMAP_ENDPOINTS.NAME]: (obj) => COUNTRY_ADAPTER(obj),
	[HASHMAP_ENDPOINTS.SUBREGION]: (obj) => COUNTRY_ADAPTER(obj)
})
