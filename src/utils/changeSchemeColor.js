import { LOCAL_STORAGE_KEYS } from '../constants'
import { $, IsWindowUndefined } from './utils'

const SCHEME_MODES = Object.freeze({
	DARK: 'dark',
	LIGHT: 'light'
})

const changeColor = (val) => {
	const root = document.documentElement

	root.style.colorScheme = val
	root.classList.add(`${val}-mode`)
	root.classList.remove(`${val === SCHEME_MODES.DARK ? SCHEME_MODES.LIGHT : SCHEME_MODES.DARK}-mode`)

	$('#change-mode img').src = `/svg/bulb-${val === SCHEME_MODES.DARK ? 'off' : 'on'}.svg`
	localStorage.setItem(LOCAL_STORAGE_KEYS.COLOR_SCHEME, val)
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
		const scheme = localStorage.getItem(LOCAL_STORAGE_KEYS.COLOR_SCHEME)

		if (scheme != SCHEME_MODES.DARK && scheme != SCHEME_MODES.LIGHT)
			return matchesDark() ? changeColor(SCHEME_MODES.DARK) : changeColor(SCHEME_MODES.LIGHT)

		return changeColor(scheme)
	})
}
