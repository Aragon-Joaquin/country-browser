import { ADAPTER_HASHMAP } from '../adapter'
import { ABORT_CONTROLLER_TIMEOUT } from '../constants'
import { CreateEndpoint } from './endpoints'

/**
 * @param { Parameters<typeof CreateEndpoint>['0']} end use HASHMAP_ENDPOINTS to get the endpoint
 * @param {string} val the dynamic route follow up after the endpoint, e.x.= /country/Argentina
 * @param {string | ''} params in cases like the /all that requires a ?field=a,b,c parameter
 *
 * @param {Parameters<(typeof fetch)>['1']} [fetchOps={}] aditional fields to add to the fetch request if needed
 *
 * @returns {Promise<ReturnType<typeof ADAPTER_HASHMAP[keyof typeof ADAPTER_HASHMAP]>>}
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

		console.log(ADAPTER_HASHMAP[end](res))
	} catch (error) {
		//todo: make warning message
		console.error(error)
	}
}
