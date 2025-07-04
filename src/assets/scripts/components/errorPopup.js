import { $, IsWindowUndefined } from '../../../utils'

/**
 *
 * @description show a popup that appends to the body.
 *
 * @param {CUSTOM_ERROR | {name?: string, message?: string}} err - NEEDS TO HAVE AT LEAST A name AND A message PROPERTY.
 */
export function ErrorPopup(err) {
	if (IsWindowUndefined()) return

	const errorPopup = document.createElement('span')
	errorPopup.setAttribute('id', 'error-popup')

	errorPopup.insertAdjacentHTML(
		'afterbegin',
		`
            <button class="error-close" onclick="this.parentElement.remove()">✖</button>
            <span class="error-message">
                <h5>⚠️ <strong>Error:</strong> ${err?.name ?? 'Unknown Error'}</h5>
                <p> ${err?.message ?? ''}

            </span>
        `
	)

	$('body').append(errorPopup)
}
