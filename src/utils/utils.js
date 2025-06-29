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
 * @param {() => void} cb a function without calling itself [without the ()]
 * @param {number} wait delay in milliseconds
 *
 * @returns {(...args: any) => void} a function thats applys its argument to the first one (cb) passed
 * @example
 * const lol = Debouncer(alert, 1000)
 * lol("hii!!!")
 */
export const Debouncer = (cb, wait = 1000) => {
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
