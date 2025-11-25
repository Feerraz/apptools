import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from 'react'

type HookType<T> = [
  state: T,
  setState: Dispatch<SetStateAction<T>>
]

/**
 * Custom useState hook
 * This hook will save any state data
 * inside localstorage
 *
 * @param {string} key Current data key
 * @param {T} initialState Initial data value
 * @param {boolean} session Is this data only available in this session or will persist?
 * @return {HookType<T>} Custom hook
 */
function usePersistedState<T>(
  key: string,
  initialState: T,
  session?: boolean
): HookType<T> {
  const [ state, setState ] = useState<T>( initialState )

  /**
   * Cchek if value is valid
   *
   * @param {T | null | undefined }value Value to check
   * @return {boolean} True if valid, false if not
   */
  function isValid( value: T | null | undefined ): boolean {
    return !!value && value !== 'null' && value !== 'undefined'
  }

  /**
   * Remove item from storage
   */
  function cleanStorage() {
    localStorage.removeItem( key )
    sessionStorage.removeItem( key )
  }

  /**
   * Store data on localstorage
   *
   * @return {void}
   */
  function setStorage(): void {
    if ( session ) {
      return sessionStorage
        .setItem( key, JSON.stringify( state ) )
    }

    localStorage
      .setItem( key, JSON.stringify( state ) )
  }

  useEffect( () => {
    const storageValue = localStorage.getItem( key ) || sessionStorage.getItem( key )
    if ( !storageValue ) return
    setState( JSON.parse( storageValue ) as T )
  }, [] )

  useEffect( () => {
    if ( isValid( state ) ) return setStorage()
    cleanStorage()
  }, [ key, state ] )

  return [ state, setState ]
}

export default usePersistedState
