import { COUNTRY_ADAPTER } from '../adapter'
import { ErrorPopup } from '../assets/scripts/components'
import { ABORT_CONTROLLER_TIMEOUT } from '../constants'
import { CUSTOM_ERROR } from '../errors/customError'
import { CreateEndpoint } from './endpoints'

/**
 * @param { Parameters<typeof CreateEndpoint>['0']} end use HASHMAP_ENDPOINTS to get the endpoint
 * @param {string} val the dynamic route follow up after the endpoint, e.x.= /name/Argentina, /name/Peru, /name/France...
 *
 * @param {string | ''} params in cases like the /all that requires a ?field=a,b,c parameter
 * @param {boolean} skipAdapter if you are fetching multiple countries, the adapter + sanitize part could be extremely slow. you can skip it by passing {TRUE}
 * @param {Parameters<(typeof fetch)>['1']} [fetchOps={}] aditional fields to add to the fetch request if needed
 *
 * @returns {Promise<ReturnType<typeof COUNTRY_ADAPTER>> | null} returns null if an error occurred
 * @example
 * MakeApiCall(HASHMAP_ENDPOINTS.NAME, 'Argentina', 'fields=name,currency', {method: "POST"})
 */
export async function MakeApiCall(end, val, params = '', skipAdapter = false, fetchOps = {}) {
	const endpoint = CreateEndpoint(end, val, params)
	try {
		const res = await fetch(endpoint, {
			method: 'GET',
			signal: new AbortController(ABORT_CONTROLLER_TIMEOUT).signal,
			...(fetchOps != null && fetchOps)
		})

		if (res?.status == 404 || !res.ok) throw new CUSTOM_ERROR(res.status, 'Error while fetching data')
		const data = await res.json()

		return !skipAdapter ? COUNTRY_ADAPTER(data) : data
	} catch (error) {
		return ErrorPopup(error)
	}
}
