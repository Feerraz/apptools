import {
  createContext,
  useContext,
  useEffect,
  useMemo
} from 'react'

// hooks
import usePersistedState from '@/hooks/usePersistedState'

// types
import { Props } from '@/types'
type ContextType = {
  results: ResultsType[]
  addResult: ( result: ResultsType ) => void
}
export enum OperationType {
  hourtomin = 'Horas para minutos',
  mintohour = 'Minutos para horas',
  sumhour = 'Soma de horas',
  subtracthour = 'Sutrair horas'
}
type ResultsType = {
  /** operation */
  op: OperationType
  /** result */
  res: string
  /** A part of operation */
  a: string
  b?: string
}

// cria o contexto
const ResultsContext = createContext( {} as ContextType )

// cria o provider
export const ResultsProvider = ( { children }: Props ) => {
  const resultsLimit = 20
  const [
    results,
    setResults
  ] = usePersistedState<ResultsType[]>( 'results', [] )

  useEffect( () => {
    console.log( 'results change context', results )
  }, [ results ] )

  /**
   * Adds a new result in first place on results list
   * 
   * @param {ResultsType} result Result to add
   */
  function addResult( result: ResultsType ): void {
    setResults( ( current ) => {
      if ( current.length > resultsLimit ) {
        current?.pop()
      }

      return [
        result,
        ...current
      ]
    } )
  }

  return (
    <ResultsContext.Provider
      value={ useMemo( () => ( {
        results,
        addResult
      } ), [ results ] ) }
    >
      { children }
    </ResultsContext.Provider>
  )
}

/**
 * cria o hook do contexto
 *
 * @return {ContextType} context
 */
export function useResults(): ContextType {
  const context = useContext( ResultsContext )
  if ( !context ) throw new Error( 'Results context invalid' )
  return context
}
