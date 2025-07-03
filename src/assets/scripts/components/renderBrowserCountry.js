import { COUNTRY_ADAPTER } from '../../../adapter/CountryAdapter'
import { ImageFallback, capitalizeFirstLetter } from '../../../utils'

import { CUSTOM_ERROR } from '../../../errors/customError'
import { ErrorPopup } from '../../scripts/components'

const MAXIMUM_OF_ELEMENTS = 5
/**
 * @param {ReturnType<typeof COUNTRY_ADAPTER>} adaptedData the data received from the api adapter
 * @returns {HTMLElement} An HTML Element to then inject into the dom
 */
export function RenderBrowseCountry(adaptedData) {
	const mainArticle = document.createElement('article')
	mainArticle.classList.add('country-article')

	const data = adaptedData?.at(0) ?? null

	if (!data) return ErrorPopup(new CUSTOM_ERROR(400, 'Country does not exists'))

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

                    <span class="country-borders">
                        <h6>Borders: </h6>
                        <div class='borders'>
                            ${data.borders?.map((brdr) => `<a href='/pages/browse?q=${brdr}'>${brdr}</a>`).join('')}
                        </div>
                    </span>
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
                        <li><strong>Languages:</strong> <span>${Object.values(data.languages)
													.splice(0, MAXIMUM_OF_ELEMENTS)
													.join(', ')}</span></li>
                        <li><strong>Currencies:</strong> <span>${Object.values(data.currencies)
													.splice(0, MAXIMUM_OF_ELEMENTS)
													.map((c) => `${c.name} (${c.symbol})`)
													.join(', ')}</span></li>
                        <li><strong>Timezones:</strong> <span>${data.timezones
													.splice(0, MAXIMUM_OF_ELEMENTS)
													.join(', ')}</span></li>
                        <li><strong>Independent:</strong> <span>${data.independent ? 'Yes' : 'No'}</span></li>

                    </ul>
                </div>

                <div>
                    <h3>Unnecessary Details:</h3>
                    <ul class="list-of-unnecessary">
                        <li><strong>Region:</strong> <span>${data.region}</span></li>
                        <li><strong>Coordinates:</strong> <span>${data.latlng?.join(', ')}</span></li>
                        <li><strong>Start of Week:</strong> <span>${capitalizeFirstLetter(data.startOfWeek)}</span></li>
                        <li><strong>Driving Side:</strong> <span>${capitalizeFirstLetter(data.car?.side)}</span></li>
                        <li><strong>Top Level Domain:</strong> <span>${data.tld?.join(', ')}</span></li>
                        <li><strong>Calling Codes:</strong> <span>${data.idd?.root}${data.idd?.suffixes?.join(', ')}
												</span></li>
                        <li><strong>FIFA Code:</strong> <span>${data.fifa}</span></li>
                        <li><strong>Maps:</strong> <a href="${
													data.maps?.googleMaps ?? '#'
												}" target="_blank">Google Maps</a></li>
                        <li><strong>UN Member:</strong> <span>${data.unMember ? 'Yes' : 'No'}</span></li>

                    </ul>
                </div>
            </section>`
	)

	return mainArticle
}
