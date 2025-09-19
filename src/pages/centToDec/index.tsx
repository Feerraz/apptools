import MenuPage from '../menu'
import { MaskedInput } from 'antd-imask-input'
import { useState } from 'react'

type CentToDec = {
  value: string
  result: string
}[]

function Index() {

  const [ value, setValue ] = useState( '' )
  const [ result, setResult ] = useState<CentToDec>( [] )

  const calcular = ( value: string ) => {

    const resultado = ( parseFloat( value.replace( ",", "." ) ) / 100 ) * 60

    if ( value == '' ) {
      return
    }

    return (
      setResult( result => [ ...result, {
        value: value,
        result: String( resultado )
      } ]
      ) )
  }


  return (
    <div>
      <MenuPage />
      <div style={ { marginLeft: '256px', padding: '20px' } }>
        <h1 className='titulo-gradiente'>Centesimal para Decimal</h1>
        <label style={ { display: 'block', marginBottom: '4px' } }>
          <MaskedInput
            mask={ Number }
            maskOptions={ {
              lazy: true
            } }
            placeholder='Digite o valor em centesimal'
            size='large'
            value={ value }
            onChange={ e => setValue( e.target.value ) }
          />
        </label>
        <button className='button-calculate' onClick={ () => calcular( value ) }>Calcular</button>
        <div className='divMinuteToHour'> Resultados:
          <ul style={ { listStyleType: 'none' } }>
            { result.map( ( item, index ) => (
              <li key={ index }>{ item.value } - { item.result }</li>
            ) ) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Index
