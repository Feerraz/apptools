import MenuPage from '../menu'
import { MaskedInput } from 'antd-imask-input'
import { useState } from 'react'
import { Hours } from '@/src/types/hours'
import { Input } from 'antd'

function Index() {

  const [ value, setValue ] = useState( '' )
  const [ result, setResult ] = useState<Hours>( [] )

  const calcular = ( value: string ) => {
    const qtdHour = Math.floor( Number( value ) / 60 )
    const qtdMin = Number( value ) % 60

    const horaStr = String( qtdHour ).padStart( 2, '0' )
    const minStr = String( qtdMin ).padStart( 2, '0' )

    if ( value == '' ) {
      return
    }

    return (
      setResult( result => [ ...result,
      {
        horas: horaStr,
        minutos: minStr,
        qtdMin: value
      } ] )
    )
  }


  return (
    <div>
      <MenuPage />
      <div style={ { marginLeft: '256px', padding: '20px' } }>
        <h1 className='titulo-gradiente'>Calculadora de Horas</h1>
        <label style={ { display: 'flex', marginBottom: '4px', maxWidth: '500px' } }>
          <MaskedInput
            mask={ Number }
            maskOptions={ {
              lazy: true
            } }
            placeholder='Digite a quantidade de minutos'
            size='large'
            value={ value }
            onChange={ e => setValue( e.target.value ) }
          />
          <Input
            placeholder='Resultado'
            size='large'
            value={ value }
            onChange={ e => setValue( e.target.value ) }
          />
        </label>
        <div style={ {} }>
          <button className='button-calculate' onClick={ () => calcular( value ) }>+</button>
          <button className='button-calculate' onClick={ () => calcular( value ) }>-</button>
          <button className='button-calculate' onClick={ () => calcular( value ) }>*</button>
          <button className='button-calculate' onClick={ () => calcular( value ) }>/</button>
          <button className='button-calculate' onClick={ () => calcular( value ) }>Calcular</button>
        </div>
        <div className='divMinuteToHour'> Resultados:
          <ul style={ { listStyleType: 'none' } }>
            { result.map( ( item, index ) => (
              <li key={ index }>{ item.qtdMin } - { item.horas }:{ item.minutos }</li>
            ) ) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
