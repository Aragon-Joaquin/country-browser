export const HASHMAP_ENDPOINTS = Object.freeze({
	ALL: '/all',
	NAME: '/name',
	CODE: '/alpha', //country code
	CURRENCY: '/currency',
	DEMONYM: '/demonym', //  how a citizen is called
	LANGUAGE: '/lang',
	CAPITALCITY: '/capital',
	REGION: '/region',
	SUBREGION: '/subregion'
	// TRANSLATION: '/translation',
})

/**
 * @param {string} endpoint use HASHMAP_ENDPOINTS to get the endpoint
 * @param {string} params optional parameters to append
 *
 * @example
 * CreateEndpoint(HASHMAP_ENDPOINTS.CODE, 'codes=ca,us')
 */
export const CreateEndpoint = (endpoint, params = '') => `${API_BASE_URL}${endpoint}${params ? `?${params}` : ''}`
