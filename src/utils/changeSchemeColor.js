import { STORAGE_KEYS } from '../constants'
import { $, IsWindowUndefined } from './utils'
import { TYPE_STORAGES, windowStorage } from './windowStorage'

const SCHEME_MODES = Object.freeze({
	DARK: 'dark',
	LIGHT: 'light'
})

const localScheme = windowStorage(TYPE_STORAGES.LOCAL, STORAGE_KEYS.COLOR_SCHEME)

const changeColor = (val) => {
	const root = document.documentElement

	root.style.colorScheme = val
	root.classList.add(`${val}-mode`)
	root.classList.remove(`${val === SCHEME_MODES.DARK ? SCHEME_MODES.LIGHT : SCHEME_MODES.DARK}-mode`)

	$('#change-mode img').src = `/svg/bulb-${val === SCHEME_MODES.DARK ? 'off' : 'on'}.svg`
	localScheme.SET_ITEM(val)
}

const matchesDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

/**
 * @description Import on main to manage between light mode & dark mode in the client
 * @returns {void}
 *
 * @example
 * ListenColorScheme() //tada!
 */
export function ListenColorScheme() {
	if (IsWindowUndefined()) return
	const button = document.getElementById('change-mode')

	// change color on button click
	button.addEventListener('click', (e) => {
		const comparative = document.documentElement.style.colorScheme === SCHEME_MODES.DARK

		comparative ? changeColor(SCHEME_MODES.LIGHT) : changeColor(SCHEME_MODES.DARK)
	})

	// loads from storage the color from another sessions
	window.addEventListener('load', () => {
		const scheme = localScheme.GET_ITEM()

		if (scheme != SCHEME_MODES.DARK && scheme != SCHEME_MODES.LIGHT)
			return matchesDark() ? changeColor(SCHEME_MODES.DARK) : changeColor(SCHEME_MODES.LIGHT)

		return changeColor(scheme)
	})
}

/**
 * @description Capitalizes the first letter of a word you pass by
 * @param {string} val The string word
 * @returns {string}
 *
 * @example
 * capitalizeFirstLetter("hello world!") // Hello world!
 */
export const capitalizeFirstLetter = (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1)
