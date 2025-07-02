import { API_BASE_URL } from '../constants'

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
 * @param { typeof HASHMAP_ENDPOINTS[keyof typeof HASHMAP_ENDPOINTS]} endpoint use HASHMAP_ENDPOINTS to get the endpoint
 * @param {string} val the dynamic route follow up after the endpoint, e.x.= /browse/Argentina
 * @param {string} params optional parameters to append
 *
 * @example
 * CreateEndpoint(HASHMAP_ENDPOINTS.CODE, 'codes=ca,us')
 */
export const CreateEndpoint = (endpoint, val = '', params = '') =>
	`${API_BASE_URL}${endpoint}${val ? `/${val}` : ''}${params ? `?${params}` : ''}`
