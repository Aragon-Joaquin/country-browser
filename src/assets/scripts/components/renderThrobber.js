//TODO(#4): Finish if convenient. Otherwise, remove it.s

/**
 *
 * @param {HTMLElement} htmlEl
 * @returns
 */
export function RenderThrobber(htmlEl) {
	const throbberPlaceholder = document.createElement('span')
	throbberPlaceholder.classList.add('loading-throbber')

	return (play = true) => {
		if (!play) return htmlEl.replaceChild(throbberPlaceholder)

		throbberPlaceholder.insertAdjacentHTML(
			'afterbegin',
			`
                <img src='/svg/throbber.svg' alt='Loading...' class='svg-loading'/>
                <h5 class='title-loading'>Loading</h5>
            `
		)

		htmlEl.appendChild(throbberPlaceholder)
	}
}
