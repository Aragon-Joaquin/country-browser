import { COUNTRY_ADAPTER } from '../../../adapter/CountryAdapter'
import { ImageFallback } from '../../../utils'

/**
 * @param {ReturnType<typeof COUNTRY_ADAPTER>} adaptedData the data received from the api adapter
 * @returns {HTMLElement} An HTML Element to then inject into the dom
 */

export function RenderBrowseCountry(adaptedData) {
	const mainArticle = document.createElement('article')
	mainArticle.classList.add('country-article')

	const data = adaptedData?.at(0) ?? null

	//TODO(#6): check if this condition is even possible to get
	if (!data) return

	const { common, official } = data.name

	mainArticle.insertAdjacentHTML(
		'afterbegin',
		`  
            <header class="country-header">
                    <h1>${common}</h1>

                    <img
                        class="FLAG-country"
                        src="${data.flags?.png ?? ImageFallback()}"
                        alt="Flag of ${common}"
                    />
                    <img
                        class="COA-country"
                        src="${data.coatOfArms?.svg ?? ImageFallback()}"
                        alt="Coat of Arms of ${common}"
                    />
            </header>
                
            <section class="general-info">
                <div>
                    <h3>General Information:</h3>
                    <ul class="list-of-info">
                        <li><strong>Official Name:</strong> <span>${official}</span></li>
                        <li><strong>Located in:</strong> <span>${data.continents.join(', ')}</span></li>
                        <li><strong>Capital:</strong> <span>${data.capital?.join(', ')}</span></li>
                        <li><strong>Population:</strong> <span>${data.population?.toLocaleString()}</span></li>
                        <li><strong>Area:</strong> <span>${data.area?.toLocaleString()} km²</span></li>
                        <li><strong>Languages:</strong> <span>${Object.values(data.languages).join(', ')}</span></li>
                        <li><strong>Currencies:</strong> <span>${Object.values(data.currencies)
													.map((c) => `${c.name} (${c.symbol})`)
													.join(', ')}</span></li>
                        <li><strong>Timezones:</strong> <span>${data.timezones.join(', ')}</span></li>
                        <li><strong>UN Member:</strong> <span>${data.unMember ? 'Yes' : 'No'}</span></li>
                        <li><strong>Independent:</strong> <span>${data.independent ? 'Yes' : 'No'}</span></li>
                    </ul>
                </div>

                <div>
                    <h3>idk:</h3>

                </div>
            </section>`
	)

	return mainArticle
}
