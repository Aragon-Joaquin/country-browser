/**
 * @param {string} val pass a string css selector
 *
 * @example
 * const button = $("#button")
 * const popup = $(".popup")
 */
export const $ = (val) => document.querySelector(val)

/**
 * @description calls the cb passed by arguments after wait (default 1s) when it stops getting invoked
 * @param {Promise<() => void>| () => void} cb a function without calling itself [without the ()]
 * @param {number} wait delay in milliseconds
 *
 * @returns {Promise<(...args) => void> | (...args) => void} a function thats applys its argument to the first one (cb) passed
 * @example
 * const lol = Debouncer(alert, 1000)
 * lol("hii!!!")
 */
export const debouncer = (cb, wait = 1000) => {
	if (IsWindowUndefined()) return

	let timeoutId = null

	return (...args) => {
		window.clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => {
			cb(...args)
		}, wait)
	}
}

/**
 * @returns TRUE if window DOESN'T exist
 */
export const IsWindowUndefined = () => typeof globalThis === 'undefined' || typeof window === 'undefined'

/**
 * @description prevents XSS attacks by replacing dangerous symbols like '<', '>', '&', '\' in their html form!
 * just making sure :P (+ eliminating common escape sequences like \n or \r)
 *
 * @param {string | null} val the api response
 * @returns the sanitized string
 */
export const sanitizeOutput = (val) =>
	!!val && typeof val === 'string'
		? String.raw`${val
				.replace(/\&/g, '&amp;')
				.replace(/\</g, '&lt;')
				.replace(/\>/g, '&gt;')
				.replace(/\"/g, '&quot;')
				.replace(/\'/g, '&#x27;')
				.replace(/\//g, '&#x2F;')}`
		: null
/**
 * @returns {string} path of the image used as fallback
 *
 * @example
 * const urlImage = ""
 * <img src=' `${urlImage ?? imageFallback()}`' />
 */
export const ImageFallback = () => '/imgs/not-found.webp'
