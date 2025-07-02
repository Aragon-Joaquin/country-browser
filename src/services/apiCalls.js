import { COUNTRY_ADAPTER } from '../adapter'
import { ABORT_CONTROLLER_TIMEOUT } from '../constants'
import { CreateEndpoint } from './endpoints'

/**
 * @param { Parameters<typeof CreateEndpoint>['0']} end use HASHMAP_ENDPOINTS to get the endpoint
 * @param {string} val the dynamic route follow up after the endpoint, e.x.= /browse/Argentina
 * @param {string | ''} params in cases like the /all that requires a ?field=a,b,c parameter
 *
 * @param {Parameters<(typeof fetch)>['1']} [fetchOps={}] aditional fields to add to the fetch request if needed
 *
 * @returns {Promise<ReturnType<typeof COUNTRY_ADAPTER>> | null} returns null if an error occurred
 * @example
 * MakeApiCall(HASHMAP_ENDPOINTS.NAME, 'Argentina', 'fields=name,currency', {method: "POST"})
 */
export async function MakeApiCall(end, val, params = '', fetchOps = {}) {
	const endpoint = CreateEndpoint(end, val, params)
	try {
		const res = await (
			await fetch(endpoint, {
				method: 'GET',
				signal: new AbortController(ABORT_CONTROLLER_TIMEOUT).signal,
				...(fetchOps != null && fetchOps)
			})
		).json()

		return COUNTRY_ADAPTER(res)
	} catch (error) {
		//TODO(#3): make warning message
		console.error(error)
		return null
	}
}
