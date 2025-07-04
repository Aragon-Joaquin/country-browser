import { IsWindowUndefined } from './utils'

export const TYPE_STORAGES = Object.freeze({
	LOCAL: 'localStorage',
	SESSION: 'sessionStorage'
})

//TODO(#11): a class may fit better
/**
 * @param {typeof TYPE_STORAGES[keyof typeof TYPE_STORAGES]} type "localStorage" | "sessionStorage". Defines the type of window.Storage you want to use
 * @default type "localStorage"
 * @param {typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]} key the name/key of the storage
 *
 * @returns {{GET_ITEM: () => string | null, SET_ITEM: (val: string) => void, DELETE_ITEM: () => void }}
 *
 * @example
 * const local = windowStorage(TYPE_STORAGES.SESSION, "myKey")
 * local.GET_STORAGE()
 */
export function windowStorage(type = TYPE_STORAGES.LOCAL, key = '') {
	if (IsWindowUndefined()) return
	const storage = type === TYPE_STORAGES.LOCAL ? window.localStorage : window.sessionStorage

	return {
		GET_ITEM: () => storage.getItem(key),
		SET_ITEM: (val) => storage.setItem(key, val),
		DELETE_ITEM: () => storage.removeItem(key)
	}
}
