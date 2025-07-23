import MenuPage from '../menu'
import { MaskedInput } from 'antd-imask-input'
import { useState } from 'react'
import { Minutes } from '@/src/types/minutes'

function Index() {

  const [ value, setValue ] = useState( '' )
  const [ result, setResult ] = useState<Minutes>( [] )

  const calcular = ( value: string ) => {
    const hor = value.split( ':' )

    const minutos = ( ( parseInt( hor[ 0 ] ) * 60 ) + ( parseInt( hor[ 1 ] ) ) ).toString()

    if ( value == '' ) {
      return
    }

    return (
      setResult( result => [ ...result,
      {
        minutos: minutos,
        qtdHour: value
      } ] )

    )
  }

  return (
    <div>
      <MenuPage />
      <div style={ { marginLeft: '256px', padding: '20px' } }>
        <h1 className='titulo-gradiente'>Horas para minutos</h1>
        <label style={ { display: 'block', marginBottom: '4px' } }>
          <MaskedInput
            mask={ '000:00' }
            maskOptions={ {
              lazy: true
            } }
            placeholder='Digite a quantidade de horas'
            size='large'
            value={ value.padStart( 1, '0' ) }
            onChange={ e => setValue( e.target.value ) }
          />
        </label>
        <button className='button-calculate' onClick={ () => calcular( value ) }>Calcular</button>
        <div className='divMinuteToHour'> Resultados:
          <ul style={ { listStyleType: 'none' } }>
            { result.map( ( item, index ) => (
              <li key={ index }>{ item.qtdHour } - { item.minutos } minutos</li>
            ) ) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
