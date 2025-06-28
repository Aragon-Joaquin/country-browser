import { ABORT_CONTROLLER_TIMEOUT } from '../constants'

export async function MakeApiCall(endpoint, ...fetchOps) {
	try {
		const res = await fetch(endpoint, {
			method: 'GET',
			signal: AbortController.timeout(ABORT_CONTROLLER_TIMEOUT),
			...fetchOps
		})
		return await res.body()
	} catch (error) {
		//todo: make warning message
		console.error(error)
	}
}
