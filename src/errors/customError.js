export const ERROR_HASHMAP = Object.freeze({
	400: 'BAD REQUEST',
	401: 'UNAUTHORIZED',
	403: 'FORBIDDEN',
	404: 'NOT FOUND',
	405: 'METHOD NOT ALLOWED',
	408: 'REQUEST TIMEOUT',
	409: 'CONFLICT',
	429: 'TOO MANY REQUESTS',
	500: 'INTERNAL SERVER ERROR'
})

/**
 * @class
 * @property {number} name pass the res.status number it will output the correct error
 * @property {string} message the error descriptive message
 */
export class CUSTOM_ERROR {
	constructor(name, message) {
		this.name = ERROR_HASHMAP[name] ?? 'Unknown Error'
		this.message = message ?? 'Unknown Message'
	}
}
